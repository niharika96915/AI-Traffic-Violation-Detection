export default function EvidenceModal({
    image,
    onClose
}) {

    if (!image) return null;

    return (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-slate-800 rounded-xl p-6 w-[700px]">

                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-white text-2xl font-bold">
                        Evidence Image
                    </h2>

                    <button
                        onClick={onClose}
                        className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                    >
                        Close
                    </button>

                </div>

                <img
                    src={`http://127.0.0.1:8000/evidence/${image}`}
                    alt="Evidence"
                    className="rounded-lg w-full"
                />

            </div>

        </div>

    );

}