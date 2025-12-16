import Header from "../components/Header";
import Board from "../components/Board";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0b0b0f] text-zinc-100">
            <Header />
            <main className="max-w-7xl mx-auto px-8 py-12">
                <Board />
            </main>
        </div>

    );
}


