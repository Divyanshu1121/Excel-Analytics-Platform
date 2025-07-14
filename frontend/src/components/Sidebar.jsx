import React from "react";
import { NavLink } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const userRole = getUserRole();

const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊", adminOnly: false },
    { name: "Upload Excel", path: "/upload", icon: "📁", adminOnly: false },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white h-screen p-4 shadow-md hidden md:block">
            <div className="space-y-4">
                {navItems.map((item) => {
                    if (item.adminOnly && userRole !== "admin") return null;

                    return (
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
                    );
                })}
            </div>
        </aside>
    );
}
