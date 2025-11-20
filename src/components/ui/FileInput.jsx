export default function FileInput({ label, onChange, preview, required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        onChange={onChange}
        className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:bg-blue-500 file:text-white"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-3 h-32 w-full object-cover rounded-lg border border-gray-600"
        />
      )}
    </div>
  );
}