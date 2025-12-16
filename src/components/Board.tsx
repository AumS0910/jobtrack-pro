import { useState } from "react";
import Column from "./Column";
import JobModal from "./JobModal";
import type { Job, JobStatus } from "../types/job";

const initialJobs: Job[] = [
    {
        id: "1",
        company: "Google",
        role: "Frontend Engineer",
        status: "Applied",
        appliedDate: "2025-01-12",
    },
    {
        id: "2",
        company: "Barclays",
        role: "Software Developer",
        status: "Interview",
        appliedDate: "2025-01-10",
    },
];

const columns: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function Board() {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setOpen(true)}
                    className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
                >
                    + Add Job
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {columns.map((status) => (
                    <Column
                        key={status}
                        title={status}
                        jobs={jobs.filter((job) => job.status === status)}
                    />
                ))}
            </div>

            {open && (
                <JobModal
                    onClose={() => setOpen(false)}
                    onSubmit={(data) => {
                        setJobs([
                            ...jobs,
                            {
                                id: crypto.randomUUID(),
                                company: data.company,
                                role: data.role,
                                status: data.status,
                                appliedDate: new Date().toISOString().split("T")[0],
                            },
                        ]);
                    }}
                />
            )}
        </>
    );
}
