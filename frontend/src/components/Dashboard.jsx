import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({ totalUploads: 0, lastUploadDate: null });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/upload/user-stats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                setStats(res.data);
            })
            .catch((err) => {
                console.error("Error loading stats:", err);
            });

        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/api/upload/history`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => setHistory(res.data.history))
            .catch((err) => console.error("Error fetching upload history:", err));
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="p-6 overflow-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard 🎉</h1>

                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-sm text-gray-500">Total Files</h2>
                            <p className="text-2xl font-bold text-blue-700">{stats.totalUploads}</p>
                        </div>
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-sm text-gray-500">Charts Built</h2>
                            <p className="text-2xl font-bold text-blue-700">8</p>
                        </div>
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-sm text-gray-500">Downloads</h2>
                            <p className="text-2xl font-bold text-blue-700">5</p>
                        </div>
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-sm text-gray-500">Last Upload</h2>
                            <p className="text-2xl font-bold text-blue-700">
                                {stats.lastUploadDate
                                    ? new Date(stats.lastUploadDate).toLocaleDateString()
                                    : "N/A"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Activity Log</h2>
                        <ul className="bg-white rounded shadow p-4 text-gray-700 space-y-2">
                            {history.length === 0 ? (
                                <li className="text-gray-400 italic">No activity yet.</li>
                            ) : (
                                history.slice(0, 5).map((item) => (
                                    <li key={item._id}>
                                        ✅ Uploaded: <strong>{item.fileName}</strong> on{" "}
                                        {new Date(item.uploadedAt).toLocaleString()}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">📁 Your Upload History</h2>
                        {history.length === 0 ? (
                            <p className="text-gray-500">No uploads yet.</p>
                        ) : (
                            <div className="overflow-x-auto bg-white rounded shadow-md">
                                <table className="min-w-full border-collapse">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="text-left px-4 py-2 border">File Name</th>
                                            <th className="text-left px-4 py-2 border">Uploaded On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((item) => (
                                            <tr key={item._id}>
                                                <td className="px-4 py-2 border">{item.fileName}</td>
                                                <td className="px-4 py-2 border">
                                                    {new Date(item.uploadedAt).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
