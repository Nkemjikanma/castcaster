import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { formatCasts, getCasts, openAi, retrieveFId } from "@/utils/utils";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();
    const { untrustedData } = body;
    const fid = untrustedData.fid;

    if (!untrustedData.inputText) {
        const searchParams = new URLSearchParams({
            title: "No input text provided",
        });

        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                        label: "No username or fid provided",
                    },
                ],
                image: {
                    src: `https://castcaster.vercel.app/basic?${searchParams}`,
                },

                input: {
                    text: "Enter username or fid to generate",
                },
                postUrl: "https://castcaster.vercel.app/api/cast",
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "text/html",
                    "Cache-Control": "public, max-age=0, must-revalidate",
                },
            },
        );
    }

    const getFid = await retrieveFId(untrustedData.inputText);
    const castsForAi = await getCasts(getFid, untrustedData.inputText);

    if (typeof castsForAi === "string") {
        const searchParams = new URLSearchParams({
            title: castsForAi,
        });

        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [
                    {
                        label: "No account with that username or fid",
                    },
                ],
                image: {
                    src: `https://castcaster.vercel.app/basic?${searchParams}`,
                },

                input: {
                    text: "Enter username or fid",
                },
                postUrl: "https://castcaster.vercel.app/api/cast",
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "text/html",
                    "Cache-Control": "public, max-age=0, must-revalidate",
                },
            },
        );
    }

    const formattedCasts = formatCasts(castsForAi);

    const aiResponse = await openAi(formattedCasts);

    const searchParams = new URLSearchParams({
        title: getFid.userName,
        description: aiResponse.choices[0].message.content as string,
        displayName: getFid.displayName,
    });

    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `https://castcaster.vercel.app/display?${searchParams}`,
            },
            buttons: [
                {
                    label: "Share cast",
                    action: "link",
                    target: `https://warpcast.com/~/compose?text=${encodeURIComponent(`Here is a generated cast for @${getFid.userName}`)}&embeds[]=${encodeURIComponent(`https://castcaster.vercel.app/share/${searchParams}`)}`,
                },
            ],
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "text/html",
                "Cache-Control": "public, max-age=0, must-revalidate",
            },
        },
    );
}

export const dynamic = "force-dynamic";
