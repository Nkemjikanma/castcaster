import OpenAi from "openai";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";

export const open = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export const formatCasts = (castsForAi: string[]) => {
    return castsForAi?.map((cast: string) => cast).join(",");
};

export const retrieveFId = async (query: string) => {
    return await client.lookupUserByUsername(query).then((result) => {
        return {
            id: result.result.user.fid,
            userName: query,
        };
    });
};

export const getCasts = async (
    getFId: {
        id: number;
        userName: string;
    },
    query: string,
): Promise<string[] | string> => {
    let castsForAi: string[] = [];

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

        return castsForAi;
    } else {
        return "User not found.";
    }
};

export const openAi = async (casts: string) =>
    await open.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "The sentenses you have been supplied with respresent multiple casts by users on a platform called Warpcaster. You can think of casts as tweets on twitter. Using this list of supplied casts, generate a cast that matches the style of writing in the provided casts, but with a humourous twist. Stick to topics covered in the provided casts. This generated cast should have a maximum of 140 characters. Your tone should match the style of the provided casts.",
            },
            {
                role: "user",
                content: casts,
            },
        ],
        temperature: 0,
    });
