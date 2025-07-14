import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";

export default function AdminPanel() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        totalUploads: 0,
        topFileType: "N/A",
    });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/overview`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => setStats(res.data))
            .catch((err) => console.error("Failed to fetch admin stats:", err));
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="p-6 overflow-auto">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">👑 Admin Overview Panel</h1>

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-sm text-gray-500">Total Users</h2>
                            <p className="text-2xl font-bold text-blue-700">{stats.totalUsers}</p>
                        </div>
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-sm text-gray-500">Total Admins</h2>
                            <p className="text-2xl font-bold text-blue-700">{stats.totalAdmins}</p>
                        </div>
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-sm text-gray-500">Total Uploads</h2>
                            <p className="text-2xl font-bold text-blue-700">{stats.totalUploads}</p>
                        </div>
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-sm text-gray-500">Top File Type</h2>
                            <p className="text-2xl font-bold text-blue-700">{stats.topFileType}</p>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2">
                        <a
                            href="/admin/users"
                            className="bg-indigo-600 text-white text-center py-3 rounded hover:bg-indigo-700"
                        >
                            👥 Manage Users
                        </a>
                        <a
                            href="/admin/stats"
                            className="bg-green-600 text-white text-center py-3 rounded hover:bg-green-700"
                        >
                            📊 View System Stats
                        </a>
                    </div>
                </main>
            </div>
        </div>
    );
}
