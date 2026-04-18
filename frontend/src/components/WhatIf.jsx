import { useState, useEffect } from 'react'
import { getRecommendations } from '../lib/careerEngine'
import { Sliders, RotateCcw, ArrowRight } from 'lucide-react'

const TRAIT_LABELS = {
  Linguistic: 'Linguistic', Logical_Mathematical: 'Logical/Math', Spatial_Visualization: 'Spatial',
  Interpersonal: 'Interpersonal', Intrapersonal: 'Intrapersonal', Musical: 'Musical', Bodily: 'Bodily/Kinesthetic', Naturalist: 'Naturalist',
}

export default function WhatIf({ profile, onNavigate }) {
  const base = getRecommendations(profile)
  const [simProfile, setSimProfile] = useState(profile)

  // Reset simProfile if original profile changes
  useEffect(() => {
    setSimProfile(profile)
  }, [profile])

  const handleSliderChange = (trait, value) => {
    setSimProfile(prev => ({
      ...prev,
      traits: { ...prev.traits, [trait]: value }
    }))
  }

  const resetSimulation = () => setSimProfile(profile)

  const simulated = getRecommendations(simProfile)
  const hasChanged = simulated.top.id !== base.top.id

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">What-If Sandbox Simulation</h2>
            <p className="text-slate-400 text-sm mt-0.5">Adjust your traits in real-time to see how your career matches evolve</p>
          </div>
        </div>
        <button
          onClick={resetSimulation}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 transition-colors text-sm font-medium"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sliders size={18} />
            </div>
            <h3 className="text-lg font-bold text-white">Trait Adjustments</h3>
          </div>

          <div className="space-y-5">
            {Object.keys(simProfile.traits).map(trait => {
              const originalValue = profile.traits[trait]
              const currentValue = simProfile.traits[trait]
              const diff = currentValue - originalValue

              return (
                <div key={trait} className="group">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 font-medium">{TRAIT_LABELS[trait]}</span>
                    <div className="flex items-center gap-2">
                      {diff !== 0 && (
                        <span className={`text-xs font-bold ${diff > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {diff > 0 ? '+' : ''}{diff}
                        </span>
                      )}
                      <span className={`font-bold px-2 rounded ${diff !== 0 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        {currentValue}/10
                      </span>
                    </div>
                  </div>
                  <input
                    type="range" min={0} max={10} step={1}
                    value={currentValue}
                    onChange={(e) => handleSliderChange(trait, Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${diff !== 0 ? '#6366f1' : '#475569'} 0%, ${diff !== 0 ? '#6366f1' : '#475569'} ${currentValue * 10}%, #1e293b ${currentValue * 10}%, #1e293b 100%)`
                    }}
                  />
                  <style>{`
                    input[type=range]::-webkit-slider-thumb {
                      appearance: none; width: 16px; height: 16px; border-radius: 50%;
                      background: #fff; cursor: pointer; border: 2px solid #6366f1;
                    }
                  `}</style>
                </div>
              )
            })}
          </div>
        </div>

        {/* Results Panel */}
        <div className="flex flex-col gap-6">
          <div className={`bg-gradient-to-br border rounded-2xl p-6 shadow-xl flex-1 transition-all duration-500 relative overflow-hidden ${hasChanged
              ? 'from-indigo-950/80 to-slate-900 border-indigo-500/50 shadow-indigo-900/30'
              : 'from-slate-900 to-slate-900 border-slate-800'
            }`}>

            {hasChanged && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            )}

            <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 relative z-10">
              {hasChanged ? 'New Predicted Result' : 'Current Default Result'}
            </p>

            <div className="relative z-10">
              <h3 className={`text-4xl font-black mb-2 tracking-tight transition-colors duration-500 ${hasChanged ? 'bg-gradient-to-r from-emerald-300 to-indigo-300 bg-clip-text text-transparent' : 'text-white'}`}>
                {simulated.top.title}
              </h3>
              <p className="text-sm font-medium text-slate-400 mb-5">{simulated.top.domain} • {simulated.top.cluster}</p>

              <div className="inline-flex items-center gap-2 mb-6 bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-sm font-bold text-white">Confidence:</span>
                <span className={`text-sm font-bold ${simulated.confidence === 'High' ? 'text-emerald-400' : simulated.confidence === 'Moderate' ? 'text-amber-400' : 'text-red-400'}`}>
                  {simulated.confidence}
                </span>
              </div>

              {hasChanged && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-t border-slate-800/80 pt-5">
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wide mb-3">Shift Breakdown</p>
                  <p className="text-sm text-slate-300 leading-relaxed bg-indigo-950/30 p-4 rounded-xl border border-indigo-900/50">
                    Your adjusted traits have shifted the primary recommendation from <strong>{base.top.title}</strong> to <strong>{simulated.top.title}</strong>. This suggests that leaning heavily into these modified skills will unlock this new trajectory.
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              // Usually we would apply the simulation here, but for this demo sandbox we can just redirect to overview
              onNavigate('recommendation')
            }}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 bg-opacity-80 py-4 rounded-xl font-bold text-white border border-slate-700 transition-colors shadow-lg hover:shadow-xl group"
          >
            Review Core Recommendation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
