import type { Job, JobStatus } from "../types/job";
import { statusConfig } from "../constants/statusConfig";
import { Building2, Calendar, Trash2, GripVertical } from "lucide-react";
import { useJobs } from "../context/JobContext";
import { useDraggable } from "@dnd-kit/core";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const StatusIcon = statusConfig[job.status].icon;

    // ✅ FIX: Properly extract functions from context
    const { updateJob, deleteJob } = useJobs();

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: job.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`
        group bg-gray-50 dark:bg-zinc-900/50 backdrop-blur-sm
        rounded-xl p-4
        border border-gray-200 dark:border-zinc-800/50
        transition-all duration-200
        hover:bg-gray-100 dark:hover:bg-zinc-900/70 hover:border-gray-300 dark:hover:border-zinc-700/50
        ${isDragging ? 'opacity-50' : ''}
      `}
        >
            {/* Drag Handle */}
            <div
                {...listeners}
                className="flex items-center justify-center mb-2 cursor-grab active:cursor-grabbing"
            >
                <GripVertical className="w-4 h-4 text-gray-400" />
            </div>

            {/* Top */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-black dark:text-white mb-1.5">
                        {job.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-zinc-400">
                        <Building2 className="w-3.5 h-3.5" />
                        {job.company}
                    </div>
                </div>

                <div
                    className={`${statusConfig[job.status].lightColor} ${statusConfig[job.status].textColor}
          p-1.5 rounded-lg group-hover:scale-110 transition`}
                >
                    <StatusIcon className="w-4 h-4" />
                </div>
            </div>

            {/* ✅ STATUS UPDATE */}
            <select
                value={job.status}
                onChange={(e) =>
                    updateJob({
                        ...job,
                        status: e.target.value as JobStatus,
                    })
                }
                className="
           mt-2 w-full rounded-lg
           bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800
           px-3 py-2 text-xs text-black dark:text-white
           focus:outline-none focus:border-gray-500 dark:focus:border-zinc-700
         "
            >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between border-t border-gray-200 dark:border-zinc-800/50 pt-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {job.appliedDate}
                </div>

                {/* ✅ DELETE BUTTON */}
                <button
                    onClick={() => deleteJob(job.id)}
                    className="
            text-gray-500 dark:text-zinc-500 hover:text-red-400
            transition-colors
          "
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
