import type { Job } from "../types/job";
import { statusConfig } from "../constants/statusConfig";
import { Building2, Calendar } from "lucide-react";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const StatusIcon = statusConfig[job.status].icon;

    return (
        <div
            className="
        group bg-zinc-900/50 backdrop-blur-sm
        rounded-xl p-4
        border border-zinc-800/50
        transition-all duration-200
        hover:bg-zinc-900/70 hover:border-zinc-700/50
        cursor-pointer
      "
        >
            {/* Top */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-white leading-snug mb-1.5">
                        {job.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Building2 className="w-3.5 h-3.5" />
                        {job.company}
                    </div>
                </div>

                <div
                    className={`${statusConfig[job.status].lightColor} ${statusConfig[job.status].textColor} p-1.5 rounded-lg transition-transform duration-200 group-hover:scale-110`}
                >
                    <StatusIcon className="w-4 h-4" />
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 pt-3 border-t border-zinc-800/50">
                <Calendar className="w-3.5 h-3.5" />
                {job.appliedDate}
            </div>
        </div>
    );
}
