import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import html2canvas from "html2canvas";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUsers(res.data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const handlePromote = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/users/promote/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("User promoted successfully");
            fetchUsers(); // Refresh list
        } catch (err) {
            alert("Failed to promote user");
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (err) {
            toast.error("Failed to delete user");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const exportAsImage = () => {
        const input = document.getElementById("users-table");
        if (!input) return;

        html2canvas(input).then((canvas) => {
            const link = document.createElement("a");
            link.download = "users-list.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="p-6 overflow-auto">
                    <h1 className="text-2xl font-bold mb-6">👥 All Users</h1>
                    <button
                        onClick={exportAsImage}
                        className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
                    >
                        📤 Export Table as PNG
                    </button>
                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Email</th>
                                    <th className="px-4 py-2 border">Role</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-4 py-2 border">{user.name}</td>
                                        <td className="px-4 py-2 border">{user.email}</td>
                                        <td className="px-4 py-2 border">{user.role}</td>
                                        <td className="px-4 py-2 border space-x-2">
                                            {user.role !== "admin" && (
                                                <button
                                                    onClick={() => handlePromote(user._id)}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                                >
                                                    Promote
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default UsersList;
