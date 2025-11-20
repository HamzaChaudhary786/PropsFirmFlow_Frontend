export default function Textarea({ label, required, className = "", ...props }) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium mb-2 text-gray-300">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none focus:ring-2 focus:ring-cyan-500 outline-none transition"
                {...props}
            />
        </div>
    );
}