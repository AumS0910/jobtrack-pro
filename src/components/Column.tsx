import JobCard from "./JobCard";
import type { Job } from "../types/job";
import { statusConfig } from "../constants/statusConfig";
import type { JobStatus } from "../types/job";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
    title: JobStatus;
    jobs: Job[];
}

export default function Column({ title, jobs }: ColumnProps) {
    const StatusIcon = statusConfig[title].icon;
    const { setNodeRef, isOver } = useDroppable({
        id: title,
    });

    return (
        <div ref={setNodeRef} className={`flex flex-col gap-4 ${isOver ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2' : ''}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={`${statusConfig[title].lightColor} ${statusConfig[title].textColor} p-2 rounded-xl`}
                    >
                        <StatusIcon className="w-4 h-4" />
                    </div>
                    <h2 className="text-sm font-semibold text-black dark:text-white">{title}</h2>
                </div>

                <span className="text-xs font-semibold text-gray-600 dark:text-zinc-400">
                    {jobs.length}
                </span>
            </div>

            <div className="space-y-3">
                {jobs.length === 0 ? (
                    <div className="card text-center py-10 text-gray-600 dark:text-zinc-600 text-sm">
                        No applications
                    </div>
                ) : (
                    jobs.map(job => <JobCard key={job.id} job={job} />)
                )}
            </div>
        </div>
    );
}
