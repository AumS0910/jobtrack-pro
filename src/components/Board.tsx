import { useState, useMemo, useEffect } from "react";
import Column from "./Column";
import JobModal from "./JobModal";
import type { JobStatus } from "../types/job";
import { useJobs } from "../context/JobContext";
import { Plus, Search } from "lucide-react";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const columns: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function Board() {
    const { jobs, addJob, updateJob } = useJobs();
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredJobs = useMemo(() => {
        if (!searchTerm) return jobs;
        return jobs.filter(job =>
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [jobs, searchTerm]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const jobId = active.id as string;
        const newStatus = over.id as JobStatus;

        const job = jobs.find(j => j.id === jobId);
        if (job && job.status !== newStatus) {
            updateJob({ ...job, status: newStatus });
        }
    };

    return (
        <>
            {/* Header */}
            <div className="mb-10 flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-black dark:text-white mb-1">
                        Application Pipeline
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-zinc-400">
                        Track every opportunity in one place
                    </p>
                </div>

                <button onClick={() => setOpen(true)} className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Job
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search jobs by company or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Columns */}
            {filteredJobs.length === 0 && searchTerm ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-zinc-500 mb-4">
                        <Search className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-2">No results found</h3>
                        <p className="text-sm">Try adjusting your search terms or clear the search to see all jobs.</p>
                    </div>
                    <button
                        onClick={() => setSearchTerm("")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Clear Search
                    </button>
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 dark:text-zinc-500 mb-4">
                        <Plus className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-2">No jobs yet</h3>
                        <p className="text-sm mb-4">Start building your job application pipeline by adding your first job.</p>
                    </div>
                    <button onClick={() => setOpen(true)} className="btn-primary flex items-center gap-2 mx-auto">
                        <Plus className="w-4 h-4" />
                        Add Your First Job
                    </button>
                </div>
            ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {columns.map((status) => (
                        <div key={status} className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <Skeleton width={80} height={20} />
                                <Skeleton width={20} height={20} />
                            </div>
                            <div className="space-y-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-zinc-900/50 rounded-xl p-4 border border-gray-200 dark:border-zinc-800/50">
                                        <Skeleton height={16} className="mb-2" />
                                        <Skeleton height={14} width="60%" className="mb-3" />
                                        <Skeleton height={32} className="mb-3" />
                                        <div className="flex justify-between items-center">
                                            <Skeleton height={12} width="40%" />
                                            <Skeleton width={16} height={16} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {columns.map((status) => (
                            <Column
                                key={status}
                                title={status}
                                jobs={filteredJobs.filter((job) => job.status === status)}
                            />
                        ))}
                    </div>
                </DndContext>
            )}

            {/* Modal */}
            {open && (
                <JobModal
                    onClose={() => setOpen(false)}
                    onSubmit={(data) => {
                        // Validation
                        if (!data.company.trim() || !data.role.trim()) {
                            alert("Company and role are required.");
                            return;
                        }

                        // Duplicate check
                        const isDuplicate = jobs.some(job =>
                            job.company.toLowerCase() === data.company.toLowerCase().trim() &&
                            job.role.toLowerCase() === data.role.toLowerCase().trim()
                        );

                        if (isDuplicate) {
                            alert("A job with this company and role already exists.");
                            return;
                        }

                        addJob({
                            id: crypto.randomUUID(),
                            company: data.company.trim(),
                            role: data.role.trim(),
                            status: data.status,
                            appliedDate: new Date().toISOString().split("T")[0],
                        });
                    }}
                />
            )}
        </>
    );
}
