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
                        height: "100%",
                        width: "100%",
                        backgroundImage:
                            "linear-gradient(to bottom, #16101E, #1F162B)",
                        padding: "30px",
                        margin: "0",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "row",
                            gap: "3px",
                            height: "100%",
                            width: "100%",
                            padding: "5px 10px",
                            margin: "0",
                            boxSizing: "border-box",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* Profile pciture wrapper logo*/}
                        <div
                            style={{
                                width: "auto",
                                height: "50%",
                                display: "flex",
                                position: "relative",
                                marginRight: "6px",
                            }}
                        >
                            {/* Profile picture */}
                            <div
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    borderRadius: "50%",
                                    width: "110px",
                                    height: "110px",
                                    backgroundColor: "orange",
                                    border: "1px solid white",
                                }}
                            ></div>
                        </div>
                        {/*Body wrapper*/}
                        <div
                            style={{
                                display: "flex",
                                width: "85%",
                                height: "50%",
                                position: "relative",
                                flexDirection: "column",
                                margin: "0",
                                justifyContent: "center",
                            }}
                        >
                            <p
                                style={{
                                    position: "relative",
                                    color: "white",
                                    fontWeight: "500",
                                    fontSize: "38px",
                                }}
                            >
                                {displayName}
                                <span
                                    style={{
                                        color: "gray",
                                        position: "relative",
                                        marginLeft: "8px",
                                    }}
                                >
                                    @{title}
                                </span>
                            </p>
                            <p
                                style={{
                                    position: "relative",
                                    fontSize: "36px",
                                    color: "white",
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {description}
                            </p>
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

export const dynamic = "force-dynamic";
