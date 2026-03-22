import { getRecommendations, getSkillGap } from '../lib/careerEngine'

export default function SkillGap({ profile }) {
  const { top } = getRecommendations(profile)
  const { matched, missing, readiness } = getSkillGap(profile, top)

  const barColor =
    readiness >= 70 ? 'bg-emerald-500' : readiness >= 40 ? 'bg-amber-500' : 'bg-red-500'
  const readinessLabel =
    readiness >= 70 ? 'Strong Readiness' : readiness >= 40 ? 'Moderate Readiness' : 'Needs Development'

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold text-white">Readiness & Skill Gap</h2>
          <p className="text-slate-400 text-sm mt-0.5">For: <span className="text-indigo-400 font-medium">{top.title}</span></p>
        </div>
      </div>

      {/* Readiness Score */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-white">Overall Readiness</h3>
          <span className="text-2xl font-bold text-white">{readiness}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full ${barColor}`}
            style={{ width: `${readiness}%` }}
          ></div>
        </div>
        <p className={`text-sm font-medium mt-1 ${
          readiness >= 70 ? 'text-emerald-400' : readiness >= 40 ? 'text-amber-400' : 'text-red-400'
        }`}>{readinessLabel}</p>
        <p className="text-xs text-slate-500 mt-1">
          Based on {matched.length} of {top.skills.length} required skills matched from your profile
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Skills */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-400 text-lg">❌</span>
            <h3 className="text-base font-semibold text-white">Missing Skills</h3>
            <span className="ml-auto text-xs text-slate-500">{missing.length} gaps</span>
          </div>
          {missing.length === 0 ? (
            <p className="text-sm text-emerald-400">All required skills matched!</p>
          ) : (
            <div className="space-y-2">
              {missing.map((s) => (
                <div key={s} className="flex items-center gap-2 bg-red-950/30 border border-red-900/40 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                  <span className="text-sm text-red-300">{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Matched Skills */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-400 text-lg">✅</span>
            <h3 className="text-base font-semibold text-white">Matched Skills</h3>
            <span className="ml-auto text-xs text-slate-500">{matched.length} matched</span>
          </div>
          {matched.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Add relevant skills in your profile to see matches.</p>
          ) : (
            <div className="space-y-2">
              {matched.map((s) => (
                <div key={s} className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-900/40 rounded-lg px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  <span className="text-sm text-emerald-300">{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Required Skills */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-base font-semibold text-white mb-3">All Required Skills for {top.title}</h3>
        <div className="flex flex-wrap gap-2">
          {top.skills.map((s) => {
            const isMatched = matched.includes(s)
            return (
              <span
                key={s}
                className={`text-sm px-3 py-1 rounded-full border font-medium ${
                  isMatched
                    ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700'
                    : 'bg-red-900/20 text-red-400 border-red-800'
                }`}
              >
                {isMatched ? '✓ ' : '✗ '}{s}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
