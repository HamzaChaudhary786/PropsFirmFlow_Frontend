// app/view/[id]/page.jsx
import { notFound } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE } from '../../../constants/json/dashboard/apiUrl';

const api = axios.create({
  baseURL: `${API_BASE}`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

async function fetchFirmWithChallenges(id) {
  try {
    const res = await api.get(`/firm/challenge/${id}`);
    return res.data;
  } catch (error) {
    console.error('Fetch error:', error.response?.data || error.message);
    return null;
  }
}

export default async function FirmDetailPage({ params }) {
  const { id } = await params;

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) notFound();

  const result = await fetchFirmWithChallenges(id);
  if (!result || !result.success || !result.data) notFound();

  const { firm, challenge: challenges } = result.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Sticky Navigation */}
      {/* <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/firms"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-all font-medium group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Firms
            </Link>
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>
          </div>
        </div>
      </nav> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/50 via-gray-900/90 to-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          
          <div className="relative px-8 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10">
              {/* Logo */}
              <div className="relative -mt-24 lg:-mt-28 z-10">
                <div className="w-44 h-44 lg:w-56 lg:h-56 rounded-3xl overflow-hidden ring-8 ring-black/60 shadow-2xl bg-gradient-to-br from-gray-800 to-black border border-white/20">
                  {firm.logo?.url ? (
                    <Image
                      src={firm.logo.url}
                      alt={`${firm.firmName} logo`}
                      width={224}
                      height={224}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white text-7xl font-black">
                      {firm.firmName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Firm Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-5xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                    {firm.firmName}
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-300 mt-3 font-light">
                    {firm.tagline || 'Empowering Traders Worldwide'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm lg:text-base">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="font-bold text-white">4.9</span>
                    <span className="text-gray-400">(2.1k reviews)</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300">Founded {firm.founded}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300">{firm.country}</span>
                </div>
              </div>

              {/* Visit Website Button */}
              <Link
                href={firm.website || '#'}
                target="_blank"
                className="px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3"
              >
                Visit Official Website
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About {firm.firmName}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {firm.description || 'A globally recognized proprietary trading firm offering funded accounts to skilled traders with competitive profit splits and flexible rules.'}
              </p>
            </div>

            {/* Platforms & Assets */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Trading Platforms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {firm.platforms?.length > 0 ? (
                    firm.platforms.map((p, i) => (
                      <span key={i} className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-cyan-300 font-medium">
                        {p}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">Not specified</span>
                  )}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  Tradable Assets
                </h3>
                <div className="flex flex-wrap gap-3">
                  {firm.assets?.length > 0 ? (
                    firm.assets.map((a, i) => (
                      <span key={i} className="px-4 py-2 bg-green-500/20 border border-green-400/40 rounded-xl text-green-300 font-medium">
                        {a}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">Not specified</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {firm.ceoName && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">CEO / Founder</p>
                <p className="text-2xl font-bold mt-2">{firm.ceoName}</p>
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">Website</p>
                <Link href={firm.website || '#'} target="_blank" className="text-blue-400 hover:text-blue-300 font-medium text-lg">
                  {firm.website?.replace(/^https?:\/\//, '') || 'Not available'}
                </Link>
              </div>
              {firm.supportEmail && (
                <div>
                  <p className="text-sm text-gray-400 uppercase font-bold tracking-wider">Support</p>
                  <a href={`mailto:${firm.supportEmail}`} className="text-blue-400 hover:text-blue-300 font-medium text-lg block">
                    {firm.supportEmail}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Challenges Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 py-8 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border-b border-white/10">
            <h2 className="text-4xl font-extrabold">Available Challenges</h2>
            <p className="text-gray-300 mt-2 text-lg">Choose your funded account challenge</p>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-bold text-gray-400 border-b border-white/10">
                  <th className="px-8 py-6">Account Size</th>
                  <th className="px-8 py-6">Type</th>
                  <th className="px-8 py-6">Profit Target</th>
                  <th className="px-8 py-6">Max Drawdown</th>
                  <th className="px-8 py-6">Profit Split</th>
                  <th className="px-8 py-6">Price</th>
                  <th className="px-8 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {challenges.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-20 text-gray-500 text-lg">
                      No challenges available at the moment
                    </td>
                  </tr>
                ) : (
                  challenges.map((ch, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-all">
                      <td className="px-8 py-7 text-3xl font-extrabold">{ch.accountSize?.toLocaleString()}</td>
                      <td className="px-8 py-7">
                        <div className="flex gap-2 flex-wrap">
                          {ch.type?.map((t) => (
                            <span key={t} className="px-4 py-2 bg-blue-500/20 border border-blue-400/40 rounded-full text-blue-300 text-xs font-bold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-7 font-bold text-lg">{ch.profitTarget || '8–10%'}</td>
                      <td className="px-8 py-7">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${ch.maxDrawdownType === 'Trailing' ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-500/20 text-gray-400'}`}>
                            {ch.maxDrawdownType || 'Static'}
                          </span>
                          <span className="font-medium">{ch.drawdownValue || '10%'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-7 text-green-400 font-bold text-xl">{ch.profitSplit || '80/20'}</td>
                      <td className="px-8 py-7">
                        <div className="text-2xl font-extrabold">${ch.priceAfterDiscount || ch.price}</div>
                        {ch.discountPercent > 0 && (
                          <div className="text-sm text-gray-400 line-through mt-1">${ch.price}</div>
                        )}
                      </td>
                      <td className="px-8 py-7 text-right">
                        <button className="px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-purple-500/50 transition-all duration-300">
                          Buy Now
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden p-6 space-y-6">
            {challenges.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-xl">No challenges available</p>
              </div>
            ) : (
              challenges.map((ch, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-4xl font-extrabold">{ch?.accountSize?.toLocaleString()}</div>
                    {ch.discountPercent > 0 && (
                      <span className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold">
                        -{ch.discountPercent}%
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                      <p className="text-gray-400">Profit Target</p>
                      <p className="font-bold text-lg">{ch.profitTarget || '8–10%'}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Profit Split</p>
                      <p className="font-bold text-green-400 text-lg">{ch.profitSplit || '80/20'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400 mb-2">Max Drawdown</p>
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold ${ch.maxDrawdownType === 'Trailing' ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {ch.maxDrawdownType || 'Static'}
                        </span>
                        <span className="font-medium text-lg">{ch.drawdownValue || '10%'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/10">
                    <div>
                      <div className="text-3xl font-extrabold">${ch.priceAfterDiscount || ch.price}</div>
                      {ch.discountPercent > 0 && <div className="text-gray-400 line-through">${ch.price}</div>}
                    </div>
                    <button className="px-7 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-purple-500/50 transition-all">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}