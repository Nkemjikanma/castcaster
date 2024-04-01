import type { Metadata, Viewport } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit/frame";

const frameMetadata = getFrameMetadata({
    buttons: [
        {
            label: "Start",
        },
    ],
    image: {
        src: "https://castcaster.vercel.app/public/castcaster.png",
    },
    postUrl: "https://castcaster.vercel.app/api/cast",
});

export const metadata: Metadata = {
    title: "Castcaster",
    description: "Generate casts like users do on warpcaster",
    keywords: [
        "castcaster",
        "warpcaster",
        "cast",
        "generate",
        "base",
        "ethereum",
    ],
    openGraph: {
        title: "Castcaster",
        description: "Generate casts like users do on warpcaster",
        siteName: "Castcaster",
        url: "https://castcaster.vercel.app/",
        locale: "en_US",
        images: ["https://castcaster.vercel.app/public/castcaster.png"],
    },
    twitter: {
        site: "@nkemjikanma",
    },
    other: {
        ...frameMetadata,
    },
};

export const viewport: Viewport = {
    themeColor: "#000000",
    colorScheme: "dark",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function Page() {
    return <h1>Basic Frame</h1>;
}
