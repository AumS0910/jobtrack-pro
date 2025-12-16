import type { Job } from "../types/job";
import JobCard from "./JobCard";

interface ColumnProps {
    title: string;
    jobs: Job[];
}

export default function Column({ title, jobs }: ColumnProps) {
    return (
        <div className="rounded-2xl  bg-white/5 backdrop-blur border border-white/10 p-5">


            <h2 className="text-sm font-semibold text-zinc-200">
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