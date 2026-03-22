import { getRecommendations } from '../lib/careerEngine'

const confidenceColors = {
  High: 'text-emerald-400 bg-emerald-900/30 border-emerald-700',
  Moderate: 'text-amber-400 bg-amber-900/30 border-amber-700',
  Low: 'text-red-400 bg-red-900/30 border-red-700',
}

const confidenceIcons = {
  High: '✅',
  Moderate: '⚠️',
  Low: '🔴',
}

export default function Recommendations({ profile }) {
  const { top, alternatives, confidence, confidenceMsg } = getRecommendations(profile)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold text-white">AI Career Recommendations</h2>
          <p className="text-slate-400 text-sm mt-0.5">Based on your psychometric profile and preferences</p>
        </div>
      </div>

      {/* Top Career */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-600 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-indigo-400 bg-indigo-900/50 px-2 py-0.5 rounded uppercase tracking-wider">🏆 Top Match</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">{top.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                🗂 {top.domain}
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                🔗 {top.cluster}
              </span>
            </div>
          </div>
          <div className={`flex flex-col items-center justify-center border rounded-xl px-5 py-3 min-w-[130px] ${confidenceColors[confidence]}`}>
            <span className="text-xl mb-1">{confidenceIcons[confidence]}</span>
            <span className="text-sm font-bold">{confidence} Confidence</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-400 border-t border-slate-700/60 pt-3">{confidenceMsg}</p>
      </div>

      {/* Alternative Careers */}
      <div>
        <h3 className="text-base font-semibold text-slate-300 mb-3">Top 3 Alternatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alternatives.map((career, i) => (
            <div key={career.id} className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-slate-500 font-bold">#{i + 2}</span>
                <h4 className="font-semibold text-white text-base">{career.title}</h4>
              </div>
              <p className="text-xs text-slate-400 mb-3">{career.domain}</p>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                {career.cluster}
              </span>
              <div className="mt-3 pt-3 border-t border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Top skills</p>
                <div className="flex flex-wrap gap-1">
                  {career.skills.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded">{s}</span>
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
