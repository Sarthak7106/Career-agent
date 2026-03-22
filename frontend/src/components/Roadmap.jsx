import { getRecommendations } from '../lib/careerEngine'

const LEVEL_COLORS = {
  beginner: { border: 'border-emerald-700', bg: 'bg-emerald-950/30', badge: 'bg-emerald-900/50 text-emerald-300', icon: '🟢', dot: 'bg-emerald-500' },
  intermediate: { border: 'border-amber-700', bg: 'bg-amber-950/20', badge: 'bg-amber-900/50 text-amber-300', icon: '🟡', dot: 'bg-amber-500' },
  advanced: { border: 'border-indigo-700', bg: 'bg-indigo-950/30', badge: 'bg-indigo-900/50 text-indigo-300', icon: '🔵', dot: 'bg-indigo-500' },
}

function RoadmapCard({ level, steps }) {
  const colors = LEVEL_COLORS[level]
  return (
    <div className={`border rounded-xl p-6 ${colors.border} ${colors.bg}`}>
      <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5 ${colors.badge}`}>
        <span>{colors.icon}</span>
        {level}
      </div>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${colors.dot}`}></div>
              {i < steps.length - 1 && <div className="w-0.5 h-6 bg-slate-700 mt-1"></div>}
            </div>
            <p className="text-sm text-slate-300 leading-snug">{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Roadmap({ profile }) {
  const { top } = getRecommendations(profile)
  const { roadmap } = top

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold text-white">Career Roadmap</h2>
          <p className="text-slate-400 text-sm mt-0.5">Your step-by-step path to becoming a <span className="text-indigo-400 font-medium">{top.title}</span></p>
        </div>
      </div>

      {/* Level indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="text-emerald-400">🟢 Beginner</span>
        <span className="mx-2">→</span>
        <span className="text-amber-400">🟡 Intermediate</span>
        <span className="mx-2">→</span>
        <span className="text-indigo-400">🔵 Advanced</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <RoadmapCard level="beginner" steps={roadmap.beginner} />
        <RoadmapCard level="intermediate" steps={roadmap.intermediate} />
        <RoadmapCard level="advanced" steps={roadmap.advanced} />
      </div>

      {/* Pro Tip */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 flex gap-3">
        <span className="text-indigo-400 text-lg flex-shrink-0">💡</span>
        <div>
          <p className="text-sm font-semibold text-white mb-0.5">AI Roadmap Tip</p>
          <p className="text-sm text-slate-400">
            Focus on completing the Beginner stage before moving on. Each completed step improves your readiness score and narrows the skill gap for <span className="text-indigo-400">{top.title}</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
