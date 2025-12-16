import { useState } from "react";
import Column from "./Column";
import JobModal from "./JobModal";
import type { JobStatus } from "../types/job";
import { useJobs } from "../context/JobContext";
import { Plus } from "lucide-react";

const columns: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function Board() {
    const { jobs, addJob } = useJobs();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <div className="mb-10 flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Application Pipeline
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Track every opportunity in one place
                    </p>
                </div>

                <button onClick={() => setOpen(true)} className="btn-primary flex items-center gap-2">

                    <Plus className="w-4 h-4" />
                    Add Job
                </button>
            </div>

            {/* Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {columns.map((status) => (
                    <Column
                        key={status}
                        title={status}
                        jobs={jobs.filter((job) => job.status === status)}
                    />
                ))}
            </div>

            {/* Modal */}
            {open && (
                <JobModal
                    onClose={() => setOpen(false)}
                    onSubmit={(data) => {
                        addJob({
                            id: crypto.randomUUID(),
                            company: data.company,
                            role: data.role,
                            status: data.status,
                            appliedDate: new Date().toISOString().split("T")[0],
                        });
                    }}
                />
            )}
        </>
    );
}
