import type { Job } from "../types/job";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <div className="
  rounded-xl
  bg-[#12121a]
  border border-white/10
  p-4
">
            <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-100">
                    {job.role}
                </p>
                <p className="text-xs text-zinc-400">
                    {job.company}
                </p>
            </div>

            <p className="text-[11px] text-zinc-500 mt-3">
                Applied · {job.appliedDate}
            </p>
        </div>

    );
}
