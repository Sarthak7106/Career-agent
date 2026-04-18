import { getRecommendations } from '../lib/careerEngine'
import { BookOpen, Milestone, Trophy, ArrowRight, Lightbulb } from 'lucide-react'

const LEVEL_CONFIG = {
  beginner: {
    border: 'border-emerald-500/50',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    badgeText: 'text-emerald-950',
    badgeBg: 'bg-emerald-400',
    icon: <BookOpen size={18} />
  },
  intermediate: {
    border: 'border-amber-500/50',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    badgeText: 'text-amber-950',
    badgeBg: 'bg-amber-400',
    icon: <Milestone size={18} />
  },
  advanced: {
    border: 'border-indigo-500/50',
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    badgeText: 'text-white',
    badgeBg: 'bg-indigo-500',
    icon: <Trophy size={18} />
  },
}

function RoadmapTimeline({ level, steps, isLast }) {
  const config = LEVEL_CONFIG[level]
  return (
    <div className="relative flex gap-6 pb-12 group last:pb-0">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute top-10 left-6 -ml-px h-full w-0.5 bg-slate-800 group-hover:bg-slate-700 transition-colors"></div>
      )}

      {/* Icon Node */}
      <div className={`relative z-10 w-12 h-12 flex-shrink-0 rounded-full border-4 border-slate-950 flex items-center justify-center ${config.badgeBg} ${config.badgeText} shadow-lg shadow-black/50`}>
        {config.icon}
      </div>

      {/* Content Card */}
      <div className={`flex-1 bg-slate-900/60 backdrop-blur-md border rounded-2xl p-6 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 ${config.border}`}>
        <div className="flex items-center justify-between mb-5">
          <h3 className={`text-xl font-bold uppercase tracking-wider ${config.text}`}>
            {level} Phase
          </h3>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.bg} ${config.text}`}>
            {steps.length} Milestones
          </span>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${config.bg} ${config.text}`}>
                {i + 1}
              </div>
              <p className="text-slate-300 leading-relaxed pt-0.5 group-hover:text-slate-200 transition-colors">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Roadmap({ profile }) {
  const { top } = getRecommendations(profile)
  const { roadmap } = top

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Career Roadmap</h2>
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
            Your proven progression path to become a <strong className="text-indigo-400 font-semibold">{top.title}</strong>
          </p>
        </div>
      </div>

      {/* Pro Tip Alert */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-700/50 rounded-xl p-5 flex gap-4 items-start shadow-inner">
        <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400 flex-shrink-0 mt-0.5">
          <Lightbulb size={20} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-1">AI Strategic Advice</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            Don't rush the process. Solidifying your skills in the <strong className="text-emerald-400">Beginner</strong> phase acts as a massive multiplier for your learning velocity in the subsequent stages.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="pl-2 pt-4">
        <RoadmapTimeline level="beginner" steps={roadmap.beginner} isLast={false} />
        <RoadmapTimeline level="intermediate" steps={roadmap.intermediate} isLast={false} />
        <RoadmapTimeline level="advanced" steps={roadmap.advanced} isLast={true} />
      </div>
    </div>
  )
}
