import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
            <div className="text-2xl font-bold text-blue-700">Excel Analytics</div>
            <div className="flex items-center gap-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}