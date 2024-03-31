import OpenAi from "openai";

export const open = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

export const formatCasts = (castsForAi: string[]) => {
    return castsForAi?.map((cast: string) => cast).join(",");
};
