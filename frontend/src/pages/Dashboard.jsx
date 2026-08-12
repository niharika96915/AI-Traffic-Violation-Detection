import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import VehicleChart from "../components/VehicleChart";
import ViolationChart from "../components/ViolationChart";
import RecentViolations from "../components/RecentViolations";
import { toast } from "react-toastify";

import api from "../services/api";
import LiveCamera from "../components/LiveCamera";
import SystemStatus from "../components/SystemStatus";
import VehicleHistory from "../components/VehicleHistory";

export default function Dashboard() {

    const [stats, setStats] = useState(null);
    const [recent, setRecent] = useState([]);
    const [previousCount, setPreviousCount] = useState(null);

    useEffect(() => {

        const fetchData = () => {

            // Fetch Statistics
            api.get("/statistics")
    .then((response) => {

        const newStats = response.data;

        if (
            previousCount !== null &&
            newStats.total_violations > previousCount
        ) {
            toast.error("🚨 New Traffic Violation Detected!", {
                position: "top-right",
            });
        }

        setPreviousCount(newStats.total_violations);
        setStats(newStats);

    })
    .catch((error) => {
        console.error(error);
    });
            // Fetch Recent Violations
            api.get("/recent")
                .then((response) => {
                    setRecent(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });

        };

        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);

    }, []);

    if (!stats) {
        return (
            <div className="bg-slate-900 min-h-screen flex justify-center items-center text-white text-2xl">
                Loading Dashboard...
            </div>
        );
    }

    return (

        <div className="flex bg-slate-900 min-h-screen">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-8">

                    {/* Dashboard Cards */}

                    <div className="grid grid-cols-4 gap-6">

                        <DashboardCard
                            title="Total Violations"
                            value={stats.total_violations}
                            color="text-red-500"
                        />

                        <DashboardCard
                            title="Cars"
                            value={stats.vehicle_counts?.car || 0}
                            color="text-blue-500"
                        />

                        <DashboardCard
                            title="Bus"
                            value={stats.vehicle_counts?.bus || 0}
                            color="text-green-500"
                        />

                        <DashboardCard
                            title="Motorcycle"
                            value={stats.vehicle_counts?.motorcycle || 0}
                            color="text-yellow-500"
                        />

                    </div>
                    <SystemStatus />
                    {/* Charts */}

                    <div className="grid grid-cols-2 gap-6 mt-8">

                        <VehicleChart
                            data={stats.vehicle_counts}
                        />

                        <ViolationChart
                            data={stats.violation_counts}
                        />

                    </div>
                    <div className="mt-8">
    <LiveCamera />
</div>
                    {/* Recent Violations */}

                    <RecentViolations
                        violations={recent}
                    />
                    <VehicleHistory />

                </div>

            </div>

        </div>

    );
}