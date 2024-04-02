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
                <meta property="og:image" content={`http://castcaster.vercel.app/share?${searchParams}`} />
                <meta name="fc:frame" content="vNext" />
                <meta name="fc:frame:image:aspect_ratio" content="1:1" />
                <meta name="fc:frame:image" content={`http://castcaster.vercel.app/share?${searchParams}`} />
                <meta name="fc:frame:post_url" content={`${process.env.BASE_URL}/api/cast`} />
                <meta name="fc:frame:button:1" content="Generate cast" />
                <meta name="fc:frame:button:1:action" content="post" />
            </head>
        </html>
    );
}
}