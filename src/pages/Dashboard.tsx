import { useMemo, useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Sidebar from "../components/Sidebar";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Dashboard() {
    const { jobs } = useJobs();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const statusData = useMemo(() => {
        const statusCounts = jobs.reduce((acc, job) => {
            acc[job.status] = (acc[job.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(statusCounts).map(([status, count]) => ({
            status,
            count,
        }));
    }, [jobs]);

    const monthlyData = useMemo(() => {
        const monthlyCounts = jobs.reduce((acc, job) => {
            const month = new Date(job.appliedDate).toLocaleString('default', { month: 'short', year: 'numeric' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(monthlyCounts).map(([month, count]) => ({
            month,
            applications: count,
        }));
    }, [jobs]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
            <Sidebar />

            <main className="flex-1 overflow-y-auto px-10 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Status Distribution */}
                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h2 className="text-xl font-semibold mb-4">Application Status</h2>
                            {loading ? (
                                <Skeleton height={300} />
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={statusData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="count"
                                        >
                                            {statusData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        {/* Monthly Applications */}
                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h2 className="text-xl font-semibold mb-4">Applications Over Time</h2>
                            {loading ? (
                                <Skeleton height={300} />
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="applications" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-zinc-400">Total Applications</h3>
                            <p className="text-3xl font-bold text-black dark:text-white">{jobs.length}</p>
                        </div>
                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-zinc-400">Interviews</h3>
                            <p className="text-3xl font-bold text-black dark:text-white">
                                {jobs.filter(job => job.status === 'Interview').length}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-zinc-400">Offers</h3>
                            <p className="text-3xl font-bold text-black dark:text-white">
                                {jobs.filter(job => job.status === 'Offer').length}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-900 p-6">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-zinc-400">Success Rate</h3>
                            <p className="text-3xl font-bold text-black dark:text-white">
                                {jobs.length > 0 ? Math.round((jobs.filter(job => job.status === 'Offer').length / jobs.length) * 100) : 0}%
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}