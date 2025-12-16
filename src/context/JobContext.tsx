import { useContext, createContext, useState } from "react";
import { useEffect } from "react";
import type { ReactNode } from "react";
import type { Job } from "../types/job";


interface JobContextType {
    jobs: Job[];
    addJob: (job: Job) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
    const [jobs, setJobs] = useState<Job[]>(() => {
        const stored = localStorage.getItem("jobs");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }, [jobs]);

    const addJob = (job: Job) => {
        setJobs(prev => [...prev, job]);
    };

    return (
        <JobContext.Provider value={{ jobs, addJob }}>
            {children}
        </JobContext.Provider>

    );
}

export function useJobs() {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error("useJobs must be used within JobProvider");
    }
    return context;
}
