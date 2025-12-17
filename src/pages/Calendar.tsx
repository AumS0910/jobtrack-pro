import { useState, useMemo, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Sidebar from "../components/Sidebar";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarView() {
    const { jobs } = useJobs();
    const [selectedDate, setSelectedDate] = useState<Value>(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const jobsByDate = useMemo(() => {
        const grouped = jobs.reduce((acc, job) => {
            const date = job.appliedDate;
            if (!acc[date]) acc[date] = [];
            acc[date].push(job);
            return acc;
        }, {} as Record<string, typeof jobs>);
        return grouped;
    }, [jobs]);

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            const jobsOnDate = jobsByDate[dateStr];
            if (jobsOnDate && jobsOnDate.length > 0) {
                return <div className="text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{jobsOnDate.length}</div>;
            }
        }
        return null;
    };

    const selectedDateStr = selectedDate instanceof Date ? selectedDate.toISOString().split('T')[0] : null;
    const jobsOnSelectedDate = selectedDateStr ? jobsByDate[selectedDateStr] || [] : [];

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
            <Sidebar />

            <main className="flex-1 overflow-y-auto px-10 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Calendar</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            {loading ? (
                                <Skeleton height={400} />
                            ) : (
                                <Calendar
                                    onChange={setSelectedDate}
                                    value={selectedDate}
                                    tileContent={tileContent}
                                    className="w-full"
                                />
                            )}
                        </div>

                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Jobs on {selectedDate instanceof Date ? selectedDate.toDateString() : 'Selected Date'}
                            </h2>
                            {jobsOnSelectedDate.length === 0 ? (
                                <p className="text-gray-500 dark:text-zinc-400">No applications on this date.</p>
                            ) : (
                                <div className="space-y-4">
                                    {jobsOnSelectedDate.map(job => (
                                        <div key={job.id} className="border border-gray-200 dark:border-zinc-800 rounded-lg p-4">
                                            <h3 className="font-medium">{job.role}</h3>
                                            <p className="text-sm text-gray-600 dark:text-zinc-400">{job.company}</p>
                                            <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                                {job.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}