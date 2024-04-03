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
                        gap: "8px",
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundImage:
                            "linear-gradient(to bottom,  #310047, #660094)",
                    }}
                >
                    {/* Profile pciture wrapper logo*/}
                    <div
                        style={{
                            width: "10%",
                            height: "100%",
                            display: "flex",
                            position: "relative",
                        }}
                    >
                        {/* Profile picture */}
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                borderRadius: "50%",
                                width: "70px",
                                height: "70px",
                                backgroundColor: "orange",
                                border: "2px solid white",
                            }}
                        ></div>
                    </div>

                    {/*Body wrapper*/}
                    <div
                        style={{
                            display: "flex",
                            width: "90%",
                            height: "100%",
                            margin: "0",
                            position: "relative",
                            flexDirection: "column",
                        }}
                    >
                        <p
                            style={{
                                color: "white",
                                fontWeight: "500",
                                fontSize: "52px",
                            }}
                        >
                            {displayName}
                            <span style={{ color: "gray", marginLeft: "5p" }}>
                                @{title}
                            </span>
                        </p>
                        <p
                            style={{
                                position: "relative",
                                fontSize: "50px",
                            }}
                        >
                            {description}
                        </p>
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
