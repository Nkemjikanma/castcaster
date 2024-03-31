import { Inter } from "next/font/google";
import "./globals.css";
import Form from "@/components/Form";
import type { Metadata } from "next";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Castcaster",
    description: "Generate casts like users do on warpcaster",
    openGraph: {
        title: "Castcaster",
        description: "Generate casts like users do on warpcaster",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <meta property="og:title" content={`Castcaster`} />
                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_HOST_URL}/castcaster.png`}
                />
                <meta property="fc:frame" content="vNext" />
                <meta
                    property="fc:frame:image"
                    content={`${process.env.NEXT_PUBLIC_HOST_URL}/castcaster.png`}
                />
            </Head>
            <body className={inter.className}>
                <main className="min-h-screenpx-5 bg-body relative isolate flex min-h-screen w-screen items-center justify-center">
                    <div className="flex min-w-96 flex-col items-center justify-center">
                        <h1 className="mb-2 text-4xl font-bold tracking-tight">
                            Castcaster
                        </h1>

                        <p className="relative justify-center text-center">
                            Generate casts like users do on warpcaster
                        </p>

                        <div className="relative mt-5 flex w-80 flex-col items-center">
                            <Form />
                            {children}
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
