import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { formatCasts, open } from "@/utils/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface SearchParamsType {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export default async function SearchResultPage({
    searchParams,
}: SearchParamsType) {
    let castsForAi!: string[];
    let getFId;

    const query = searchParams.query;

    if (Array.isArray(query) || !query) {
        return redirect("/");
    }

    try {
        getFId = await client
            .lookupUserByUsername(query)
            .then((result) => {
                return {
                    id: result.result.user.fid,
                    userName: query,
                };
            })
            .catch((error: unknown) => {
                console.error("No user with that username found.");
            });

        if (getFId !== undefined) {
            const idFound = getFId?.id ?? query;
            castsForAi = await client
                .fetchPopularCastsByUser(+idFound)
                .then((result) => result.casts.map(({ text }) => text))
                .catch(async (error) => {
                    error?.data?.message;
                    castsForAi = (
                        await client.fetchAllCastsCreatedByUser(+idFound)
                    ).result.casts.map(({ text }) => text);

                    return castsForAi;
                });

            if (castsForAi?.length < 10) {
                castsForAi = (
                    await client.fetchAllCastsCreatedByUser(+idFound)
                ).result.casts.map(({ text }) => text);
            }
        } else {
            return "User not found.";
        }
    } catch (error) {
        console.error(error);
    }

    // openaibabyyy
    const openAi = await open.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "The sentenses you have been supplied with respresent multiple casts by users on a platform called Warpcaster. You can think of casts as tweets on twitter. Using this list of supplied casts, generate a cast that matches the style of writing in the provided casts, but with a humourous twist. Stick to topics covered in the provided casts. This generated cast should have a maximum of 140 characters. Your tone should match the style of the provided casts.",
            },
            {
                role: "user",
                content: formatCasts(castsForAi),
            },
        ],
        temperature: 0,
    });

    return (
        <Suspense>
            <div className="mt-5 bg-blend-darken shadow-md">
                <h1 className="text-lg font-bold">
                    {getFId?.userName ?? query}:
                </h1>
                <p className="mt-2">{openAi.choices[0].message.content}</p>
            </div>
        </Suspense>
    );
}
