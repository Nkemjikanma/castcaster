import NextCors from "nextjs-cors";
import { redirect } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        methods: ["GET", "POST"],
        origin: "*",
    });

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { type } = req.query;

        if (type === "POST") {
            redirect("https://castcaster.vercel.app/");
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send(`<!DOCTYPE html>
            <html>
              <head>
                <title>Something went wrong</title>
                <meta property="og:title" content="Thirdweb Frames" />
                <meta
                  property="og:image"
                  content="https://https://castcaster.vercel.app/castcaster.png"
                />
                <meta property="fc:frame" content="vNext" />
                <meta
                  property="fc:frame:image"
                  content="https://https://castcaster.vercel.app/castcaster.png"
                />
                <meta property="fc:frame:button:1" content="Something went wrong" />
              </head>
              <body>
                <p>Something went wrong</p>
              </body>
            </html>`);
    }
}
