// app/admin/page.tsx
export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Admin Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'User Management', desc: 'View, edit, and remove platform users' },
          { title: 'Firm Settings', desc: 'Configure payout rules, limits & fees' },
          { title: 'Analytics', desc: 'Real-time trader performance & PnL' },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-gray-800/50 backdrop-blur p-8 rounded-2xl border border-purple-500/30 hover:border-purple-400 transition-all hover:shadow-2xl hover:shadow-purple-500/10"
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-3">{card.title}</h3>
            <p className="text-gray-300 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}