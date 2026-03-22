import { useState } from 'react'

const TRAITS = [
  'Linguistic',
  'Logical_Mathematical',
  'Spatial_Visualization',
  'Interpersonal',
  'Intrapersonal',
  'Musical',
  'Bodily',
  'Naturalist',
]

const TRAIT_LABELS = {
  Linguistic: 'Linguistic',
  Logical_Mathematical: 'Logical-Mathematical',
  Spatial_Visualization: 'Spatial Visualization',
  Interpersonal: 'Interpersonal',
  Intrapersonal: 'Intrapersonal',
  Musical: 'Musical',
  Bodily: 'Bodily-Kinesthetic',
  Naturalist: 'Naturalist',
}

const PREFS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8']
const PREF_LABELS = {
  P1: 'Work Style (Solo vs Team)',
  P2: 'Environment (Indoor vs Outdoor)',
  P3: 'Task Type (Creative vs Analytical)',
  P4: 'Pace (Fast-paced vs Steady)',
  P5: 'Learning (Formal vs Self-taught)',
  P6: 'Risk Tolerance',
  P7: 'People Interaction',
  P8: 'Problem Complexity',
}

function TraitSlider({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-indigo-400 font-semibold w-6 text-right">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500 h-1.5 rounded-full"
      />
      <div className="flex justify-between text-xs text-slate-600">
        <span>0</span>
        <span>10</span>
      </div>
    </div>
  )
}

function SkillTag({ skill, onRemove }) {
  return (
    <span className="flex items-center gap-1 bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded text-sm border border-indigo-700">
      {skill}
      <button onClick={onRemove} className="text-indigo-500 hover:text-red-400 ml-1 font-bold">×</button>
    </span>
  )
}

export default function ProfileBuilder({ profile, setProfile, onSubmit }) {
  const [skillInput, setSkillInput] = useState('')

  const setTrait = (key, val) =>
    setProfile((p) => ({ ...p, traits: { ...p.traits, [key]: val } }))

  const setPref = (key, val) =>
    setProfile((p) => ({ ...p, preferences: { ...p.preferences, [key]: val } }))

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !profile.skills.includes(s)) {
      setProfile((p) => ({ ...p, skills: [...p.skills, s] }))
      setSkillInput('')
    }
  }

  const removeSkill = (s) =>
    setProfile((p) => ({ ...p, skills: p.skills.filter((x) => x !== s) }))

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold text-white">Build Your Profile Using Psychometric Assessment</h2>
          <p className="text-slate-400 text-sm mt-0.5">This profile simulates AI-driven psychometric evaluation and behavioral analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Psychometric Traits */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-indigo-400 text-lg">🧠</span>
            <h3 className="text-base font-semibold text-white">Psychometric Traits</h3>
            <span className="ml-auto text-xs text-slate-500">Rate 0–10</span>
          </div>
          <div className="space-y-5">
            {TRAITS.map((t) => (
              <TraitSlider
                key={t}
                label={TRAIT_LABELS[t]}
                value={profile.traits[t]}
                onChange={(v) => setTrait(t, v)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Preference Indicators */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-indigo-400 text-lg">⚙️</span>
              <h3 className="text-base font-semibold text-white">Preference Indicators</h3>
              <span className="ml-auto text-xs text-slate-500">0 = Low · 1 = Neutral · 2 = High</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {PREFS.map((p) => (
                <div key={p} className="flex items-center justify-between gap-4">
                  <label className="text-sm text-slate-300 flex-1">{PREF_LABELS[p]}</label>
                  <select
                    value={profile.preferences[p]}
                    onChange={(e) => setPref(p, Number(e.target.value))}
                    className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded px-2 py-1 w-20 focus:outline-none focus:border-indigo-500"
                  >
                    <option value={0}>0 – Low</option>
                    <option value={1}>1 – Mid</option>
                    <option value={2}>2 – High</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Input */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-indigo-400 text-lg">🛠️</span>
              <h3 className="text-base font-semibold text-white">Your Skills</h3>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Type a skill and press Enter or Add"
                className="flex-1 bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded px-3 py-2 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
              />
              <button
                onClick={addSkill}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-2 rounded font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {profile.skills.length === 0 ? (
                <p className="text-slate-600 text-sm italic">No skills added yet</p>
              ) : (
                profile.skills.map((s) => (
                  <SkillTag key={s} skill={s} onRemove={() => removeSkill(s)} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg"
        >
          Analyze My Profile →
        </button>
      </div>
    </div>
  )
}
