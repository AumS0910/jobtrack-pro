export type JobStatus =
    | "Applied"
    | "Interview"
    | "Offer"
    | "Rejected";

export type Job = {
    id: string;
    company: string;
    role: string;
    status: JobStatus;
    appliedDate: string;
};
