import React from "react";
import { NavLink } from "react-router-dom";

const adminLinks = [
    { name: "Admin Dashboard", path: "/admin", icon: "🛡" },
    { name: "All Uploads", path: "/admin/uploads", icon: "📁" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Stats", path: "/admin/stats", icon: "📊" },
];

export default function AdminSidebar() {
    return (
        <aside className="w-64 bg-white h-screen p-4 shadow-md hidden md:block">
            <div className="space-y-4">
                {adminLinks.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded text-gray-700 hover:bg-blue-100 ${isActive ? "bg-blue-100 font-medium text-blue-700" : ""
                            }`
                        }
                    >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
}
