import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const title = searchParams.get("title")?.slice(0, 100);

        // ?description=
        const description = searchParams.get("description");

        const displayName = searchParams.get("displayName") || "Castcaster";

        return new ImageResponse(
            (
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        msFlexDirection: "row",
                        WebkitFlexDirection: "row",
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundImage:
                            "linear-gradient(to bottom,  #310047, #660094)",
                        fontWeight: 700,
                        textAlign: "center",
                        padding: "0 10px 0 10px",
                    }}
                >
                    <div
                        style={{
                            width: "10%",
                            display: "flex",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                            }}
                        >
                            <p style={{ color: "white" }}>
                                {displayName}
                                <span style={{ color: "gray" }}>@{title}</span>
                            </p>
                        </div>
                        <div
                            style={{
                                position: "relative",
                                justifyItems: "left",
                                display: "flex",
                            }}
                        >
                            {description}
                        </div>
                    </div>
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
