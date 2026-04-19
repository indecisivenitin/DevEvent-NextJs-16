export type EventItem = {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events: EventItem[] = [
    {
        title: "Next.js Conf 2024",
        image: "/images/event1.png",
        slug: "nextjs-conf-2024",
        location: "San Francisco, CA",
        date: "2024-10-24",
        time: "09:00 AM",
    },
    {
        title: "React India 2024",
        image: "/images/event2.png",
        slug: "react-india-2024",
        location: "Goa, India",
        date: "2024-10-17",
        time: "10:00 AM",
    },
    {
        title: "Google I/O Connect",
        image: "/images/event3.png",
        slug: "google-io-connect-2024",
        location: "Bengaluru, India",
        date: "2024-07-17",
        time: "09:30 AM",
    },
    {
        title: "AWS Summit 2024",
        image: "/images/event4.png",
        slug: "aws-summit-2024",
        location: "New York, NY",
        date: "2024-06-26",
        time: "08:00 AM",
    },
    {
        title: "Microsoft Build 2024",
        image: "/images/event5.png",
        slug: "microsoft-build-2024",
        location: "Seattle, WA",
        date: "2024-05-21",
        time: "09:00 AM",
    },
    {
        title: "JSWorld Conference",
        image: "/images/event6.png",
        slug: "jsworld-conference-2024",
        location: "Amsterdam, Netherlands",
        date: "2024-02-28",
        time: "10:00 AM",
    }
];
