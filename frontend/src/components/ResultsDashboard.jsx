import { useState } from 'react'
import { getRecommendations } from '../lib/careerEngine'
import { CAREER_DETAILS } from '../lib/careerDetails'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'
import { Sparkles, Target, Activity, Zap, TrendingUp, ShieldCheck, MapPin, Globe } from 'lucide-react'
import WhatIf from './WhatIf'

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
  const { top, confidence, confidenceMsg } = getRecommendations(profile)
  const details = CAREER_DETAILS[top.id] || {}

  // Single Source of Truth
  const predictedCareer = top;
  
  if (!predictedCareer) {
    return <div className="text-white text-center py-20">Loading predicted career...</div>
  }
  console.log("Predicted Career:", predictedCareer.title);

  const targetCountry = profile.targetCountry || "India";

  const countryRoadmapNotes = {
    "India": {
      note: "Focus on competitive exams, structured degrees, certifications.",
      steps: ["Prepare for GATE / Govt Exams or top Indian MBAs", "Join local technical forums and prepare structured certifications", "Focus on campus placements / fast-paced hiring drives", "Build specialized expertise for leadership roles"]
    },
    "USA": {
      note: "Focus on projects, internships, networking, research.",
      steps: ["Build strong GitHub portfolio and apply for internships", "Actively network on LinkedIn and attend major hackathons", "Gain CPT/OPT or H1-B sponsor-ready technical skills", "Leverage open-source research and diverse experience"]
    },
    "Canada": {
      note: "Focus on diplomas + PR pathways + skill-based roles.",
      steps: ["Enroll in PGWP eligible programs or diplomas", "Align foundational skills with the Express Entry shortage list", "Build local Canadian work experience", "Network for provincial nominee programs (PNP)"]
    },
    "Germany": {
      note: "Focus on technical education + public universities + language (German).",
      steps: ["Learn basic German (A2/B1 level recommended)", "Apply to tuition-free public universities for deep tech", "Seek Werkstudent (working student) positions locally", "Integrate into major engineering/automotive sectors"]
    }
  };

  const currentCountryNotes = countryRoadmapNotes[targetCountry] || countryRoadmapNotes["India"];

  // Mock scores
  const scoreMap = { High: 92, Moderate: 74, Low: 45 }
  const mainScore = scoreMap[confidence] || 50

  const radarData = Object.entries(details.career_dna || {}).map(([key, val]) => ({
    subject: key, A: val, fullMark: 10,
  }))

  // Career Specific Skills
  const careerTitle = predictedCareer.title;
  const mappedTraits = predictedCareer.skills || [];
  
  const topCareerTraits = mappedTraits.map(t => ({
    name: t,
    score: Math.floor(60 + Math.random() * 40) // Mock score
  })).sort((a, b) => b.score - a.score).slice(0, 5);

  // Skill Gap Mock logic
  const requiredSkills = predictedCareer.skills || []
  const userSkills = profile.skills.map(s => s.toLowerCase())
  const matchedSkills = requiredSkills.filter(s => userSkills.includes(s.toLowerCase()))
  const missingSkills = requiredSkills.filter(s => !userSkills.includes(s.toLowerCase()))
  const gapPercentage = requiredSkills.length > 0 ? (missingSkills.length / requiredSkills.length) * 100 : 0

  const pieData = [
    { name: 'Matched', value: matchedSkills.length },
    { name: 'Missing', value: missingSkills.length }
  ]

  // Regional Feasibility Calculation
  const mockDemand = careerTitle.length % 5 + 5;
  const mockCompetition = (careerTitle.charCodeAt(0) % 5) + 4;
  const mockSalary = (careerTitle.charCodeAt(1) % 4) + 6;
  const metrics = { demand: mockDemand, competition: mockCompetition, salary: mockSalary };
  const rawScore = metrics.demand * 0.4 + metrics.salary * 0.3 - metrics.competition * 0.3;
  
  const feasibilityScore = Math.max(0, Math.min(100, Math.round(50 + rawScore * 10)));
  
  let scoreColor = "bg-red-500";
  let textColor = "text-red-400";
  let explanation = "High competition and low local demand. Consider remote roles or niche specialization.";
  
  if (feasibilityScore >= 75) {
    scoreColor = "bg-emerald-500";
    textColor = "text-emerald-400";
    explanation = "Excellent local market demand with highly competitive compensation trends.";
  } else if (feasibilityScore >= 60) {
    scoreColor = "bg-amber-400";
    textColor = "text-amber-400";
    explanation = "Moderate feasibility. Balanced job availability, but noticeable market competition.";
  }

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
            <h1 className="text-5xl font-black text-white tracking-tight mb-2">{careerTitle}</h1>
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

      {/* NEW: Regional Feasibility Analysis */}
      <div className="bg-[#111115] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe size={18} className="text-blue-400" /> Regional Feasibility Analysis ({targetCountry})
          </h3>
          <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full border bg-slate-900 ${textColor} border-slate-800`}>
             Score: {feasibilityScore}%
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
            <span>Market Viability</span>
            <span>{feasibilityScore}/100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3">
             <div className={`h-3 rounded-full transition-all duration-1000 ${scoreColor}`} style={{ width: `${feasibilityScore}%` }}></div>
          </div>
        </div>
        
        <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl flex items-start gap-3 mt-4">
           <MapPin size={16} className="text-slate-400 mt-0.5" />
           <p className="text-sm text-slate-300">
             <span className="font-semibold text-white">AI Analysis: </span> 
             {explanation}
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 2. Career DNA (Radar Chart) */}
        <div className="bg-[#111115] border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Target size={18} className="text-indigo-400" /> Career DNA</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#475569' }} />
                <Radar name="Career Requirement" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NEW: Career Skill Profile */}
        <div className="bg-[#111115] border border-slate-800 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Activity size={18} className="text-emerald-400" /> Career Skill Profile</h3>
          
          <div className="space-y-5">
            {topCareerTraits.map((trait, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                  <span>{trait.name}</span>
                  <span className="text-indigo-400">{trait.score}%</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                  <div className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${trait.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 4. Skill Gap */}
        <div className="lg:col-span-4 bg-[#111115] border border-slate-800 rounded-3xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-amber-400" /> Skill Gap</h3>
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
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><MapPin size={18} className="text-blue-400" /> Career Roadmap</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
              Personalized for: {targetCountry}
            </span>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl mb-6">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Country Strategy</p>
            <p className="text-sm font-medium text-slate-300">{currentCountryNotes.note}</p>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 space-y-6">
            {['beginner', 'intermediate', 'advanced'].map((phaseKey, i) => {
              const phaseLabel = phaseKey === 'beginner' ? 'Foundation (0-6 months)' : phaseKey === 'intermediate' ? 'Skill Building (6-12 months)' : 'Specialization (1+ years)';
              const phaseSteps = predictedCareer.roadmap?.[phaseKey] || [];
              return (
              <div key={i} className="relative pl-6 group">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                <h4 className="font-bold text-slate-200 mb-1">{phaseLabel}</h4>
                <p className="text-sm text-slate-500 mb-3">{phaseSteps.join(" • ") || "Focus on core fundamentals."}</p>
                <div className="inline-flex items-start gap-2 px-3 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-lg">
                  <span className="text-indigo-400 mt-0.5"><Sparkles size={12}/></span>
                  <p className="text-xs font-medium text-indigo-300">
                    <span className="font-bold">{targetCountry} Focus:</span> {currentCountryNotes.steps[i] || currentCountryNotes.steps[0]}
                  </p>
                </div>
              </div>
            )})}
          </div>
        </div>

      </div>

      {/* 6. What-If Analysis Integration */}
      <div className="bg-[#111115] border border-slate-800 rounded-3xl p-6 relative overflow-hidden mt-6">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Zap size={18} className="text-purple-400" /> What-If Analysis
        </h3>
        <p className="text-sm text-slate-400 mb-6 border-b border-slate-800/60 pb-6">Simulate how changes in your skills or interests affect your career path</p>
        
        {profile && profile.traits ? (
          <div className="-mx-6 -mb-6 px-6 pb-6 pt-2">
            <WhatIf profile={profile} predictedCareer={predictedCareer} onNavigate={() => window.scrollTo({ top: 0, behavior: 'smooth'})} />
          </div>
        ) : (
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <p className="text-sm text-slate-500">Simulation data unavailable. Please complete the full profile.</p>
          </div>
        )}
      </div>

    </div>
  )
}
