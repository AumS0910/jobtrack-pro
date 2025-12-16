import Header from "../components/Header";
import Board from "../components/Board";

export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-10">
                <Board />
            </main>
        </div>
    );
}
