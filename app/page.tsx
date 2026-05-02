// import ExploreBtn from "@/components/ExploreBtn";
// import EventCard from "@/components/EventCard";
// import {IEvent} from "@/database";
// import {cacheLife} from "next/cache";

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const Page = async () => {
//     'use cache';
//     cacheLife('hours')
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`);
//     const { events } = await response.json();

//     return (
//         <section>
//             <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
//             <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

//             <ExploreBtn />

//             <div className="mt-20 space-y-7">
//                 <h3>Featured Events</h3>

//                 <ul className="events">
//                     {events && events.length > 0 && events.map((event: IEvent) => (
//                         <li key={event.title} className="list-none">
//                             <EventCard {...event} />
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </section>
//     )
// }

// export default Page;
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

export const dynamic = "force-dynamic"; //  prevent build-time execution

const Page = async () => {
    'use cache';
    cacheLife('hours');

    let events: IEvent[] = [];

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
            {
                cache: "no-store", // ensures fresh data
            }
        );

        const text = await response.text(); // 👈 safer than .json()

        try {
            const data = JSON.parse(text);
            events = data.events || [];
        } catch (err) {
            console.error("Invalid JSON response:", text);
        }

    } catch (err) {
        console.error("Fetch failed:", err);
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
