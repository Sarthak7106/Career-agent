import { useState } from 'react'
import { getRecommendations } from '../lib/careerEngine'
import { CAREER_DETAILS } from '../lib/careerDetails'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { AlertTriangle, BookOpen, Clock, HeartHandshake, TrendingUp, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react'

const confidenceColors = {
  High: { text: 'text-emerald-400', bg: 'bg-emerald-900/30', border: 'border-emerald-700', hex: '#34d399' },
  Moderate: { text: 'text-amber-400', bg: 'bg-amber-900/30', border: 'border-amber-700', hex: '#fbbf24' },
  Low: { text: 'text-red-400', bg: 'bg-red-900/30', border: 'border-red-700', hex: '#f87171' },
}

const confidenceIcons = {
  High: '✅',
  Moderate: '⚠️',
  Low: '🔴',
}

export default function Recommendations({ profile }) {
  const { top, alternatives, confidence, confidenceMsg } = getRecommendations(profile)
  const details = CAREER_DETAILS[top.id] || {}
  const [activeTab, setActiveTab] = useState('overview')

  const scoreMap = { High: 90, Moderate: 60, Low: 30 }
  const scoreValue = scoreMap[confidence] || 50
  const pieData = [
    { name: 'Score', value: scoreValue },
    { name: 'Remaining', value: 100 - scoreValue }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Career Recommendations</h2>
          <p className="text-slate-400 text-sm mt-0.5">Powered by your psychometric profile and our deeper knowledge base</p>
        </div>
      </div>

      {/* Top Career (Glassmorphism + PieChart) */}
      <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 shadow-2xl shadow-indigo-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 px-3 py-1 rounded-full uppercase tracking-wider shadow-inner">
              <Sparkles size={14} /> Top Match
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-4xl font-extrabold text-white mb-2 tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">{top.title}</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs font-medium bg-slate-800/80 text-slate-300 px-3 py-1 rounded-lg border border-slate-700/50 backdrop-blur-sm shadow-sm">
                  🗂 {top.domain}
                </span>
                <span className="text-xs font-medium bg-slate-800/80 text-slate-300 px-3 py-1 rounded-lg border border-slate-700/50 backdrop-blur-sm shadow-sm">
                  🔗 {top.cluster}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed border-l-2 border-indigo-500/50 pl-3 italic">
                "{confidenceMsg}"
              </p>
            </div>

            {/* Confidence Pie Chart */}
            <div className={`flex flex-col items-center justify-center bg-slate-950/50 border backdrop-blur-md rounded-2xl px-6 py-4 w-full md:w-auto ${confidenceColors[confidence].border}`}>
              <div className="relative w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={40}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill={confidenceColors[confidence].hex} />
                      <Cell fill="#1e293b" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-xl font-bold ${confidenceColors[confidence].text}`}>{scoreValue}%</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-lg leading-none">{confidenceIcons[confidence]}</span>
                <span className={`text-sm font-bold ${confidenceColors[confidence].text}`}>{confidence} Match</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">Why are you suited?</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {top.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                  <span className="text-indigo-400 mt-0.5">•</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs for Career Details */}
      {details.day_in_life && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mt-8 shadow-xl">
          <div className="flex overflow-x-auto border-b border-slate-800 scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview & DNA', icon: <HeartHandshake size={16} /> },
              { id: 'dayInLife', label: 'Day in the Life', icon: <Clock size={16} /> },
              { id: 'reality', label: 'Market & Reality', icon: <TrendingUp size={16} /> },
              { id: 'resources', label: 'Resources & Limits', icon: <BookOpen size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                  ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                      <Sparkles size={18} className="text-indigo-400" /> Career DNA Structure
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(details.career_dna || {}).map(([key, val]) => (
                        <div key={key}>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span className="capitalize">{key}</span>
                            <span className="text-slate-300">{val}/10</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${val * 10}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                      Related Careers
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {details.related_careers?.map((c, i) => (
                        <span key={i} className="text-sm bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg hover:border-indigo-500/50 hover:text-indigo-300 cursor-pointer transition-colors">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dayInLife' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h4 className="font-semibold text-white mb-4">Typical Day in the Life</h4>
                <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                  {details.day_in_life?.map((task, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-900 text-slate-400 group-hover:text-amber-400 group-hover:border-amber-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                        {i + 1}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/50 border border-slate-700 hover:border-amber-500/50 p-4 rounded-xl shadow transition-all duration-300">
                        <p className="text-sm text-slate-300">{task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reality' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Average Salary</p>
                    <p className="text-lg font-semibold text-emerald-400">{details.market_data?.avg_salary}</p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Market Demand</p>
                    <p className="text-lg font-semibold text-amber-400">{details.market_data?.demand}</p>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Growth Rate</p>
                    <p className="text-lg font-semibold text-indigo-400">{details.market_data?.growth_rate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-6">
                  <div>
                    <p className="text-xs text-slate-500 font-medium tracking-wide">COMPETITION</p>
                    <p className="text-base text-slate-200 mt-1 font-medium">{details.reality_check?.competition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium tracking-wide">WORK PRESSURE</p>
                    <p className="text-base text-slate-200 mt-1 font-medium">{details.reality_check?.work_pressure}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium tracking-wide">LEARNING CURVE</p>
                    <p className="text-base text-slate-200 mt-1 font-medium">{details.reality_check?.learning_curve}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                    <BookOpen size={18} className="text-indigo-400" /> Learning Resources
                  </h4>
                  <ul className="space-y-2">
                    {details.resources?.map((r, i) => (
                      <li key={i} className="bg-slate-800/50 border border-slate-700/50 p-3 rounded-lg text-sm text-indigo-300 hover:text-indigo-200 hover:border-indigo-500/50 transition-colors flex items-center gap-2 cursor-pointer">
                        <span className="bg-indigo-500/20 p-1.5 rounded-md"><BookOpen size={14} /></span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                    <AlertTriangle size={18} className="text-red-400" /> Not For You If...
                  </h4>
                  <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-4">
                    <ul className="space-y-2.5">
                      {details.not_for_you_if?.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-300">
                          <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500/70" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Alternative Careers */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Top 3 Alternatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternatives.map((career, i) => (
            <div key={career.id} className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-5 transition-colors group cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-slate-500 font-bold bg-slate-800 px-2 py-0.5 rounded">#{i + 2}</span>
                <h4 className="font-semibold text-slate-200 group-hover:text-white text-base transition-colors">{career.title}</h4>
              </div>
              <p className="text-xs text-slate-400 mb-3">{career.domain}</p>
              <div className="mt-3 pt-3 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {career.skills.slice(0, 3).map((s) => (
                    <span key={s} className="text-[11px] bg-slate-950 text-slate-300 px-2 py-1 rounded-md border border-slate-800">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
