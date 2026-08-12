import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 bg-slate-800 flex items-center justify-between px-8 border-b border-slate-700">

      <h2 className="text-white text-xl font-semibold">
        AI Traffic Violation Dashboard
      </h2>

      <div className="flex items-center gap-6">

        <Search className="text-gray-300" />

        <Bell className="text-gray-300" />

        <UserCircle
          className="text-blue-400"
          size={32}
        />

      </div>

    </div>
  );
}