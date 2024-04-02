import type { Metadata, Viewport } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit/frame";

const frameMetadata = getFrameMetadata({
    buttons: [
        {
            label: "Generate Cast",
        },
    ],
    image: {
        src: "https://castcaster.vercel.app/basic",
    },

    input: {
        text: "Enter username or fid",
    },
    postUrl: "https://castcaster.vercel.app/api/cast",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://castcaster.vercel.app/"),
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
        images: ["https://castcaster.vercel.app/basic"],
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
    return <h1>Castcaster</h1>;
}
