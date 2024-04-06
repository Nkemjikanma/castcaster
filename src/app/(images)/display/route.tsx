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
                        flexDirection: "row",
                        gap: "3px",
                        height: "100%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundImage:
                            "linear-gradient(to bottom,  #16101E, #1F162B)",
                        padding: "5px 10px",
                        margin: "0",
                        boxSizing: "border-box",
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
                                width: "80px",
                                height: "80px",
                                backgroundColor: "orange",
                                border: "1px solid white",
                            }}
                        ></div>
                    </div>

                    {/*Body wrapper*/}
                    <div
                        style={{
                            display: "flex",
                            width: "80%",
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
                                fontSize: "42px",
                            }}
                        >
                            {displayName}
                            <span style={{ color: "gray", marginLeft: "8px" }}>
                                @{title}
                            </span>
                        </p>
                        <p
                            style={{
                                position: "relative",
                                fontSize: "40px",
                                color: "white",
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
