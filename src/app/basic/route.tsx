import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has("title");
        const title = hasTitle
            ? searchParams.get("title")?.slice(0, 100)
            : "Castcaster";

        // ?description=
        const hasDescription = searchParams.has("description");
        const description = hasDescription
            ? searchParams.get("description")
            : "Generate casts like warpcaster users";

        return new ImageResponse(
            (
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundImage:
                            "linear-gradient(to bottom,  #310047, #660094)",
                        fontSize: 80,
                        fontWeight: 700,
                        textAlign: "center",
                    }}
                >
                    <h3
                        style={{
                            color: "white",
                            fontSize: 60,
                            fontWeight: 900,
                            margin: 0,
                            letterSpacing: 1,
                        }}
                    >
                        {title}
                    </h3>
                    {description && (
                        <p
                            style={{
                                fontSize: 30,
                                fontWeight: 300,
                                margin: 0,
                                marginTop: 30,
                                color: "white",
                                maxWidth: "80%",
                                textAlign: "center",
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
