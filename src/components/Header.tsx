import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header(): JSX.Element {
    const { logout } = useAuth();

    return (
        <header className="border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#0b0b0f]">
            <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white">
                    JobTrack
                </h1>

                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}