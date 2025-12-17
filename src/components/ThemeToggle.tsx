import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg
                 bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-300
                 hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
