import Column from "./Column";
import type { Job, JobStatus } from "../types/job";

const jobs: Job[] = [
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

const columns: JobStatus[] = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
];

export default function Board() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {columns.map(status => (
                <Column
                    key={status}
                    title={status}
                    jobs={jobs.filter(job => job.status === status)}
                />
            ))}
        </div>
    );
}
