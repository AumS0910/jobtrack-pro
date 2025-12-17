import { LayoutGrid, Settings, User, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useJobs } from "../context/JobContext";
import { useAuth } from "../context/AuthContext";
const navItems = [
    { id: "board", label: "Board", icon: LayoutGrid },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
];

export default function Sidebar() {
    const { theme, toggleTheme } = useTheme();
    const { jobs } = useJobs();
    const { logout } = useAuth();
    return (
        <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-900 flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-900 flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold text-black dark:text-white">
                        JobTrack
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">Application Manager</p>
                </div>

                {/* THEME TOGGLE */}
                <button
                    onClick={toggleTheme}
                    className="
            p-2 rounded-lg
            bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800
            transition-colors
          "
                >
                    {theme === "dark" ? (
                        <Sun className="w-4 h-4 text-gray-600 dark:text-zinc-300" />
                    ) : (
                        <Moon className="w-4 h-4 text-gray-600 dark:text-zinc-700" />
                    )}
                </button>
            </div>



            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
              text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </button>
                ))}

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
              text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-zinc-900">
                <div className="card">
                    <p className="text-xs text-gray-500 dark:text-zinc-400">Total Applications</p>
                    <p className="text-2xl font-bold text-black dark:text-white">{jobs.length}</p>
                </div>
            </div>
        </aside>
    );
}
