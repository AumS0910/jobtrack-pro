import type { JSX } from "react";

export default function Header(): JSX.Element {
    return (
        <header className="border-b border-white/5 bg-[#0b0b0f]">
            <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight">
                    JobTrack
                </h1>


            </div>
        </header>
    );
}