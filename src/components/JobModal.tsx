import type { JobStatus } from "../types/job";

interface JobModalProps {
    onClose: () => void;
    onSubmit: (data: {
        company: string;
        role: string;
        status: JobStatus;
    }) => void;
}

export default function JobModal({ onClose, onSubmit }: JobModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-2xl bg-[#0f0f16] border border-white/10 p-6">
                <h2 className="text-lg font-semibold mb-6">
                    Add Job
                </h2>

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const formData = new FormData(form);

                        onSubmit({
                            company: formData.get("company") as string,
                            role: formData.get("role") as string,
                            status: formData.get("status") as JobStatus,
                        });

                        onClose();
                    }}
                >
                    <input
                        name="company"
                        placeholder="Company"
                        required
                        className="w-full rounded-lg bg-[#12121a] border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-400"
                    />

                    <input
                        name="role"
                        placeholder="Role"
                        required
                        className="w-full rounded-lg bg-[#12121a] border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-400"
                    />

                    <select
                        name="status"
                        className="w-full rounded-lg bg-[#12121a] border border-white/10 px-4 py-2 text-sm outline-none focus:border-indigo-400"
                    >
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-zinc-400 hover:text-zinc-200 transition duration-200"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 transition duration-200"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
