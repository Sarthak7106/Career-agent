import { useState, useEffect } from 'react'
import { LayoutDashboard, Target, History as HistoryIcon, UserCircle, GraduationCap, Zap, Loader2 } from 'lucide-react'
import { getRecommendations } from './lib/careerEngine'
import ProfileBuilder from './components/ProfileBuilder'
import ResultsDashboard from './components/ResultsDashboard'
import HistoryTab from './components/HistoryTab'
import Counselor from './components/Counselor'

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

const getXpLevel = (xp) => {
  if (xp >= 200) return { title: 'Pro', max: 500, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/50' }
  if (xp >= 100) return { title: 'Advanced', max: 200, color: 'text-indigo-400', bg: 'bg-indigo-500/20', border: 'border-indigo-500/50' }
  if (xp >= 50) return { title: 'Explorer', max: 100, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' }
  return { title: 'Beginner', max: 50, color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/50' }
}

export default function App({ onGoHome }) {
  const [activeTab, setActiveTab] = useState('quiz')
  const [profile, setProfile] = useState(initialProfile)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisDone, setAnalysisDone] = useState(false)
  
  // Gamification & State
  const [xp, setXp] = useState(10)
  const [history, setHistory] = useState([])
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

  const gainXp = (amount) => setXp(prev => prev + amount)

  const handleAnalyze = (finalProfile) => {
    // Only process after profile is finalized and explicitly passed from ProfileBuilder
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisDone(true)
      gainXp(40) // Reward for completing quiz
      setActiveTab('dashboard')
      
      const result = getRecommendations(finalProfile)
      const scoreMap = { High: 92, Moderate: 74, Low: 45 }
      const topTraitKey = Object.keys(finalProfile.traits).reduce((a, b) => finalProfile.traits[a] > finalProfile.traits[b] ? a : b)
      
      const historyEntry = {
        id: Date.now(),
        date: new Date().toISOString(), // Use ISO string as requested
        match_score: scoreMap[result.confidence] || 50,
        career: result.top.title, 
        topTrait: topTraitKey
      }
      
      console.log("Saving history entry:", historyEntry);
      
      setHistory(prev => [{ ...historyEntry }, ...prev])
      
    }, 500) // Short UI transition delay
  }

  const levelInfo = getXpLevel(xp)
  const progressPercent = Math.min(100, (xp / levelInfo.max) * 100)

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quiz', label: 'Quiz', icon: Target },
    { id: 'history', label: 'History', icon: HistoryIcon },
    { id: 'counselor', label: 'Counselor', icon: GraduationCap },
  ]

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F0F12] border-r border-slate-800/60 flex flex-col items-center py-6 px-4 shrink-0 transition-all z-20">
        <div className="flex items-center gap-3 w-full mb-10 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Zap size={20} fill="currentColor" />
          </div>
          <h1 className="text-xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">AI Mentor</h1>
        </div>

        <nav className="w-full flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
             <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              disabled={item.id === 'dashboard' && !analysisDone}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner' 
                  : item.id === 'dashboard' && !analysisDone
                    ? 'text-slate-600 cursor-not-allowed opacity-50'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
             >
               <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
               <span className="font-medium text-sm">{item.label}</span>
             </button>
          ))}
        </nav>

        {/* User Card (Bottom of Sidebar) */}
        <div className="mt-auto w-full group cursor-pointer">
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-4 flex items-center gap-3 hover:border-indigo-500/30 transition-all">
            <UserCircle size={36} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-slate-200">Alex Student</span>
              <span className="text-xs text-slate-500">Free Tier</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Glow Effects in background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Header */}
        <header className="h-20 border-b border-slate-800/60 bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
           <h2 className="text-xl font-bold text-white tracking-tight capitalize">
             {activeTab === 'quiz' && 'Psychometric Quiz'}
             {activeTab === 'dashboard' && 'Results Dashboard'}
             {activeTab === 'history' && 'Past Analysis'}
             {activeTab === 'counselor' && 'AI Counselor'}
           </h2>

           {/* XP Widget */}
           <div className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 rounded-2xl p-2 px-4 shadow-sm">
             <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${levelInfo.bg} ${levelInfo.color} ${levelInfo.border}`}>
                    {levelInfo.title}
                  </span>
                  <span className="text-sm font-bold text-white">{xp} <span className="text-slate-500 font-normal">XP</span></span>
                </div>
                {/* Progress Bar */}
                <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
             </div>
             <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-slate-300 shadow-inner">
                Lvl {Math.floor(xp / 50) + 1}
             </div>
           </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 relative z-10 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {isAnalyzing ? (
             <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-500">
               <div className="w-24 h-24 relative mb-6">
                 <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                 <Zap className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={32} />
               </div>
               <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">Analyzing Your Profile</h2>
               <p className="text-slate-400 text-sm">Processing psychometric traits and calculating optimal career pathways...</p>
             </div>
          ) : (
             <div className="max-w-6xl mx-auto w-full h-full pb-20">
               {activeTab === 'quiz' && (
                 <ProfileBuilder 
                   profile={profile} 
                   setProfile={setProfile} 
                   onSubmit={handleAnalyze} 
                   gainXp={gainXp}
                 />
               )}
               {activeTab === 'dashboard' && analysisDone && (
                 <ResultsDashboard 
                   profile={effectiveProfile} 
                   whatIfBoost={whatIfBoost}
                   setWhatIfBoost={setWhatIfBoost}
                 />
               )}
               {activeTab === 'history' && (
                 <HistoryTab history={history} />
               )}
               {activeTab === 'counselor' && (
                 <Counselor profile={effectiveProfile} />
               )}
             </div>
          )}
        </main>
      </div>
    </div>
  )
}
