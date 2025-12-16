interface ColumnProps {
    title: string;
}

export default function Column({ title }: ColumnProps) {
    return (
        <div className="bg-white border rounded-xl p-4 min-h-[420px]">
            <h2 className="text-sm font-medium mb-4 text-zinc-700">
                {title}
            </h2>

            <div className="space-y-3">

            </div>
        </div>
    )
}