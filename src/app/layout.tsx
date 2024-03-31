import { Inter } from "next/font/google";
import "./globals.css";
import Form from "@/components/Form";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
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
