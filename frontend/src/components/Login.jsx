import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // ✅ default role

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
                { email, password, role }
            );
            localStorage.setItem("token", res.data.token);

            // ✅ Redirect based on role
            navigate(role === "admin" ? "/admin" : "/dashboard");
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            alert("Login failed: " + (err.response?.data?.msg || err.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
