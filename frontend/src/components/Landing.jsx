import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Welcome to Excel Analytics Platform</h1>
            <p className="text-lg md:text-xl text-blue-900 max-w-2xl mb-6">
                Upload your Excel files, generate smart insights and interactive charts in seconds. Ideal for students, analysts, and developers.
            </p>
            <div className="space-x-4">
                <Link to="/login">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-lg shadow">Login</button>
                </Link>
                <Link to="/register">
                    <button className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded text-lg shadow">Get Started</button>
                </Link>
            </div>
        </div>
    );
}