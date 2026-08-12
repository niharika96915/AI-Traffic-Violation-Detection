import {
  LayoutDashboard,
  AlertTriangle,
  Car,
  BarChart3,
  Image,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, title: "Dashboard" },
  { icon: AlertTriangle, title: "Violations" },
  { icon: Car, title: "Vehicles" },
  { icon: BarChart3, title: "Analytics" },
  { icon: Image, title: "Evidence" },
  { icon: Settings, title: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-800 text-white p-6">
      <h1 className="text-2xl font-bold text-blue-400 mb-10">
        🚦 Traffic AI
      </h1>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.title}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition"
          >
            <item.icon size={20} />
            {item.title}
          </button>
        ))}
      </div>
    </aside>
  );
}