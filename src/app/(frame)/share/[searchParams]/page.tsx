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

    const htmlOutput = getFrameHtmlResponse({
        ogTitle: searchParams.title,
        ogDescription: searchParams.description,
        image: `https://castcaster.vercel.app/api/display?${searchParams}`,
        buttons: [
            {
                label: "Generate a cast",
                action: "post",
                target: `${process.env.NEXT_PUBLIC_HOST_URL}`,
            },
        ],
        postUrl: `${process.env.NEXT_PUBLIC_HOST_URL}`,
    });

    return { htmlOutput };
}
