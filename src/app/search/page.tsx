import { formatCasts, getCasts, openAi, retrieveFId } from "@/utils/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface SearchParamsType {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export default async function SearchResultPage({
    searchParams,
}: SearchParamsType) {
    let castsForAi!: string[] | string;
    let getFId;

    const query = searchParams.query;

    if (Array.isArray(query) || !query) {
        return redirect("/");
    }

    try {
        getFId = await retrieveFId(query);
        castsForAi = await getCasts(getFId, query);
    } catch (error) {
        console.error(error);
    }

    const aiResponse =
        typeof castsForAi !== "string"
            ? await openAi(formatCasts(castsForAi))
            : castsForAi;

    return (
        <Suspense>
            <div className="mt-5 bg-blend-darken shadow-md">
                <h1 className="text-lg font-bold">
                    {getFId?.userName ?? query}:
                </h1>
                <p className="mt-2">
                    {typeof aiResponse === "string"
                        ? aiResponse
                        : aiResponse.choices[0].message.content}
                </p>
            </div>
        </Suspense>
    );
}
