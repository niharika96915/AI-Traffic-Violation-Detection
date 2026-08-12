import { useState } from "react";
import api from "../services/api";

export default function VehicleHistory() {
    const [numberPlate, setNumberPlate] = useState("");
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Search vehicle history
    const searchVehicle = async () => {
        if (!numberPlate.trim()) {
            setError("Please enter a number plate.");
            return;
        }

        setLoading(true);
        setError("");
        setHistory(null);

        try {
            const response = await api.get(
                `/vehicle-history/${numberPlate.trim()}`
            );

            setHistory(response.data);
        } catch (err) {
            console.error(err);

            setError(
                "Unable to fetch vehicle history."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg mt-6">

            {/* =========================
                Header
            ========================= */}

            <div className="mb-5">
                <h2 className="text-white text-xl font-semibold">
                    🚗 Vehicle History
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                    Search complete violation history using a number plate.
                </p>
            </div>


            {/* =========================
                Search
            ========================= */}

            <div className="flex flex-col sm:flex-row gap-3">

                <input
                    type="text"
                    placeholder="Enter Number Plate"
                    value={numberPlate}
                    onChange={(e) =>
                        setNumberPlate(
                            e.target.value.toUpperCase()
                        )
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchVehicle();
                        }
                    }}
                    className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={searchVehicle}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                    {loading ? "Searching..." : "Search"}
                </button>

            </div>


            {/* =========================
                Error
            ========================= */}

            {error && (
                <p className="text-red-400 mt-4">
                    {error}
                </p>
            )}


            {/* =========================
                Results
            ========================= */}

            {history && (
                <div className="mt-6">

                    {/* =========================
                        Summary Cards
                    ========================= */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* Number Plate */}

                        <div className="bg-slate-700 rounded-lg p-4">

                            <p className="text-gray-400 text-sm">
                                Number Plate
                            </p>

                            <p className="text-blue-300 font-mono text-lg mt-1">
                                {history.number_plate}
                            </p>

                        </div>


                        {/* Total Violations */}

                        <div className="bg-slate-700 rounded-lg p-4">

                            <p className="text-gray-400 text-sm">
                                Total Violations
                            </p>

                            <p className="text-red-400 text-2xl font-bold mt-1">
                                {history.total_violations}
                            </p>

                        </div>


                        {/* Risk Score */}

                        <div className="bg-slate-700 rounded-lg p-4">

                            <p className="text-gray-400 text-sm">
                                Risk Score
                            </p>

                            <div className="flex items-center gap-2 mt-1">

                                <p className="text-white text-2xl font-bold">
                                    {history.risk_score ?? 0}
                                </p>

                                <span className="text-gray-400">
                                    / 100
                                </span>

                            </div>

                        </div>


                        {/* Risk Level */}

                        <div className="bg-slate-700 rounded-lg p-4">

                            <p className="text-gray-400 text-sm">
                                Risk Level
                            </p>

                            <p
                                className={`text-xl font-bold mt-1 ${
                                    history.risk_level === "CRITICAL"
                                        ? "text-red-500"
                                        : history.risk_level === "HIGH"
                                        ? "text-orange-400"
                                        : history.risk_level === "MEDIUM"
                                        ? "text-yellow-400"
                                        : "text-green-400"
                                }`}
                            >
                                {history.risk_level || "LOW"}
                            </p>

                        </div>

                    </div>


                    {/* =========================
                        Repeat Offender
                    ========================= */}

                    {history.repeat_offender && (
                        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">

                            <p className="text-red-400 font-semibold">
                                🚨 Repeat Offender Detected
                            </p>

                            <p className="text-gray-400 text-sm mt-1">
                                This vehicle has multiple recorded traffic violations.
                            </p>

                        </div>
                    )}


                    {/* =========================
                        Violation Breakdown
                    ========================= */}

                    {history.violation_counts &&
                        Object.keys(history.violation_counts).length > 0 && (

                            <div className="mt-5">

                                <h3 className="text-white font-semibold mb-3">
                                    Violation Breakdown
                                </h3>

                                <div className="flex flex-wrap gap-3">

                                    {Object.entries(
                                        history.violation_counts
                                    ).map(([violation, count]) => (

                                        <div
                                            key={violation}
                                            className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
                                        >

                                            <span className="text-red-300">
                                                {violation}
                                            </span>

                                            <span className="text-white font-bold ml-3">
                                                {count}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>
                        )
                    }


                    {/* =========================
                        Violation History
                    ========================= */}

                    <div className="mt-6">

                        <h3 className="text-white font-semibold mb-3">
                            Violation History
                        </h3>


                        {history.violations?.length > 0 ? (

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[700px]">

                                    <thead>

                                        <tr className="border-b border-slate-600">

                                            <th className="text-left p-3 text-gray-300">
                                                Vehicle
                                            </th>

                                            <th className="text-left p-3 text-gray-300">
                                                Violation
                                            </th>

                                            <th className="text-left p-3 text-gray-300">
                                                Timestamp
                                            </th>

                                            <th className="text-left p-3 text-gray-300">
                                                Evidence
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {history.violations.map(
                                            (item, index) => (

                                                <tr
                                                    key={`${item.Timestamp}-${index}`}
                                                    className="border-b border-slate-700 hover:bg-slate-700/40"
                                                >

                                                    <td className="p-3">
                                                        {item.VehicleType}
                                                    </td>

                                                    <td className="p-3 text-red-400">
                                                        {item.Violation}
                                                    </td>

                                                    <td className="p-3 text-gray-300 whitespace-nowrap">
                                                        {item.Timestamp}
                                                    </td>

                                                    <td className="p-3">

                                                        <span className="text-gray-400 text-sm">
                                                            {item.Evidence}
                                                        </span>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        ) : (

                            <p className="text-gray-400">
                                No violations found for this vehicle.
                            </p>

                        )}

                    </div>

                </div>
            )}

        </div>
    );
}