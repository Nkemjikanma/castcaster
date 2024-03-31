"use client";
import { Suspense, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Form() {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const searchParams = useSearchParams();
    const defaultQuery = searchParams.get("query") || "";

    const [query, setQuery] = useState<string>(defaultQuery);
    const [isSearching, startTransition] = useTransition();

    const generateCast = () => {
        startTransition(() => {
            if (query) {
                router.push(`/search?query=${query}`);
            }
        });
    };

    return (
        <Suspense>
            <form
                ref={formRef}
                className="relative flex w-full flex-col items-center justify-center gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    className="placeholder:gray-500 relative inset-0 mt-2 block h-[30px] w-full rounded-sm border border-gray-300 pl-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 sm:text-sm"
                    type="text"
                    ref={inputRef}
                    maxLength={150}
                    placeholder="Username or user ID"
                    required
                    disabled={isSearching}
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    title="input"
                />
                <button
                    className="mt-1 rounded-md bg-gray-400 px-4 py-2 font-semibold text-white focus:outline-none focus:ring focus:ring-blue-300 sm:text-sm"
                    disabled={isSearching}
                    type="submit"
                    onClick={generateCast}
                >
                    {isSearching ? "Generating..." : "Generate cast"}
                </button>
            </form>
        </Suspense>
    );
}
