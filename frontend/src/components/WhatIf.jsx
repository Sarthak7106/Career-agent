import { getRecommendations } from '../lib/careerEngine'

const BOOSTS = [
  { key: 'Logical_Mathematical', label: 'Improve Logical', icon: '🧠', desc: 'Increases logical-mathematical score by +3' },
  { key: 'Interpersonal', label: 'Improve Interpersonal', icon: '🤝', desc: 'Increases interpersonal score by +3' },
  { key: 'Linguistic', label: 'Improve Linguistic', icon: '📝', desc: 'Increases linguistic score by +3' },
]

export default function WhatIf({ profile, whatIfBoost, setWhatIfBoost, onNavigate }) {
  const base = getRecommendations(profile)

  const boostedProfile = whatIfBoost
    ? {
        ...profile,
        traits: {
          ...profile.traits,
          [whatIfBoost]: Math.min(10, profile.traits[whatIfBoost] + 3),
        },
      }
    : null

  const boosted = boostedProfile ? getRecommendations(boostedProfile) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold text-white">What-If Simulation</h2>
          <p className="text-slate-400 text-sm mt-0.5">Simulate skill improvements and see how your recommendation changes</p>
        </div>
      </div>

      {/* Boost Buttons */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <h3 className="text-base font-semibold text-white mb-4">Simulate a Skill Improvement</h3>
        <p className="text-sm text-slate-400 mb-5">Select one trait to boost by +3 points and see the updated recommendation.</p>
        <div className="flex flex-wrap gap-3">
          {BOOSTS.map((b) => (
            <button
              key={b.key}
              onClick={() => setWhatIfBoost(whatIfBoost === b.key ? null : b.key)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium ${
                whatIfBoost === b.key
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-indigo-600 hover:text-white'
              }`}
            >
              <span>{b.icon}</span>
              {b.label}
            </button>
          ))}
          {whatIfBoost && (
            <button
              onClick={() => setWhatIfBoost(null)}
              className="px-4 py-3 rounded-lg border border-slate-600 bg-slate-800 text-slate-400 text-sm hover:text-red-400 hover:border-red-800"
            >
              ✕ Reset
            </button>
          )}
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Current */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">Current Profile</p>
          <h3 className="text-xl font-bold text-white mb-1">{base.top.title}</h3>
          <p className="text-sm text-slate-400 mb-3">{base.top.domain}</p>
          <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
            base.confidence === 'High'
              ? 'text-emerald-400 bg-emerald-900/30 border-emerald-700'
              : base.confidence === 'Moderate'
              ? 'text-amber-400 bg-amber-900/30 border-amber-700'
              : 'text-red-400 bg-red-900/30 border-red-700'
          }`}>
            {base.confidence} Confidence
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-500 mb-2">Top trait scores</p>
            {Object.entries(profile.traits).sort(([,a],[,b]) => b-a).slice(0,3).map(([t,v]) => (
              <div key={t} className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{t.replace('_', ' ')}</span>
                <span>{v}/10</span>
              </div>
            ))}
          </div>
        </div>

        {/* What-If Result */}
        <div className={`rounded-xl p-6 border ${whatIfBoost ? 'bg-indigo-950/30 border-indigo-700' : 'bg-slate-900 border-slate-700 opacity-50'}`}>
          <p className="text-xs text-indigo-400 uppercase tracking-wider font-semibold mb-3">
            {whatIfBoost ? `After Boosting ${whatIfBoost.replace('_', ' ')} +3` : 'Select a boost to simulate'}
          </p>
          {boosted ? (
            <>
              <h3 className={`text-xl font-bold mb-1 ${boosted.top.title !== base.top.title ? 'text-amber-300' : 'text-white'}`}>
                {boosted.top.title}
                {boosted.top.title !== base.top.title && <span className="ml-2 text-xs text-amber-400 font-normal">Changed!</span>}
              </h3>
              <p className="text-sm text-slate-400 mb-3">{boosted.top.domain}</p>
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                boosted.confidence === 'High'
                  ? 'text-emerald-400 bg-emerald-900/30 border-emerald-700'
                  : boosted.confidence === 'Moderate'
                  ? 'text-amber-400 bg-amber-900/30 border-amber-700'
                  : 'text-red-400 bg-red-900/30 border-red-700'
              }`}>
                {boosted.confidence} Confidence
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 mb-2">Updated trait scores</p>
                {Object.entries(boostedProfile.traits).sort(([,a],[,b]) => b-a).slice(0,3).map(([t,v]) => (
                  <div key={t} className="flex justify-between text-xs mb-1">
                    <span className={t === whatIfBoost ? 'text-indigo-300 font-semibold' : 'text-slate-400'}>{t.replace('_', ' ')}</span>
                    <span className={t === whatIfBoost ? 'text-indigo-300 font-semibold' : 'text-slate-400'}>{v}/10{t === whatIfBoost && ' ↑'}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('recommendation')}
                className="mt-4 w-full text-sm text-indigo-400 border border-indigo-700 rounded-lg py-2 hover:bg-indigo-900/30"
              >
                View Full Updated Recommendation →
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center h-32 text-slate-600 text-sm">
              Click a boost button on the left
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
