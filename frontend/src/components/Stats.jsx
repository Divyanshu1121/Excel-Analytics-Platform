import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

export default function Stats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/stats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(res => setStats(res.data))
            .catch(err => console.error("Failed to fetch stats:", err));
    }, []);

    if (!stats) return <div>Loading stats...</div>;

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="p-6 overflow-auto">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Admin Statistics</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-4 rounded shadow text-center">
                            <h2 className="text-sm text-gray-500">Total Users</h2>
                            <p className="text-2xl font-bold text-blue-700">{stats.totalUsers}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow text-center">
                            <h2 className="text-sm text-gray-500">Total Files Uploaded</h2>
                            <p className="text-2xl font-bold text-blue-700">{stats.totalFiles}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow mb-8">
                        <h2 className="text-lg font-semibold mb-4">Top Uploaders</h2>
                        {stats.topUploaders.length === 0 ? (
                            <p className="text-gray-500">No uploads yet.</p>
                        ) : (
                            <ul className="space-y-2">
                                {stats.topUploaders.map((u, i) => (
                                    <li key={i} className="text-gray-700">
                                        🧑 User ID: {u._id} — {u.count} uploads
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">File Types</h2>
                        <ul className="space-y-2">
                            {stats.fileTypes.map((f, i) => (
                                <li key={i} className="text-gray-700">
                                    📁 .{f._id?.toLowerCase()} — {f.count} files
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
}
