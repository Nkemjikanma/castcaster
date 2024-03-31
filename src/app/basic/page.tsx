import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Castcaster",
    description: "Generate casts like users do on warpcaster",
    openGraph: {
        title: "Castcaster",
        description: "Generate casts like users do on warpcaster",
        images: [`${process.env.NEXT_PUBLIC_HOST_URL}/castcaster.png`],
    },
    other: {
        "fc:frame": "vNext",
        "fc:frame:image": `${process.env.NEXT_PUBLIC_HOST_URL}/castcaster.png`,
    },
};

export default function Page() {
    return (
        <div>
            <h1>Basic Frame</h1>
        </div>
    );
}
