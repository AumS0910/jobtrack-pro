import Board from "../components/Board";
import Sidebar from "../components/Sidebar";

export default function Home() {
    return (
        <div className="h-screen w-screen flex overflow-hidden
                    bg-white text-zinc-900
                    dark:bg-black dark:text-zinc-100">

            <Sidebar />

            <main className="flex-1 overflow-y-auto px-10 py-8">
                <Board />
            </main>
        </div>
    );
}
