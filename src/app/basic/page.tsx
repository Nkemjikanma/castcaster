import type { Metadata, Viewport } from "next";
import { Fragment } from "react";

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
        "fc:frame": "vNext",
        "fc:frame:image": "https://castcaster.vercel.app/public/castcaster.png",
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
