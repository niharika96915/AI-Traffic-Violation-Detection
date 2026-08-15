export default function DashboardCard({
    title,
    value,
    color
}) {
    return (
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

            <p className="text-gray-400">
                {title}
            </p>

            <h1
                className={`text-4xl font-bold mt-3 ${color}`}
            >
                {value}
            </h1>

        </div>
    );
}
