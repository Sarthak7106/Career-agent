import { useState } from 'react'
import { getRecommendations } from '../lib/careerEngine'
import { CAREER_DETAILS } from '../lib/careerDetails'
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { Sparkles, Target, Activity, Zap, TrendingUp, AlertCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react'

// Gauge Chart component using Recharts Pie
const GaugeChart = ({ score }) => {
  const data = [
    { name: 'score', value: score },
    { name: 'rest', value: 100 - score }
  ]
  return (
    <div className="relative w-full h-40">
      <ResponsiveContainer width="100%" height="200%">
        <PieChart>
          <Pie
            data={data}
            cx="50%" cy="50%"
            startAngle={180} endAngle={0}
            innerRadius="70%" outerRadius="90%"
            dataKey="value" stroke="none"
          >
            <Cell fill="#6366f1" />
            <Cell fill="#1e293b" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 top-6 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-white">{score}%</span>
        <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Match</span>
      </div>
    </div>
  )
}

export default function ResultsDashboard({ profile, whatIfBoost, setWhatIfBoost }) {
  const { top, alternatives, confidence, confidenceMsg } = getRecommendations(profile)
  const details = CAREER_DETAILS[top.id] || {}

  // Mock scores
  const scoreMap = { High: 92, Moderate: 74, Low: 45 }
  const mainScore = scoreMap[confidence] || 50

  const radarData = Object.entries(details.career_dna || {}).map(([key, val]) => ({
    subject: key, A: val, fullMark: 10,
  }))

  const traitData = Object.entries(profile.traits).map(([key, val]) => {
    const conf = profile.traitConfidence ? profile.traitConfidence[key] : 1;
    let label = 'Moderate Confidence';
    if (conf > 0.8) label = 'Strong & Consistent';
    else if (conf <= 0.5) label = 'Low Confidence';
    
    return {
      name: key.replace('_', ' '), 
      value: val,
      confidence: conf,
      confLabel: label
    }
  })

  // Skill Gap Mock logic
  const requiredSkills = top.skills || []
  const userSkills = profile.skills.map(s => s.toLowerCase())
  const matchedSkills = requiredSkills.filter(s => userSkills.includes(s.toLowerCase()))
  const missingSkills = requiredSkills.filter(s => !userSkills.includes(s.toLowerCase()))
  const gapPercentage = requiredSkills.length > 0 ? (missingSkills.length / requiredSkills.length) * 100 : 0

  const pieData = [
    { name: 'Matched', value: matchedSkills.length },
    { name: 'Missing', value: missingSkills.length }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* 1. Hero Card */}
      <div className="relative overflow-hidden bg-[#111115] border border-indigo-500/20 rounded-3xl p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -mt-32 -mr-32"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 relative z-10 w-full justify-between items-center">
          <div className="flex-1">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
               <Sparkles size={14} /> Top Prediction
             </div>
             <h1 className="text-5xl font-black text-white tracking-tight mb-2">{top.title}</h1>
             <p className="text-xl text-slate-400 mb-6">{top.domain} • {top.cluster}</p>
             
             <div className="flex gap-4">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                     <ShieldCheck size={24} />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Confidence</p>
                     <p className="text-xl font-bold text-emerald-400">{confidence}</p>
                   </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex-1 max-w-[300px]">
                   <p className="text-sm text-slate-300 italic">"{confidenceMsg}"</p>
                </div>
             </div>
          </div>
          
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
             <div className="w-[280px] bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
               <GaugeChart score={mainScore} />
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 2. Career DNA (Radar Chart) */}
        <div className="bg-[#111115] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Target size={18} className="text-indigo-400"/> Career DNA</h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                 <PolarGrid stroke="#334155" />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                 <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#475569' }} />
                 <Radar name="Career Requirement" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
               </RadarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* 3. Explainability (Bar Chart) */}
        <div className="bg-[#111115] border border-slate-800 rounded-3xl p-6">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Activity size={18} className="text-emerald-400"/> Trait Mapping</h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={traitData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                 <XAxis type="number" domain={[0, 10]} hide />
                 <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 11 }} width={120} />
                 <Tooltip 
                   cursor={{ fill: '#1e293b' }} 
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} 
                   formatter={(value, name, props) => [
                     `${value}/10 (${props.payload.confLabel})`, 
                     'Score'
                   ]}
                 />
                 <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]}>
                   {traitData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.value > 7 ? '#8b5cf6' : '#6366f1'} fillOpacity={entry.confidence || 1} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 4. Skill Gap */}
        <div className="lg:col-span-4 bg-[#111115] border border-slate-800 rounded-3xl p-6 flex flex-col">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-amber-400"/> Skill Gap</h3>
           <div className="flex-1 flex flex-col items-center justify-center mb-6">
             <div className="h-[120px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={pieData} innerRadius={35} outerRadius={50} paddingAngle={5} dataKey="value"
                   >
                     <Cell fill="#10b981" />
                     <Cell fill="#ef4444" />
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="text-center mt-2">
                <span className="text-3xl font-black text-white">{Math.round(gapPercentage)}%</span>
                <p className="text-xs font-bold text-slate-500 uppercase">Skill Gap</p>
             </div>
           </div>
           
           <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Matched</p>
                <div className="flex flex-wrap gap-1">
                  {matchedSkills.length > 0 ? matchedSkills.map(s => <span key={s} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs">{s}</span>) : <span className="text-xs text-slate-600">None</span>}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Missing</p>
                <div className="flex flex-wrap gap-1">
                  {missingSkills.length > 0 ? missingSkills.map(s => <span key={s} className="px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-xs">{s}</span>) : <span className="text-xs text-slate-600">None</span>}
                </div>
              </div>
           </div>
        </div>

        {/* 5. Career Roadmap (Timeline) */}
        <div className="lg:col-span-8 bg-[#111115] border border-slate-800 rounded-3xl p-6">
           <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><MapPin size={18} className="text-blue-400"/> Career Roadmap</h3>
           <div className="relative border-l-2 border-slate-800 ml-4 space-y-6">
              {['Foundation (0-6 months)', 'Skill Building (6-12 months)', 'Entry Level (1-2 years)', 'Specialization (3+ years)'].map((step, i) => (
                <div key={i} className="relative pl-6 group">
                   <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                   <h4 className="font-bold text-slate-200">{step}</h4>
                   <p className="text-sm text-slate-500 mt-1">Focus on core fundamentals and acquiring the missing skills identified in your gap analysis.</p>
                </div>
              ))}
           </div>
        </div>

      </div>

      {/* 6. What-If Analysis & Insights */}
      <div className="bg-[#111115] border border-slate-800 rounded-3xl p-6">
         <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Zap size={18} className="text-purple-400"/> What-If Scenarios</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Spatial_Visualization', 'Logical_Mathematical', 'Linguistic', 'Interpersonal'].map(trait => (
               <div 
                 key={trait}
                 onClick={() => setWhatIfBoost(whatIfBoost === trait ? null : trait)}
                 className={`cursor-pointer border rounded-2xl p-4 transition-all ${whatIfBoost === trait ? 'bg-purple-500/10 border-purple-500 shadow-lg shadow-purple-500/20' : 'bg-slate-900/50 border-slate-800 hover:border-purple-500/30'}`}
               >
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Boost Trait</p>
                 <p className="font-bold text-white mb-1">{trait.replace('_', ' ')}</p>
                 <p className="text-xs text-slate-400">+3 to simulation</p>
               </div>
            ))}
         </div>
      </div>
      
    </div>
  )
}
