export default function MultiSelect({ label, options, value = [], onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">{label}</label>
      <select
        multiple
        value={value}
        onChange={onChange}
        className="w-full h-48 bg-gray-700 border border-gray-600 rounded-lg text-white p-3"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}