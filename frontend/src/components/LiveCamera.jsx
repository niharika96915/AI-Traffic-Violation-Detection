export default function LiveCamera() {
    return (
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

            <div className="flex justify-between items-center mb-4">

                <h2 className="text-white text-xl font-semibold">
                    🎥 Live Camera Feed
                </h2>

                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                    <span className="text-green-400 text-sm">
                        LIVE
                    </span>
                </div>

            </div>

            <div className="bg-black rounded-lg overflow-hidden">

                <img
                    src="http://127.0.0.1:8000/video-feed"
                    alt="Live Traffic Camera"
                    className="w-full h-[400px] object-cover"
                />

            </div>

        </div>
    );
}