export default function Input({ label, required, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2 text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none transition"
        {...props}
      />
    </div>
  );
}