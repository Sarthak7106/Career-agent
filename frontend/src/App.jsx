import { useState } from 'react'
import ProfileBuilder from './components/ProfileBuilder'
import Recommendations from './components/Recommendations'
import SkillGap from './components/SkillGap'
import Explainability from './components/Explainability'
import Roadmap from './components/Roadmap'
import WhatIf from './components/WhatIf'
import Counselor from './components/Counselor'

const NAV_STEPS = [
  { id: 'profile', label: 'Profile' },
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'skillgap', label: 'Skill Gap' },
  { id: 'explainability', label: 'Why This?' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'whatif', label: 'What-If' },
  { id: 'counselor', label: 'Counselor' },
]

const initialProfile = {
  traits: {
    Linguistic: 5,
    Logical_Mathematical: 5,
    Spatial_Visualization: 5,
    Interpersonal: 5,
    Intrapersonal: 5,
    Musical: 5,
    Bodily: 5,
    Naturalist: 5,
  },
  preferences: { P1: 1, P2: 1, P3: 1, P4: 1, P5: 1, P6: 1, P7: 1, P8: 1 },
  skills: [],
}

export default function App({ onGoHome }) {
  const [active, setActive] = useState('profile')
  const [profile, setProfile] = useState(initialProfile)
  const [submitted, setSubmitted] = useState(false)
  const [whatIfBoost, setWhatIfBoost] = useState(null)

  const effectiveProfile = whatIfBoost
    ? {
        ...profile,
        traits: {
          ...profile.traits,
          [whatIfBoost]: Math.min(10, profile.traits[whatIfBoost] + 3),
        },
      }
    : profile

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">AI</div>
          <h1 className="text-xl font-bold text-white tracking-tight">AI Career Mentor Dashboard</h1>
          <div className="ml-auto flex items-center gap-3">
            {onGoHome && (
              <button
                onClick={onGoHome}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                ← Home
              </button>
            )}
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">Agentic Pipeline</span>
          </div>
        </div>
      </header>

      {/* Pipeline Nav */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-0">
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          {NAV_STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => setActive(step.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                active === step.id
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                active === step.id ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'
              }`}>{i + 1}</span>
              {step.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {active === 'profile' && (
          <ProfileBuilder
            profile={profile}
            setProfile={setProfile}
            onSubmit={() => { setSubmitted(true); setActive('recommendation') }}
          />
        )}
        {active === 'recommendation' && <Recommendations profile={effectiveProfile} />}
        {active === 'skillgap' && <SkillGap profile={effectiveProfile} />}
        {active === 'explainability' && <Explainability profile={effectiveProfile} />}
        {active === 'roadmap' && <Roadmap profile={effectiveProfile} />}
        {active === 'whatif' && (
          <WhatIf
            profile={profile}
            whatIfBoost={whatIfBoost}
            setWhatIfBoost={setWhatIfBoost}
            onNavigate={setActive}
          />
        )}
        {active === 'counselor' && <Counselor profile={effectiveProfile} />}
      </main>
    </div>
  )
}
