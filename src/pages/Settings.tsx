// src/pages/Settings.tsx
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";

export default function Settings() {
    const { theme, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(false);

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
            <Sidebar />

            <main className="flex-1 overflow-y-auto px-10 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Settings</h1>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                            <div className="flex items-center justify-between">
                                <span>Theme</span>
                                <button
                                    onClick={toggleTheme}
                                    className="px-4 py-2 bg-gray-200 dark:bg-zinc-800 rounded-md hover:bg-gray-300 dark:hover:bg-zinc-700"
                                >
                                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>Push Notifications</span>
                                    <input
                                        type="checkbox"
                                        checked={notifications}
                                        onChange={(e) => setNotifications(e.target.checked)}
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Email Updates</span>
                                    <input
                                        type="checkbox"
                                        checked={emailUpdates}
                                        onChange={(e) => setEmailUpdates(e.target.checked)}
                                        className="w-4 h-4"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h2 className="text-xl font-semibold mb-4">Account</h2>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
