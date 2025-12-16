import type { JSX } from "react";

export default function Header(): JSX.Element {
    return (
        <header className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold tracking-tight">
                    JobTrack
                </h1>
            </div>
            <button className="text-sm text-zinc-500">
                Theme
            </button>
        </header>
    )

}