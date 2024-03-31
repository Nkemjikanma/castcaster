import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { formatCasts, open } from "@/utils/utils";
import { redirect } from "next/navigation";

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
                    "You are supplied sentencess and these sentenses respresent casts by users on a platform called Warpcaster. You can think of casts as tweets on twitter. Using this list of supplied casts, generate a cast that most closely matches the style of writing in the provided casts but with a humourous twist. Stick to topics covered in the provided casts. This generated cast should have a maximum of 140 characters.",
            },
            {
                role: "user",
                content: formatCasts(castsForAi),
            },
        ],
        temperature: 0,
    });

    return (
        <div className="mt-5 bg-blend-darken shadow-md">
            <h1 className="text-lg font-bold">{getFId?.userName ?? query}:</h1>
            <p className="mt-2">{openAi.choices[0].message.content}</p>
        </div>
    );
}
