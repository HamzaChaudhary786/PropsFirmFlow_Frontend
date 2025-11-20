"use client";

import { useState, useEffect } from "react";
import { Plus, X, Building2, Globe, DollarSign, TrendingUp, FileText } from "lucide-react";
import { createFirm, updateFirm } from "../../../apis/admin/firms/firmApi";
import { useAuth0 } from "@auth0/auth0-react";

import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import MultiSelect from "../../ui/MultiSelect";
import ChallengeCard from "../../ui/ChallengeCard";

export default function FirmForm({ initialData = null, onSuccess, onCancel }) {
  const isEditMode = !!initialData;
  const { getAccessTokenSilently } = useAuth0();

  const [challenges, setChallenges] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const [formData, setFormData] = useState({
    firmName: "", tagline: "", logo: null, coverImage: null, website: "", ceoName: "",
    broker: "", country: "", founded: "", description: "", restrictedCountries: "",
    platforms: [], assets: [], supportEmail: "", termsUrl: "", refundPolicy: "",
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        firmName: initialData.firmName || "",
        tagline: initialData.tagline || "",
        logo: null,
        coverImage: null,
        website: initialData.website || "",
        ceoName: initialData.ceoName || "",
        broker: initialData.broker || "",
        country: initialData.country || "",
        founded: initialData.founded || "",
        description: initialData.description || "",
        restrictedCountries: initialData.restrictedCountries || "",
        platforms: initialData.platforms || [],
        assets: initialData.assets || [],
        supportEmail: initialData.supportEmail || "",
        termsUrl: initialData.termsUrl || "",
        refundPolicy: initialData.refundPolicy || "",
      });

      if (initialData.logo?.url) {
        setLogoPreview(`${process.env.NEXT_PUBLIC_API_URL || ""}${initialData.logo.url}`);
      }
      if (initialData.coverImage?.url) {
        setCoverPreview(`${process.env.NEXT_PUBLIC_API_URL || ""}${initialData.coverImage.url}`);
      }

      if (initialData.challenges && initialData.challenges.length > 0) {
        setChallenges(initialData.challenges.map(c => ({
          ...c,
          type: Array.isArray(c.type) ? c.type : [],
          priceAfterDiscount: c.priceAfterDiscount || "",
        })));
      } else {
        setChallenges([{}]);
      }
    }
  }, [initialData]);

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData(prev => ({ ...prev, [field]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      if (field === "logo") setLogoPreview(reader.result);
      if (field === "coverImage") setCoverPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addChallenge = () => setChallenges(prev => [...prev, {}]);
  const removeChallenge = (idx) => setChallenges(prev => prev.filter((_, i) => i !== idx));

  const updateChallenge = (idx, field, value) => {
    setChallenges(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };

      if (field === "price" || field === "discountPercent") {
        const price = Number(updated[idx].price) || 0;
        const pct = Number(updated[idx].discountPercent) || 0;
        updated[idx].priceAfterDiscount = (price * (1 - pct / 100)).toFixed(2);
      }
      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const data = new FormData();
    const payload = { ...formData, challenges };

    Object.keys(payload).forEach(key => {
      if (key === "challenges") {
        data.append("challenges", JSON.stringify(payload[key]));
      } else if (payload[key] instanceof File) {
        data.append(key, payload[key]);
      } else if (Array.isArray(payload[key])) {
        payload[key].forEach((item, i) => data.append(`${key}[${i}]`, item));
      } else if (payload[key] !== null && payload[key] !== undefined) {
        data.append(key, payload[key]);
      }
    });

    try {
      if (isEditMode) {
        await updateFirm(initialData._id, data, getAccessTokenSilently);
        alert("Firm updated successfully!");
      } else {
        await createFirm(data, getAccessTokenSilently);
        alert("Firm created successfully!");
      }
      onSuccess?.();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Unknown error";
      setError(msg);
      alert("Error: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h1 className="text-5xl font-bold text-white mb-4">
              {isEditMode ? "Edit Firm" : "PropFirmFlow"}
            </h1>
            <p className="text-xl text-gray-400">
              {isEditMode ? "Update firm & challenge details" : "Firm & Challenge Submission Portal"}
            </p>
            <div className="mt-4 h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
          </div>
        
        </div>

        <div className=" p-8 sm:p-12  space-y-10">

          {/* Firm Profile */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-500/10 rounded-lg"><Building2 className="text-blue-400" size={24} /></div>
              <h2 className="text-2xl font-bold text-white">Firm Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Firm Name" required name="firmName" value={formData.firmName} onChange={e => setFormData(prev => ({ ...prev, firmName: e.target.value }))} />
              <Input label="Tagline" name="tagline" value={formData.tagline} onChange={e => setFormData(prev => ({ ...prev, tagline: e.target.value }))} />

              <FileInput label="Logo (PNG/SVG/JPG)" required accept=".png,.svg,.jpg,.jpeg"
                onChange={(e) => handleFileChange(e, "logo")} preview={logoPreview} />

              <FileInput label="Cover Image" accept=".png,.jpg,.jpeg,.svg"
                onChange={(e) => handleFileChange(e, "coverImage")} preview={coverPreview} />

              <Input label="Website / Domain" required type="url" name="website" value={formData.website} onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))} />
              <Input label="CEO Name" name="ceoName" value={formData.ceoName} onChange={e => setFormData(prev => ({ ...prev, ceoName: e.target.value }))} />
              <Input label="Broker" name="broker" value={formData.broker} onChange={e => setFormData(prev => ({ ...prev, broker: e.target.value }))} />
              <Input label="Country / Headquarters" name="country" value={formData.country} onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))} />
              <Input label="Founded Year" type="number" name="founded" value={formData.founded} onChange={e => setFormData(prev => ({ ...prev, founded: e.target.value }))} />

              <Textarea label="Description" className="md:col-span-2" rows={4} name="description" value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))} />
              <Textarea label="Restricted Countries" className="md:col-span-2" rows={2} name="restrictedCountries" value={formData.restrictedCountries} onChange={e => setFormData(prev => ({ ...prev, restrictedCountries: e.target.value }))} />
            </div>
          </section>

          {/* Platforms & Assets */}
          <section className="grid md:grid-cols-2 gap-10">
            <MultiSelect
              label="Trading Platforms"
              options={["MT5", "TradeLocker", "DXTrader", "matchTrader", "cTrader", "TradingView"]}
              value={formData.platforms}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                setFormData(prev => ({ ...prev, platforms: selected }));
              }}
            />
            <MultiSelect
              label="Supported Assets"
              options={["Forex", "Stocks / Equities", "Indices", "Commodities (Gold, Oil)", "Crypto", "Futures", "Options"]}
              value={formData.assets}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                setFormData(prev => ({ ...prev, assets: selected }));
              }}
            />
          </section>

          {/* Contact & Links */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-500/10 rounded-lg"><FileText className="text-orange-400" size={24} /></div>
              <h2 className="text-2xl font-bold text-white">Contact & Links</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Support Email" type="email" name="supportEmail" value={formData.supportEmail} onChange={e => setFormData(prev => ({ ...prev, supportEmail: e.target.value }))} />
              <Input label="Terms & Conditions URL" type="url" name="termsUrl" value={formData.termsUrl} onChange={e => setFormData(prev => ({ ...prev, termsUrl: e.target.value }))} />
              <Input label="Refund Policy URL" className="md:col-span-2" type="url" name="refundPolicy" value={formData.refundPolicy} onChange={e => setFormData(prev => ({ ...prev, refundPolicy: e.target.value }))} />
            </div>
          </section>

          {/* Challenges */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-lg"><TrendingUp className="text-cyan-400" size={24} /></div>
              <h2 className="text-2xl font-bold text-white">Challenge Details</h2>
            </div>

            {challenges.map((challenge, idx) => (
              <ChallengeCard
                key={idx}
                challenge={challenge}
                idx={idx}
                onUpdate={updateChallenge}
                onRemove={removeChallenge}
                isRemovable={challenges.length > 1}
              />
            ))}

            <button onClick={addChallenge} className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-500/10 border-2 border-dashed border-cyan-500/50 rounded-xl text-cyan-400 hover:bg-cyan-500/20 font-semibold transition group">
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              Add Another Challenge
            </button>
          </section>

          {/* Submit */}
          <div className="pt-8 border-t border-gray-700">
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            <button onClick={handleSubmit} disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transform hover:scale-[1.02] transition shadow-lg">
              {loading ? "Saving..." : isEditMode ? "Update Firm & Challenges" : "Submit Firm & Challenges"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}