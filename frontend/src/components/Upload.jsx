import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, LineChart, Line,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [chartType, setChartType] = useState("bar");
    const [xAxisKey, setXAxisKey] = useState("");
    const [yAxisKey, setYAxisKey] = useState("");
    const [insight, setInsight] = useState("");
    const [loadingInsight, setLoadingInsight] = useState(false);

    const chartRef = useRef(null);

    const chartColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

    const handleUpload = async () => {
        if (!file) return alert("Please select a file first.");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/upload/excel`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setTableData(res.data.data);
        } catch (err) {
            alert("Upload failed: " + (err.response?.data?.msg || err.message));
        }
    };

    const labelKey = xAxisKey || (tableData.length > 0 ? Object.keys(tableData[0]).find(k => typeof tableData[0][k] === "string") || Object.keys(tableData[0])[0] : "");
    const numericKey = yAxisKey || (tableData.length > 0 ? Object.keys(tableData[0]).find(k => typeof tableData[0][k] === "number") || "" : "");

    const handleExport = async () => {
        if (!chartRef.current) return;
        const canvas = await html2canvas(chartRef.current);
        const link = document.createElement("a");
        link.download = `${chartType}-chart.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const generateInsight = async () => {
        try {
            setLoadingInsight(true);
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/insight`,
                { data: tableData },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setInsight(res.data.summary);
        } catch (err) {
            alert("Failed to generate insight: " + (err.response?.data?.msg || err.message));
        } finally {
            setLoadingInsight(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="p-6 overflow-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Excel File</h1>

                    <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="mb-4"
                        />
                        <button
                            onClick={handleUpload}
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            Upload
                        </button>
                    </div>

                    {tableData.length > 0 && (
                        <>
                            <div className="mt-8 overflow-x-auto max-h-[400px] bg-white shadow rounded">
                                <table className="min-w-full border-collapse table-auto">
                                    <thead className="bg-gray-100 sticky top-0">
                                        <tr>
                                            {Object.keys(tableData[0]).map((key) => (
                                                <th key={key} className="px-4 py-2 border text-left text-sm text-gray-600">{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, i) => (
                                            <tr key={i}>
                                                {Object.values(row).map((val, j) => (
                                                    <td key={j} className="px-4 py-2 border text-sm">{val}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Chart Type</label>
                                    <select
                                        value={chartType}
                                        onChange={(e) => setChartType(e.target.value)}
                                        className="p-2 border rounded w-48"
                                    >
                                        <option value="bar">Bar Chart</option>
                                        <option value="pie">Pie Chart</option>
                                        <option value="line">Line Chart</option>
                                        <option value="radar">Radar Chart</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">X-Axis</label>
                                    <select
                                        value={xAxisKey}
                                        onChange={(e) => setXAxisKey(e.target.value)}
                                        className="p-2 border rounded w-48"
                                    >
                                        {Object.keys(tableData[0]).map((key) => (
                                            <option key={key} value={key}>{key}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Y-Axis</label>
                                    <select
                                        value={yAxisKey}
                                        onChange={(e) => setYAxisKey(e.target.value)}
                                        className="p-2 border rounded w-48"
                                    >
                                        {Object.keys(tableData[0]).map((key) => (
                                            <option key={key} value={key}>{key}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 mb-2">
                                <h2 className="text-xl font-semibold">📊 {chartType.toUpperCase()} Chart</h2>
                                <button
                                    onClick={handleExport}
                                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                                >
                                    Export Chart
                                </button>
                            </div>

                            <div ref={chartRef} className="bg-white p-4 rounded shadow-md mb-8">
                                {chartType === "bar" && (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={tableData}>
                                            <XAxis dataKey={labelKey} />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey={numericKey} fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                                {chartType === "pie" && (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={tableData}
                                                dataKey={numericKey}
                                                nameKey={labelKey}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                fill="#82ca9d"
                                                label
                                            >
                                                {tableData.map((_, i) => (
                                                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                )}
                                {chartType === "line" && (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={tableData}>
                                            <XAxis dataKey={labelKey} />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey={numericKey} stroke="#82ca9d" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                )}
                                {chartType === "radar" && (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <RadarChart data={tableData}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey={labelKey} />
                                            <PolarRadiusAxis />
                                            <Radar name="Value" dataKey={numericKey} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                            <Tooltip />
                                            <Legend />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </>
                    )}

                    {tableData.length > 0 && (
                        <div className="mt-8 bg-white p-6 rounded shadow">
                            <h2 className="text-xl font-semibold mb-4">🧠 AI-Powered Data Summary</h2>
                            <button
                                onClick={generateInsight}
                                disabled={loadingInsight}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loadingInsight ? "Generating Insight..." : "Generate Data Insights (AI)"}
                            </button>

                            {insight && (
                                <p className="mt-4 whitespace-pre-line text-gray-800 leading-relaxed">
                                    {insight}
                                </p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
