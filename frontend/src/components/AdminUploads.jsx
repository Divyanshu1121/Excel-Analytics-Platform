import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminUploads() {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/upload/admin/all`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setUploads(res.data);
            } catch (err) {
                alert("Failed to fetch uploads: " + (err.response?.data?.msg || err.message));
            }
        };
        fetchUploads();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="p-6 overflow-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">All Uploaded Files</h1>
                    {uploads.length === 0 ? (
                        <p>No uploads found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow rounded border">
                                <thead className="bg-gray-200 text-left text-sm">
                                    <tr>
                                        <th className="px-4 py-2">Filename</th>
                                        <th className="px-4 py-2">Sheet</th>
                                        <th className="px-4 py-2">Uploaded By</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploads.map((file) => (
                                        <tr key={file._id} className="border-t text-sm">
                                            <td className="px-4 py-2">{file.filename}</td>
                                            <td className="px-4 py-2">{file.sheetName}</td>
                                            <td className="px-4 py-2">{file.user?.name}</td>
                                            <td className="px-4 py-2">{file.user?.email}</td>
                                            <td className="px-4 py-2">{new Date(file.uploadedAt).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
