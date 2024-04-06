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
                        backgroundImage:
                            "linear-gradient(to bottom,  #16101E, #1F162B)",
                        padding: "5px 10px",
                        margin: "0",
                        boxSizing: "border-box",
                        border: "2px solid green",
                    }}
                >
                    {/* Profile pciture wrapper logo*/}
                    <div
                        style={{
                            width: "fit-content",
                            display: "flex",
                            position: "relative",
                            border: "2px solid yellow",
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
                            width: "auto",
                            height: "max-content",
                            position: "relative",
                            flexDirection: "column",
                            border: "2px solid blue",
                        }}
                    >
                        <p
                            style={{
                                position: "relative",
                                color: "white",
                                fontWeight: "500",
                                fontSize: "42px",
                            }}
                        >
                            {displayName}
                            <span
                                style={{
                                    color: "gray",
                                    position: "relative",
                                }}
                            >
                                {" "}
                                @{title}
                            </span>
                        </p>
                        <p
                            style={{
                                position: "relative",
                                fontSize: "38px",
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
