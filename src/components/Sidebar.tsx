import { LayoutGrid, Settings, User } from "lucide-react";

const navItems = [
    { id: "board", label: "Board", icon: LayoutGrid },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col">
            <div className="p-6 border-b border-zinc-900">
                <h1 className="text-xl font-bold text-white">JobTrack</h1>
                <p className="text-xs text-zinc-500 mt-1">Application Manager</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
              text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-zinc-900">
                <div className="card">
                    <p className="text-xs text-zinc-400">Total Applications</p>
                    <p className="text-2xl font-bold text-white">4</p>
                </div>
            </div>
        </aside>
    );
}
