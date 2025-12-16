import Column from "./Column";

const columns = ["Applied", "Interview", "Offer", "Rejected"] as const;

export default function Board() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {columns.map((col) => (
                <Column key={col} title={col} />
            ))}
        </div>
    );
}