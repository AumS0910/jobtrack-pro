import type { Job } from "../types/job";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 hover:bg-zinc-100 transition">
            <p className="text-sm font-medium text-zinc-900">
                {job.role}
            </p>

            <p className="text-xs text-zinc-500 mt-1">
                {job.company}
            </p>

            <p className="text-[11px] text-zinc-400 mt-2">
                Applied on {job.appliedDate}
            </p>
        </div>
    );
}
