import { useSearchParams } from "next/navigation";

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
    const searchParams = useSearchParams();

    const title = searchParams.get("title") || "CastCaster";
    const description = searchParams.get("description") || "Generated cast";
    const displayName = searchParams.get("displayName") || "CastCaster";

    const renderParams = new URLSearchParams({
        title,
        description,
        displayName,
    });

    return (
        <html>
            <head>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta
                    property="og:image"
                    content={`https://castcaster.vercel.app/api/display?${renderParams}`}
                />
                <meta name="fc:frame" content="vNext" />
                <meta
                    name="fc:frame:image"
                    content={`https://castcaster.vercel.app/api/display?${renderParams}`}
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
