import type { Job } from "../types/job";
import JobCard from "./JobCard";

interface ColumnProps {
    title: string;
    jobs: Job[];
}

export default function Column({ title, jobs }: ColumnProps) {
    return (
        <div className="bg-white border rounded-xl p-4 min-h-[420px]">
            <h2 className="text-sm font-medium mb-4 text-zinc-700">
                {title}
            </h2>

            <div className="space-y-3">
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    )
}