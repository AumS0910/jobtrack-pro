import Board from "../components/Board";
import Sidebar from "../components/Sidebar";

export default function Home() {
    return (
        <div className="h-screen w-screen bg-black text-white flex overflow-hidden gap-y-5">
            <Sidebar />
            <main className="flex-1 overflow-y-auto px-10 py-8 gap-y-5">
                <Board />
            </main>
        </div>


    );
}


