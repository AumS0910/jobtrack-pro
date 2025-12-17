// src/pages/Profile.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function Profile() {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    const handleSave = () => {
        if (user) {
            updateUser({ ...user, name, email });
            setIsEditing(false);
        }
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
            <Sidebar />

            <main className="flex-1 overflow-y-auto px-10 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Profile</h1>

                    <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-black dark:text-white"
                                    />
                                ) : (
                                    <p className="text-lg">{user?.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-black dark:text-white"
                                    />
                                ) : (
                                    <p className="text-lg">{user?.email}</p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
