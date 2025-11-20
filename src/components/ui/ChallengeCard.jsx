import { Trash2 } from "lucide-react";
import Input from "./Input";
import Textarea from "./Textarea";

export default function ChallengeCard({ challenge, idx, onUpdate, onRemove, isRemovable }) {
  const update = (field, value) => onUpdate(idx, field, value);
  const toggleType = (opt) => {
    const current = challenge.type || [];
    const newType = current.includes(opt)
      ? current.filter((v) => v !== opt)
      : [...current, opt];
    onUpdate(idx, "type", newType);
  };

  const formatAccountSize = (value) => {
    // Remove extra spaces and remove any existing $
    const clean = value.replace(/^\$/, "").trim();

    // Always return with $
    return clean ? `$${clean}` : "";
  };


  return (
    <div className="border border-gray-700 p-8 rounded-xl relative bg-gray-750 bg-opacity-50 hover:border-cyan-500/50 transition-colors">
      {isRemovable && (
        <button
          onClick={() => onRemove(idx)}
          className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
        >
          <Trash2 size={20} />
        </button>
      )}

      <h3 className="text-xl font-semibold text-white mb-6">Challenge {idx + 1}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Challenge Name"
            required
            placeholder="e.g., $100K Standard Challenge"
            value={challenge.name || ""}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>


        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-300">Challenge Type</label>
          <div className="flex flex-wrap gap-4">
            {["1-Step", "2-Step", "Instant", "Evaluation", "Verification"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(challenge.type || []).includes(opt)}
                  onChange={() => toggleType(opt)}
                  className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                />
                <span className="text-gray-300">{opt}</span>
              </label>
            ))}
          </div>
        </div>
        <Input
          label="Account Size"
          required
          type="text"
          placeholder="10K"
          value={challenge.accountSize || ""}
          onChange={(e) => {
            const formatted = formatAccountSize(e.target.value);
            update("accountSize", formatted);
          }}
        />


        <Input label="Price / Fee (USD)" required type="number" step="0.01" placeholder="299.99"
          value={challenge.price || ""} onChange={(e) => update("price", e.target.value)} />

        <Input label="Discount Code" placeholder="SAVE20"
          value={challenge.discountCode || ""} onChange={(e) => update("discountCode", e.target.value)} />

        <Input label="Discount %" type="number" min="0" max="100" step="0.01" placeholder="20"
          value={challenge.discountPercent || ""} onChange={(e) => update("discountPercent", e.target.value)} />

        <Input label="Price After Discount" readOnly value={challenge.priceAfterDiscount || ""} placeholder="Auto-calculated"
          className="bg-gray-800 cursor-not-allowed" />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-300">Max Drawdown Type</label>
          <div className="flex flex-wrap gap-6">
            {["Trailing", "Locking", "Static"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={`drawdownType-${idx}`} checked={challenge.maxDrawdownType === opt}
                  onChange={() => update("maxDrawdownType", opt)}
                  className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 focus:ring-cyan-500" />
                <span className="text-gray-300">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <Input label="Drawdown Value (%)" placeholder="5" value={challenge.drawdownValue || ""} onChange={(e) => update("drawdownValue", e.target.value)} />
        <Input label="Profit Target (%)" placeholder="10" value={challenge.profitTarget || ""} onChange={(e) => update("profitTarget", e.target.value)} />
        <Input label="Profit Split (%)" placeholder="80" value={challenge.profitSplit || ""} onChange={(e) => update("profitSplit", e.target.value)} />
        <Input label="Leverage" placeholder="1:100" value={challenge.leverage || ""} onChange={(e) => update("leverage", e.target.value)} />

        <div className="md:col-span-2">
          <Input label="Challenge Rules / FAQ URL" type="url" placeholder="https://example.com/rules"
            value={challenge.rulesUrl || ""} onChange={(e) => update("rulesUrl", e.target.value)} />
        </div>

        <Input label="Tags (comma-separated)" placeholder="forex, crypto, fast-payout"
          value={challenge.tags || ""} onChange={(e) => update("tags", e.target.value)} />

        <Input label="Affiliate Link" type="url" placeholder="https://example.com/aff?ref=..."
          value={challenge.affiliateLink || ""} onChange={(e) => update("affiliateLink", e.target.value)} />
      </div>
    </div>
  );
}