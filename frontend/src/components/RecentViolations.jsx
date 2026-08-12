import { useState } from "react";
import EvidenceModal from "./EvidenceModal";

export default function RecentViolations({ violations }) {

    const [selectedImage, setSelectedImage] = useState(null);

    const [search, setSearch] = useState("");

    const [vehicleFilter, setVehicleFilter] = useState("All");

    const [violationFilter, setViolationFilter] = useState("All");

    const [dateFilter, setDateFilter] = useState("");


    // Get unique violation types
    const violationTypes = [
        ...new Set(
            violations.map((item) => item.Violation)
        )
    ];


    // Open evidence
    const handleEvidence = (item) => {

        setSelectedImage(item.Evidence);

    };


    // Apply filters
    const filteredViolations = violations.filter((item) => {

        // Vehicle ID / Number Plate search
        const searchText = search.toLowerCase();

        const searchMatch =
            String(item.VehicleID || "")
                .toLowerCase()
                .includes(searchText) ||

            String(item.NumberPlate || "")
                .toLowerCase()
                .includes(searchText);


        // Vehicle type
        const vehicleMatch =
            vehicleFilter === "All" ||
            item.VehicleType === vehicleFilter;


        // Violation type
        const violationMatch =
            violationFilter === "All" ||
            item.Violation === violationFilter;


        // Date filter
        let dateMatch = true;

        if (dateFilter) {

            const timestamp = String(item.Timestamp || "");

            // Timestamp format:
            // 20260805_184501

            const recordDate = timestamp.substring(0, 8);

            const formattedDate =
                `${dateFilter.substring(0, 4)}${dateFilter.substring(5, 7)}${dateFilter.substring(8, 10)}`;

            dateMatch =
                recordDate === formattedDate;
        }


        return (
            searchMatch &&
            vehicleMatch &&
            violationMatch &&
            dateMatch
        );

    });


    // Reset filters
    const resetFilters = () => {

        setSearch("");
        setVehicleFilter("All");
        setViolationFilter("All");
        setDateFilter("");

    };


    return (

        <>

            <div className="bg-slate-800 rounded-xl p-6 mt-8 shadow-lg">

                {/* Header */}

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-white text-xl font-semibold">
                        Recent Violations
                    </h2>


                    <div className="flex gap-3">

                        {/* CSV */}

                        <button
                            onClick={() =>
                                window.open(
                                    "http://127.0.0.1:8000/export/csv",
                                    "_blank"
                                )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            📥 Export CSV
                        </button>


                        {/* PDF */}

                        <button
                            onClick={() =>
                                window.open(
                                    "http://127.0.0.1:8000/export/pdf",
                                    "_blank"
                                )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                            📄 Export PDF
                        </button>

                    </div>

                </div>


                {/* Filters */}

                <div className="flex flex-wrap gap-3 mb-6">

                    {/* Search */}

                    <input
                        type="text"
                        placeholder="Search Vehicle ID / Number Plate"
                        className="bg-slate-700 text-white px-4 py-2 rounded"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />


                    {/* Vehicle Type */}

                    <select
                        className="bg-slate-700 text-white px-4 py-2 rounded"
                        value={vehicleFilter}
                        onChange={(e) =>
                            setVehicleFilter(e.target.value)
                        }
                    >

                        <option value="All">
                            All Vehicles
                        </option>

                        <option value="car">
                            Car
                        </option>

                        <option value="bus">
                            Bus
                        </option>

                        <option value="truck">
                            Truck
                        </option>

                        <option value="motorcycle">
                            Motorcycle
                        </option>

                    </select>


                    {/* Violation */}

                    <select
                        className="bg-slate-700 text-white px-4 py-2 rounded"
                        value={violationFilter}
                        onChange={(e) =>
                            setViolationFilter(e.target.value)
                        }
                    >

                        <option value="All">
                            All Violations
                        </option>

                        {violationTypes.map(
                            (violation, index) => (

                                <option
                                    key={index}
                                    value={violation}
                                >
                                    {violation}
                                </option>

                            )
                        )}

                    </select>


                    {/* Date */}

                    <input
                        type="date"
                        className="bg-slate-700 text-white px-4 py-2 rounded"
                        value={dateFilter}
                        onChange={(e) =>
                            setDateFilter(e.target.value)
                        }
                    />


                    {/* Reset */}

                    <button
                        onClick={resetFilters}
                        className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded"
                    >
                        Reset
                    </button>

                </div>


                {/* Results count */}

                <p className="text-gray-400 mb-3">

                    Showing {filteredViolations.length} of{" "}
                    {violations.length} violations

                </p>


                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[950px] table-fixed text-white">

                        <thead>

                            <tr className="border-b border-slate-600">

                                <th className="w-[12%] text-left p-4">
                                    Vehicle ID
                                </th>

                                <th className="w-[14%] text-left p-4">
                                    Vehicle
                                </th>

                                <th className="w-[20%] text-left p-4">
                                    Number Plate
                                </th>

                                <th className="w-[18%] text-left p-4">
                                    Violation
                                </th>

                                <th className="w-[21%] text-left p-4">
                                    Time
                                </th>

                                <th className="w-[15%] text-left p-4">
                                    Evidence
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredViolations.map(
                                (item, index) => (

                                    <tr
                                        key={`${item.VehicleID}-${item.Timestamp}-${index}`}
                                        className="border-b border-slate-700 hover:bg-slate-700/40"
                                    >

                                        {/* Vehicle ID */}

                                        <td className="p-4 text-white">
                                            {item.VehicleID}
                                        </td>


                                        {/* Vehicle */}

                                        <td className="p-4 text-white capitalize">
                                            {item.VehicleType}
                                        </td>


                                        {/* Number Plate */}

                                        <td className="p-4">

                                            <span className="font-mono text-blue-300">
                                                {item.NumberPlate || "N/A"}
                                            </span>

                                        </td>


                                        {/* Violation */}

                                        <td className="p-4">

                                            <span className="text-red-400 font-medium">
                                                {item.Violation}
                                            </span>

                                        </td>


                                        {/* Time */}

                                        <td className="p-4 text-gray-300 whitespace-nowrap">
                                            {item.Timestamp}
                                        </td>


                                        {/* Evidence */}

                                        <td className="p-4">

                                            <button
                                                onClick={() =>
                                                    handleEvidence(item)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* Evidence Modal */}

            <EvidenceModal
                image={selectedImage}
                onClose={() =>
                    setSelectedImage(null)
                }
            />

        </>

    );

}