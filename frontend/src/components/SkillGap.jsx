import { getRecommendations, getSkillGap } from '../lib/careerEngine'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Target, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export default function SkillGap({ profile }) {
  const { top } = getRecommendations(profile)
  const { matched, missing, readiness } = getSkillGap(profile, top)

  const isStrong = readiness >= 70
  const isModerate = readiness >= 40
  const rsColor = isStrong ? 'text-emerald-400' : isModerate ? 'text-amber-400' : 'text-red-400'
  const rsBg = isStrong ? 'bg-emerald-500' : isModerate ? 'bg-amber-500' : 'bg-red-500'
  const readinessLabel = isStrong ? 'Strong Readiness' : isModerate ? 'Moderate Readiness' : 'Needs Development'

  const chartData = [
    { name: 'Matched', count: matched.length, fill: '#10b981' }, // emerald-500
    { name: 'Missing', count: missing.length, fill: '#ef4444' }  // red-500
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Readiness & Skill Gap</h2>
          <p className="text-slate-400 text-sm mt-0.5">Evaluating your skills for: <span className="text-indigo-400 font-semibold">{top.title}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Readiness & Chart */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target size={100} />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Overall Match</h3>
              <div className="flex items-end gap-2 mb-4">
                <span className={`text-6xl font-black tracking-tighter ${rsColor}`}>{readiness}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
                <div className={`h-2 rounded-full ${rsBg} transition-all duration-1000 ease-out`} style={{ width: `${readiness}%` }}></div>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className={rsColor} />
                <p className={`text-sm font-semibold ${rsColor}`}>{readinessLabel}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Skill Distribution</h3>
            <div className="h-48 w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} />
                  <Tooltip
                    cursor={{ fill: '#1e293b' }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Skill Lists */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Matched Skills */}
            <div className="bg-slate-900 border border-emerald-900/50 rounded-2xl p-6 shadow-xl flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Acquired Skills</h3>
                  <p className="text-xs text-emerald-400/80 font-medium">{matched.length} Skills Matched</p>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {matched.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-500 text-sm italic border-2 border-dashed border-slate-800 rounded-xl p-4">
                    No matching skills found. Time to upskill!
                  </div>
                ) : (
                  matched.map((s) => (
                    <div key={s} className="flex items-center gap-3 bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3 transition-colors hover:bg-emerald-950/40">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      <span className="text-sm font-medium text-emerald-200">{s}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-slate-900 border border-red-900/50 rounded-2xl p-6 shadow-xl flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
                  <XCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Skill Gaps</h3>
                  <p className="text-xs text-red-400/80 font-medium">{missing.length} Skills to Learn</p>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {missing.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-emerald-500 text-sm italic border-2 border-dashed border-emerald-900 rounded-xl p-4">
                    Perfect match! You have all required skills.
                  </div>
                ) : (
                  missing.map((s) => (
                    <div key={s} className="flex items-center gap-3 bg-red-950/20 border border-red-900/40 rounded-xl p-3 transition-colors hover:bg-red-950/40">
                      <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                      <span className="text-sm font-medium text-red-200">{s}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
