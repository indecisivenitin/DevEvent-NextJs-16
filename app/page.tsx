import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";



const Page = async () => {
    'use cache';
    cacheLife('hours');

    let events: IEvent[] = [];

    try {
        const response = await fetch("https://dev-event-next-js-16.vercel.app/api/events");

        if (!response.ok) throw new Error("Failed");

        const data = await response.json();
        events = data.events || [];
    } catch (err) {
        console.error("Fetch error:", err);
    }

    return (
        <section>
            <h1 className="text-center">
                The Hub for Every Dev <br /> Event You Can't Miss
            </h1>

            <p className="text-center mt-5">
                Hackathons, Meetups, and Conferences, All in One Place
            </p>

            <ExploreBtn />

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events">
                    {events.length > 0 ? (
                        events.map((event: IEvent) => (
                            <li key={event.title} className="list-none">
                                <EventCard {...event} />
                            </li>
                        ))
                    ) : (
                        <p>No events available</p>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default Page;