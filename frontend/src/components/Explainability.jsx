import { getRecommendations } from '../lib/careerEngine'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { BrainCircuit, Star, Compass } from 'lucide-react'

export default function Explainability({ profile }) {
  const { top } = getRecommendations(profile)

  // Find dominant traits
  const sortedTraits = Object.entries(profile.traits).sort(([, a], [, b]) => b - a)
  const topTraits = sortedTraits.slice(0, 3)

  const traitLabels = {
    Linguistic: 'Linguistic',
    Logical_Mathematical: 'Logical/Math',
    Spatial_Visualization: 'Spatial',
    Interpersonal: 'Interpersonal',
    Intrapersonal: 'Intrapersonal',
    Musical: 'Musical',
    Bodily: 'Bodily/Kinesthetic',
    Naturalist: 'Naturalist',
  }

  // Format data for RadarChart
  const radarData = Object.entries(profile.traits).map(([key, value]) => ({
    subject: traitLabels[key],
    score: value,
    fullMark: 10,
  }))

  const whySuited = `Your profile shows strong ${topTraits.map(([t]) => traitLabels[t].toLowerCase()).join(', ')}. 
    The ${top.title} career path heavily rewards these traits, making it an excellent match for your cognitive style and strengths. 
    The career aligns particularly well with your ${traitLabels[topTraits[0][0]]} (score: ${topTraits[0][1]}/10).`

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"></div>
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Why This Career?</h2>
          <p className="text-slate-400 text-sm mt-0.5">AI-generated deterministic explanation for your top match</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Context & Summary */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Career title */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Compass size={14} /> Recommended Role
            </p>
            <h3 className="text-2xl font-bold text-white">{top.title}</h3>
            <span className="inline-block mt-3 px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded-lg border border-indigo-500/30">
              {top.domain}
            </span>
          </div>

          {/* Key Strengths */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Star size={18} />
              </div>
              <h3 className="text-base font-semibold text-white">Highlighted Strengths</h3>
            </div>
            <div className="space-y-3">
              {top.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 transition-colors hover:border-amber-500/40">
                  <span className="text-amber-400 mt-0.5">✦</span>
                  <span className="text-sm text-slate-300 leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Radar Chart & AI Summary */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden h-[400px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BrainCircuit size={18} />
              </div>
              <h3 className="text-base font-semibold text-white">Trait Radar Signature</h3>
            </div>

            <div className="w-full h-[320px] relative z-10 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius={100} data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} max={10} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                  />
                  <Radar name="Your Score" dataKey="score" stroke="#6366f1" strokeWidth={2} fill="#6366f1" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🤖</span>
              <div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider text-indigo-400">AI Explanation</h3>
                <blockquote className="text-slate-300 text-sm leading-relaxed italic">
                  "{whySuited}"
                </blockquote>
                <p className="text-xs text-slate-500 mt-4">Generated by the Agentic Career Reasoning Engine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
