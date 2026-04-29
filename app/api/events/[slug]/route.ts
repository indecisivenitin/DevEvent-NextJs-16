import { NextRequest, NextResponse } from 'next/server';
import { Error as MongooseError } from 'mongoose';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

type EventRouteParams = {
    slug?: string;
};

type EventRouteContext = {
    params: Promise<EventRouteParams>;
};

type ErrorResponse = {
    message: string;
    error?: string;
};
type EventPayload = {
    id: string;
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

type SuccessResponse = {
    message: string;
    event: EventPayload;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * GET /api/events/[slug]
 * Fetches a single events by slug.
 */
export async function GET(
    _request: NextRequest,
    { params }: EventRouteContext
) {
    try {
        const { slug } = await params;
        const normalizedSlug = slug?.trim().toLowerCase();

        // Validate slug before querying the database.
        if (!normalizedSlug) {
            return NextResponse.json<ErrorResponse>(
                { message: 'Missing required route parameter: slug' },
                { status: 400 }
            );
        }

        if (!SLUG_PATTERN.test(normalizedSlug)) {
            return NextResponse.json<ErrorResponse>(
                {
                    message:
                        'Invalid slug format. Use lowercase letters, numbers, and hyphens only.',
                },
                { status: 400 }
            );
        }

        await connectDB();

        const eventDoc = await Event.findOne({ slug: normalizedSlug })
            .select('-__v')
            .exec();

        if (!eventDoc) {
            return NextResponse.json<ErrorResponse>(
                { message: 'Event not found' },
                { status: 404 }
            );
        }
        const event: EventPayload = {
            id: String(eventDoc._id),
            title: eventDoc.title,
            slug: eventDoc.slug,
            description: eventDoc.description,
            overview: eventDoc.overview,
            image: eventDoc.image,
            venue: eventDoc.venue,
            location: eventDoc.location,
            date: eventDoc.date,
            time: eventDoc.time,
            mode: eventDoc.mode,
            audience: eventDoc.audience,
            agenda: eventDoc.agenda,
            organizer: eventDoc.organizer,
            tags: eventDoc.tags,
            createdAt: eventDoc.createdAt.toISOString(),
            updatedAt: eventDoc.updatedAt.toISOString(),
        };

        return NextResponse.json<SuccessResponse>(
            { message: 'Event fetched successfully', event },
            { status: 200 }
        );
    } catch (error: unknown) {
        if (error instanceof MongooseError.ValidationError) {
            return NextResponse.json<ErrorResponse>(
                {
                    message: 'Validation failed while processing request',
                    error: error.message,
                },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json<ErrorResponse>(
                { message: 'Unexpected server error', error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json<ErrorResponse>(
            { message: 'Unexpected server error' },
            { status: 500 }
        );
    }
}
