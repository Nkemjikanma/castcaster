import { getFrameHtmlResponse } from "@coinbase/onchainkit";

interface SharePageProps {
    params: {
        searchParams: {
            title: string;
            description: string;
            displayImage: string;
        };
    };
}

export default function Page({ params }: SharePageProps) {
    const { searchParams } = params;

    return (
        <html>
            <head>
                <title>{searchParams.title}</title>
                <meta property="og:title" content={searchParams.title} />
                <meta
                    property="og:image"
                    content={`https://castcaster.vercel.app/api/display?${searchParams}`}
                />
                <meta name="fc:frame" content="vNext" />
                <meta
                    name="fc:frame:image"
                    content={`https://castcaster.vercel.app/api/display?${searchParams}`}
                />
                <meta
                    name="fc:frame:post_url"
                    content={`${process.env.NEXT_PUBLIC_HOST_URL}`}
                />
                <meta name="fc:frame:button:1" content="Generate a cast" />
                <meta name="fc:frame:button:1:action" content="post" />
            </head>
        </html>
    );
}
