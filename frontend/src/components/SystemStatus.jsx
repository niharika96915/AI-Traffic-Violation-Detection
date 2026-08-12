export default function SystemStatus() {

    return (
        <div className="grid grid-cols-3 gap-4 mt-6">

            {/* AI Status */}
            <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">

                <div>
                    <p className="text-gray-400 text-sm">
                        AI Detection
                    </p>

                    <p className="text-green-400 font-semibold">
                        Running
                    </p>
                </div>

                <span className="w-3 h-3 bg-green-500 rounded-full"></span>

            </div>


            {/* Camera Status */}
            <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">

                <div>
                    <p className="text-gray-400 text-sm">
                        Camera
                    </p>

                    <p className="text-green-400 font-semibold">
                        Connected
                    </p>
                </div>

                <span className="w-3 h-3 bg-green-500 rounded-full"></span>

            </div>


            {/* Backend Status */}
            <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">

                <div>
                    <p className="text-gray-400 text-sm">
                        Backend API
                    </p>

                    <p className="text-green-400 font-semibold">
                        Online
                    </p>
                </div>

                <span className="w-3 h-3 bg-green-500 rounded-full"></span>

            </div>

        </div>
    );
}