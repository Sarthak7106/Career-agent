import { useState, useEffect, useRef } from 'react'
import { Sparkles, BrainCircuit, Target, CheckCircle2, ChevronRight, Zap, Loader2, ArrowRight, ShieldCheck, Activity, Brain, Users, Lock } from 'lucide-react'

// --- DYNAMIC MAX TRAIT COMPUTER FOR QUIZZES ---
function computeMaxTraits(questions) {
  const maxes = { Linguistic: 0, Logical_Mathematical: 0, Spatial_Visualization: 0, Interpersonal: 0, Intrapersonal: 0, Musical: 0, Bodily: 0, Naturalist: 0 }
  questions.forEach(q => {
     Object.keys(maxes).forEach(trait => {
        let maxForThisT = 0
        q.options.forEach(opt => {
           if (opt.traits && opt.traits[trait] && opt.traits[trait] > maxForThisT) {
             maxForThisT = opt.traits[trait]
           }
        })
        maxes[trait] += maxForThisT
     })
  })
  return maxes
}

// --- UNIVERSAL QUIZ COMPONENT ---
function MultiStepQuiz({ data, onComplete }) {
  const [qIndex, setQIndex] = useState(0)
  const [accumulatedTraits, setAccumulatedTraits] = useState({
    Linguistic: 0, Logical_Mathematical: 0, Spatial_Visualization: 0,
    Interpersonal: 0, Intrapersonal: 0, Musical: 0, Bodily: 0, Naturalist: 0
  })

  const { title, questions } = data

  const handleSelect = (traits) => {
    const nextTraits = { ...accumulatedTraits }
    if (traits) {
      Object.keys(traits).forEach(t => {
        if (nextTraits[t] !== undefined) nextTraits[t] += traits[t]
      })
    }
    
    // Proceed or Complete
    if (qIndex < questions.length - 1) {
      setAccumulatedTraits(nextTraits)
      setQIndex(p => p + 1)
    } else {
      onComplete(nextTraits)
    }
  }

  const currentQ = questions[qIndex]

  return (
    <div className="flex flex-col justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl min-h-[400px] w-full max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-1 bg-indigo-500 transition-all duration-300" style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}></div>
      <div className="absolute top-4 right-6 text-xs font-bold text-slate-500 uppercase tracking-widest">{qIndex + 1} / {questions.length}</div>
      
      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">{title}</h3>
      <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed max-w-2xl">{currentQ.q}</h2>
      
      <div className="flex flex-col gap-3">
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt.traits)}
            className="text-left p-5 rounded-2xl bg-[#1a1a24] border border-slate-700/50 hover:bg-indigo-600/20 hover:border-indigo-500 transition-all group flex items-center justify-between"
          >
            <span className="text-slate-300 font-medium group-hover:text-indigo-100">{opt.text}</span>
            <div className="w-6 h-6 rounded-full border border-slate-600 group-hover:border-indigo-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// --- COGNITIVE GAME COMPONENTS ---
function ReactionGame({ onComplete }) {
  const [state, setState] = useState('waiting')
  const [startTime, setStartTime] = useState(0)
  const [resultMsg, setResultMsg] = useState('')

  useEffect(() => {
    if (state === 'waiting') {
      const timer = setTimeout(() => { setState('ready'); setStartTime(Date.now()) }, Math.random() * 2000 + 1000)
      return () => clearTimeout(timer)
    }
  }, [state])

  const handleClick = () => {
    if (state === 'waiting') setResultMsg("Too early! Wait for green.")
    else if (state === 'ready') {
      const time = Date.now() - startTime
      setState('done')
      const p = time < 300 ? 5 : time < 500 ? 3 : 1
      onComplete({ Bodily: p, Spatial_Visualization: 2 })
      setResultMsg(`Reaction: ${time}ms!`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl h-80 relative overflow-hidden w-full max-w-2xl mx-auto">
      <div className={`absolute inset-0 transition-colors duration-200 ${state === 'ready' ? 'bg-emerald-500/20' : 'bg-transparent'}`}></div>
      <h3 className="text-xl font-bold text-white mb-4 z-10">Reaction Test</h3>
      <p className="text-slate-400 text-sm mb-8 z-10 text-center">Click the button as fast as you can when it turns green.</p>
      
      {state !== 'done' ? (
        <button onClick={handleClick} className={`w-40 h-40 rounded-full font-black text-xl shadow-2xl transition-all active:scale-95 z-10 ${state === 'ready' ? 'bg-emerald-500 text-white shadow-emerald-500/50 scale-105' : 'bg-rose-500 text-white shadow-rose-500/50'}`}>
          {state === 'ready' ? 'CLICK!' : 'Wait...'}
        </button>
      ) : (
        <div className="z-10 text-center animate-in zoom-in"><p className="text-3xl font-black text-emerald-400 mb-4">{resultMsg}</p></div>
      )}
    </div>
  )
}

function PatternGame({ onComplete }) {
  const pattern = [1, 3, 0, 2]
  const [clicked, setClicked] = useState([])
  const [done, setDone] = useState(false)

  const handleTile = (idx) => {
    const newClicked = [...clicked, idx]
    setClicked(newClicked)
    if (newClicked.length === pattern.length) {
      const isMatch = newClicked.every((val, i) => val === pattern[i])
      setDone(true)
      onComplete({ Logical_Mathematical: isMatch ? 5 : 2, Spatial_Visualization: isMatch ? 4 : 1 })
    }
  }

  if (done) return <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl h-80 w-full max-w-2xl mx-auto"><p className="text-2xl font-bold text-indigo-400">Pattern Logged!</p></div>

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl h-80 w-full max-w-2xl mx-auto flex flex-col items-center">
      <h3 className="text-xl font-bold text-white mb-2">Pattern Master</h3>
      <p className="text-slate-400 text-sm mb-6 text-center">Replicate: Top-Right, Bottom-Left, Top-Left, Bottom-Right</p>
      <div className="grid grid-cols-2 gap-4 w-48 mx-auto">
        {[0, 1, 2, 3].map(i => (
          <button key={i} onClick={() => handleTile(i)} disabled={clicked.includes(i)} className={`w-full aspect-square rounded-2xl transition-all shadow-md ${clicked.includes(i) ? 'bg-indigo-500 scale-95 shadow-inner' : 'bg-slate-800 hover:bg-slate-700 hover:scale-105'}`}/>
        ))}
      </div>
    </div>
  )
}

function MemoryGame({ onComplete }) {
  const [phase, setPhase] = useState('show') // show, play, done
  const [activeTile, setActiveTile] = useState(null)
  const sequence = [4, 1, 7]
  const [userSeq, setUserSeq] = useState([])

  useEffect(() => {
    if (phase === 'show') {
      let i = 0
      const interval = setInterval(() => {
        if (i < sequence.length) { setActiveTile(sequence[i]); setTimeout(() => setActiveTile(null), 500); i++ } 
        else { setPhase('play'); clearInterval(interval) }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [phase])

  const handleTile = (idx) => {
    if (phase !== 'play') return
    const newSeq = [...userSeq, idx]
    setUserSeq(newSeq)
    setActiveTile(idx)
    setTimeout(() => setActiveTile(null), 200)

    if (newSeq.length === sequence.length) {
      setPhase('done')
      const isMatch = newSeq.every((val, i) => val === sequence[i])
      onComplete({ Intrapersonal: isMatch ? 5 : 2, Logical_Mathematical: isMatch ? 3 : 1 })
    }
  }

  if (phase === 'done') return <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl h-80 w-full max-w-2xl mx-auto"><p className="text-2xl font-bold text-purple-400">Memory Matrix Logged!</p></div>

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl h-80 w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-2">Memory Matrix</h3>
      <p className="text-slate-400 text-sm mb-6 text-center">{phase === 'show' ? 'Memorize the flashing sequence...' : 'Repeat the sequence!'}</p>
      <div className="grid grid-cols-3 gap-3 w-56 mx-auto">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <button key={i} onClick={() => handleTile(i)} disabled={phase !== 'play'} className={`w-full aspect-square rounded-xl transition-all shadow-md ${activeTile === i ? 'bg-purple-500 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.6)]' : 'bg-[#1a1a24] hover:bg-slate-700'}`}/>
        ))}
      </div>
    </div>
  )
}

// --- DATA: QUIZZES AND SCENARIOS ---
const CORE_PERSONALITY_QS = [
  { q: "When faced with an abstract, unstructured problem, how do you initially respond?", options: [ {text: "Look for patterns and map out a logical framework first.", traits: {Logical_Mathematical: 4}}, {text: "Discuss it with a group to brainstorm diverse ideas.", traits: {Interpersonal: 4}}, {text: "Isolate myself to deeply reflect and internalize the nuances.", traits: {Intrapersonal: 4}} ] },
  { q: "During a quiet evening, what activity brings you the most focus?", options: [ {text: "Reading complex articles or writing journal entries.", traits: {Linguistic: 4}}, {text: "Organizing an environment or building physical models.", traits: {Spatial_Visualization: 3, Bodily: 2}}, {text: "Listening to intricate music or playing an instrument.", traits: {Musical: 4}} ] },
  { q: "If you were to explain a difficult concept, you would...", options: [ {text: "Draw diagrams, charts, and spatial representations.", traits: {Spatial_Visualization: 4}}, {text: "Tell an engaging story with perfect analogies.", traits: {Linguistic: 4}}, {text: "Use raw data, statistics, and sequential steps.", traits: {Logical_Mathematical: 4}} ] },
  { q: "What bothers you the most in a group project?", options: [ {text: "Lack of communication and social cohesion.", traits: {Interpersonal: 3}}, {text: "Messy, illogical, and unorganized workflows.", traits: {Logical_Mathematical: 3}}, {text: "People ignoring the holistic, big picture vision.", traits: {Naturalist: 3, Spatial_Visualization: 1}} ] },
  { q: "How do you memorize new information?", options: [ {text: "Repeating it aloud or writing it down multiple times.", traits: {Linguistic: 3}}, {text: "Associating it with a physical movement or feeling.", traits: {Bodily: 4}}, {text: "Linking it to a specific melody or beat.", traits: {Musical: 4}} ] },
  { q: "When working heavily, what is your relationship with nature?", options: [ {text: "I deliberately take breaks in natural environments to reset.", traits: {Naturalist: 4}}, {text: "I prefer synthetic, highly controlled indoor environments.", traits: {Logical_Mathematical: 2}}, {text: "Nature inspires my creative and spatial structures.", traits: {Spatial_Visualization: 2, Naturalist: 2}} ] },
  { q: "If you have completely failed a major task, how do you process it?", options: [ {text: "Analyze the mathematical probability of what went wrong.", traits: {Logical_Mathematical: 3}}, {text: "Internalize the failure and deeply analyze my own mental states.", traits: {Intrapersonal: 4}}, {text: "Talk it through with close colleagues for external perspective.", traits: {Interpersonal: 3}} ] },
  { q: "When navigating a completely new city, you rely on...", options: [ {text: "Reading street names and asking locals for verbal directions.", traits: {Linguistic: 2, Interpersonal: 2}}, {text: "Building an internal map based on landmarks and shapes.", traits: {Spatial_Visualization: 4}}, {text: "Using a grid coordinate system or GPS logic.", traits: {Logical_Mathematical: 3}} ] }
]

const OPTIONAL_VALUES_QS = [
  { q: "What is your core motivator at work?", options: [ {text: "Building perfect, frictionless systems.", traits: {Logical_Mathematical: 3}}, {text: "Ensuring harmony and growth in my peers.", traits: {Interpersonal: 4}}, {text: "Achieving deep mastery of my own potential.", traits: {Intrapersonal: 4}} ] },
  { q: "When receiving a reward, you prefer:", options: [ {text: "Public acknowledgment and team celebrations.", traits: {Interpersonal: 3}}, {text: "Quiet, private bonuses supporting my autonomy.", traits: {Intrapersonal: 3}}, {text: "A promotion into a structurally higher role.", traits: {Logical_Mathematical: 2}} ] }
]

const CORE_SITUATIONAL_QS = [
  { q: "Your team is running 2 weeks behind schedule. The client is furious. What is your immediate action?", options: [ {text: "Re-calculate exactly how many hours are needed and strip away low-value features.", traits: {Logical_Mathematical: 4, Intrapersonal: 1}}, {text: "Call an immediate crisis meeting to motivate the team and calm the client emotionally.", traits: {Interpersonal: 4, Linguistic: 2}}, {text: "Step in and physically do the hardest manual labor yourself to speed it up.", traits: {Bodily: 3, Spatial_Visualization: 1}} ] },
  { q: "You discover a critical flaw in your company's core product right before launch. No one else knows.", options: [ {text: "Write a detailed, articulate report explaining the flaw and present it to management.", traits: {Linguistic: 4, Interpersonal: 1}}, {text: "Halt the launch using your authority based on sheer logical risk-analysis.", traits: {Logical_Mathematical: 3, Intrapersonal: 2}}, {text: "Quietly orchestrate an internal team to patch it without causing panic.", traits: {Interpersonal: 3, Spatial_Visualization: 1}} ] },
  { q: "Two of your best employees refuse to work together due to a personal dispute. What do you do?", options: [ {text: "Sit them down together and mediate their psychological dispute heavily.", traits: {Interpersonal: 4, Intrapersonal: 2}}, {text: "Fire one or mathematically separate completely different workflows for them.", traits: {Logical_Mathematical: 3}}, {text: "Design a new spatial layout in the office so they rarely cross paths.", traits: {Spatial_Visualization: 3, Naturalist: 1}} ] },
  { q: "Your company demands you give a 1-hour presentation to 500 people tomorrow.", options: [ {text: "I write a stunning, perfectly articulated speech.", traits: {Linguistic: 4}}, {text: "I design an incredibly beautiful, visually complex slide deck.", traits: {Spatial_Visualization: 4}}, {text: "I walk on stage and wing it, using my physical presence and crowd interaction.", traits: {Bodily: 3, Interpersonal: 3}} ] },
  { q: "The whole office internet goes down for the day.", options: [ {text: "Suggest everyone moves to a local park to do team-building.", traits: {Naturalist: 4, Interpersonal: 2}}, {text: "Use the time alone to do deep, offline thinking.", traits: {Intrapersonal: 4}}, {text: "Use physical whiteboards to map out complex architecture offline.", traits: {Spatial_Visualization: 3, Bodily: 2}} ] }
]

const OPTIONAL_CRISIS_QS = [
  { q: "A competitor releases a product twice as good as yours.", options: [ {text: "Rally your team and boost morale via speeches.", traits: {Interpersonal: 3, Linguistic: 2}}, {text: "Lock yourself in a room and redesign your architecture logically.", traits: {Logical_Mathematical: 4, Intrapersonal: 2}} ] }
]

// --- MODULE CATALOG CONFIG ---
const MODULE_CATALOG = [
  { id: 'core_personality', title: 'Core Personality Index', desc: 'Mandatory 8-question evaluation mapping foundational traits.', category: 'personality', mandatory: true, icon: Brain, data: { title: "Personality Index", questions: CORE_PERSONALITY_QS } },
  { id: 'values_quiz', title: 'Deep Values Mapping', desc: 'Optional 2-question deep dive into internal motivations.', category: 'personality', mandatory: false, icon: Target, data: { title: "Values Architecture", questions: OPTIONAL_VALUES_QS } },
  { id: 'core_situational', title: 'Workplace Scenarios', desc: 'Mandatory 5-scenario set testing real-world reactions under pressure.', category: 'situational', mandatory: true, icon: ShieldCheck, data: { title: "Judgment Logic", questions: CORE_SITUATIONAL_QS } },
  { id: 'crisis_scenario', title: 'Crisis Management', desc: 'Optional rapid-decision scenarios testing risk.', category: 'situational', mandatory: false, icon: Users, data: { title: "Crisis Flow", questions: OPTIONAL_CRISIS_QS } },
  { id: 'reaction', title: 'Reaction Speed', desc: 'Test motor reflexes.', category: 'game', mandatory: false, icon: Zap, component: ReactionGame, maxTraits: {Bodily: 5, Spatial_Visualization: 2} },
  { id: 'pattern', title: 'Pattern Master', desc: 'Visual cognitive indexing.', category: 'game', mandatory: false, icon: Activity, component: PatternGame, maxTraits: {Logical_Mathematical: 5, Spatial_Visualization: 4} },
  { id: 'memory', title: 'Memory Matrix', desc: 'Recall sequences under load.', category: 'game', mandatory: false, icon: BrainCircuit, component: MemoryGame, maxTraits: {Intrapersonal: 5, Logical_Mathematical: 3} }
]

// Compute maximums for Quiz modules on load
MODULE_CATALOG.forEach(mod => {
  if (mod.data && mod.data.questions && !mod.maxTraits) {
    mod.maxTraits = computeMaxTraits(mod.data.questions)
  }
})


export default function ProfileBuilder({ profile, setProfile, onSubmit, gainXp }) {
  const [phase, setPhase] = useState('BASIC') // BASIC, CATALOG, PLAYING, DONE
  const [isProcessing, setIsProcessing] = useState(false)
  const [xpPopup, setXpPopup] = useState(null)
  
  const [basicInfo, setBasicInfo] = useState({ name: '', interests: '' })
  
  // Mandatory modules are auto-selected
  const [selectedModules, setSelectedModules] = useState(() => MODULE_CATALOG.filter(m => m.mandatory).map(m => m.id))
  
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [traitsLog, setTraitsLog] = useState([]) 

  const triggerXp = (amount, reason) => {
    gainXp(amount)
    setXpPopup({ amount, reason })
    setTimeout(() => setXpPopup(null), 2000)
  }

  const toggleModule = (id) => {
    const mod = MODULE_CATALOG.find(m => m.id === id)
    if (!mod || mod.mandatory) return // Cannot toggle mandatory
    
    if (selectedModules.includes(id)) {
      setSelectedModules(prev => prev.filter(mid => mid !== id))
    } else {
      if (selectedModules.length < 6) { // Max 6 total
        setSelectedModules(prev => [...prev, id])
        triggerXp(1, "Module Attached")
      }
    }
  }

  const handleModuleComplete = (traits) => {
    setTraitsLog(prev => [...prev, traits])
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      if (currentModuleIndex < selectedModules.length - 1) {
        setCurrentModuleIndex(prev => prev + 1)
        triggerXp(25, "Module Cleared!")
      } else {
        setPhase('DONE')
        triggerXp(100, "Assessment Finished!")
      }
    }, 800)
  }

  const processData = () => {
    setIsProcessing(true)
    setTimeout(() => {
      const possibleMax = { Linguistic: 0, Logical_Mathematical: 0, Spatial_Visualization: 0, Interpersonal: 0, Intrapersonal: 0, Musical: 0, Bodily: 0, Naturalist: 0 }
      const appearances = { Linguistic: 0, Logical_Mathematical: 0, Spatial_Visualization: 0, Interpersonal: 0, Intrapersonal: 0, Musical: 0, Bodily: 0, Naturalist: 0 }

      selectedModules.forEach(mid => {
        const def = MODULE_CATALOG.find(m => m.id === mid)
        if (def && def.maxTraits) {
          Object.entries(def.maxTraits).forEach(([t, v]) => {
            if (v > 0) {
              possibleMax[t] += v
              appearances[t] += 1
            }
          })
        }
      })

      const actualScore = { Linguistic: 0, Logical_Mathematical: 0, Spatial_Visualization: 0, Interpersonal: 0, Intrapersonal: 0, Musical: 0, Bodily: 0, Naturalist: 0 }
      traitsLog.forEach(log => {
        Object.entries(log).forEach(([t, v]) => { actualScore[t] += v })
      })

      const finalTraits = {}
      const finalConfidence = {}

      Object.keys(actualScore).forEach(trait => {
        if (possibleMax[trait] > 0) {
          const ratio = actualScore[trait] / possibleMax[trait]
          finalTraits[trait] = Math.max(3, Math.round(ratio * 10)) // Baseline floor 3
        } else {
          finalTraits[trait] = 5 
        }
        
        const tested = appearances[trait]
        if (tested === 0) finalConfidence[trait] = 0.4
        else if (tested === 1) finalConfidence[trait] = 0.55
        else if (tested === 2) finalConfidence[trait] = 0.75
        else if (tested >= 3) finalConfidence[trait] = 0.95
      })

      const newProfile = {
        ...profile,
        traits: finalTraits,
        traitConfidence: finalConfidence,
        skills: basicInfo.interests ? basicInfo.interests.split(',').map(s=>s.trim()).filter(Boolean) : ["Communication", "Strategy"]
      }

      setProfile(newProfile)
      setIsProcessing(false)
      onSubmit(newProfile)
    }, 2000)
  }

  // Identify categories selected for validation
  const selCategories = selectedModules.map(mid => MODULE_CATALOG.find(m => m.id === mid).category)
  const hasGame = selCategories.includes('game')

  return (
    <div className="max-w-5xl mx-auto pb-12 relative animate-in fade-in">
      
      {xpPopup && (
        <div className="fixed top-24 right-10 bg-indigo-500 text-white px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/40 animate-in slide-in-from-right fade-in zoom-in z-50 flex items-center gap-2 font-bold pointer-events-none">
          <Sparkles size={16} /> +{xpPopup.amount} XP <span className="text-indigo-200 text-xs ml-1 font-medium">{xpPopup.reason}</span>
        </div>
      )}

      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in">
           <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
           <p className="text-lg font-bold text-white tracking-widest uppercase text-center max-w-md">
             {phase === 'DONE' ? "Aggregating hybrid data sources & calculating confidence intervals..." : "Validating Module Logic..."}
           </p>
        </div>
      )}

      {/* PHASE 1: BASIC INFO */}
      {phase === 'BASIC' && (
        <div className="bg-[#111115] border border-slate-800 rounded-2xl p-10 shadow-2xl max-w-2xl mx-auto mt-10">
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Psychometric Assessment</h2>
          <p className="text-slate-400 mb-8 max-w-md">Complete a multi-source evaluation combining deep personality mapping, real-time situational judgments, and cognitive reflex games.</p>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">First Name</label>
              <input type="text" value={basicInfo.name} onChange={e => setBasicInfo({...basicInfo, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="e.g. Satoshi" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Key Core Skills (Comma Separated)</label>
              <input type="text" value={basicInfo.interests} onChange={e => setBasicInfo({...basicInfo, interests: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" placeholder="e.g. Python, UI Design, Negotiation" />
            </div>
          </div>
          
          <button onClick={() => { triggerXp(10, 'Onboarded'); setPhase('CATALOG') }} disabled={!basicInfo.name} className="mt-8 flex w-full justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all">
            Continue <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* PHASE 2: HYBRID CATALOG */}
      {phase === 'CATALOG' && (
        <div className="animate-in slide-in-from-bottom-4">
          <div className="flex flex-col md:flex-row justify-between items-center bg-[#111115] border border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl">
             <div>
               <h2 className="text-3xl font-black text-white tracking-tight mb-2">Construct Your Assessment</h2>
               <p className="text-slate-400 max-w-xl">Mandatory foundational modules are locked. You must select at least 1 optional Cognitive Game to proceed. Select up to 6 total modules to increase your career prediction accuracy!</p>
             </div>
             <div className="mt-6 md:mt-0 text-center bg-slate-900 px-8 py-5 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Modules</p>
                <p className={`text-3xl font-black ${hasGame ? 'text-emerald-400' : 'text-amber-400'}`}>{selectedModules.length} / 6</p>
             </div>
          </div>

          {['personality', 'situational', 'game'].map(category => (
             <div key={category} className="mb-10">
               <h3 className="text-lg font-bold text-white mb-4 capitalize flex items-center gap-2">
                 {category === 'personality' ? <Brain size={20} className="text-purple-400"/> : category === 'situational' ? <ShieldCheck size={20} className="text-indigo-400"/> : <Zap size={20} className="text-emerald-400" />}
                 {category} Modules
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                 {MODULE_CATALOG.filter(m => m.category === category).map(mod => {
                   const isSelected = selectedModules.includes(mod.id)
                   return (
                     <div key={mod.id} onClick={() => toggleModule(mod.id)} className={`group relative p-6 rounded-3xl border transition-all duration-300 ${mod.mandatory ? 'bg-[#111115] border-slate-700/50 cursor-not-allowed' : 'cursor-pointer'} ${isSelected && !mod.mandatory ? 'bg-indigo-500/10 border-indigo-500 shadow-lg shadow-indigo-500/20' : !mod.mandatory ? 'bg-[#111115] border-slate-800 hover:border-slate-600' : ''}`}>
                       <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-xl ${isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white transition-colors'}`}>
                            <mod.icon size={22} />
                          </div>
                          {mod.mandatory && <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase bg-slate-900 px-2 py-1 rounded border border-slate-800"><Lock size={10} /> Core</div>}
                          {!mod.mandatory && isSelected && <CheckCircle2 className="text-indigo-500 animate-in zoom-in" />}
                       </div>
                       <h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3>
                       <p className="text-sm text-slate-400 mb-2 font-medium">{mod.desc}</p>
                     </div>
                   )
                 })}
               </div>
             </div>
          ))}

          <div className="flex justify-end sticky bottom-6 z-30">
            <button 
              onClick={() => { setPhase('PLAYING'); triggerXp(20, "Initiating Architecture"); }}
              disabled={selectedModules.length < 3 || !hasGame}
              className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-emerald-500/20"
            >
              {hasGame ? 'Begin Assessment sequence' : 'Please select a Game'} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: PLAYING */}
      {phase === 'PLAYING' && (
        <div className="animate-in fade-in slide-in-from-bottom-4">
           <div className="mb-8 flex flex-col md:flex-row items-center justify-between bg-[#111115] border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-4xl mx-auto gap-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-indigo-500/20 rounded-xl border border-indigo-500/50 flex items-center justify-center text-indigo-400">
                    <Activity size={20} className="animate-pulse" />
                 </div>
                 <div>
                   <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Active Module</span>
                   <span className="block text-lg font-bold text-slate-200">{MODULE_CATALOG.find(m => m.id === selectedModules[currentModuleIndex])?.title}</span>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="text-right">
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Overall Progress</p>
                   <p className="text-sm font-bold text-indigo-400">{currentModuleIndex + 1} of {(selectedModules || []).length}</p>
                 </div>
              </div>
           </div>

           {(() => {
             if (!selectedModules || selectedModules.length === 0) {
               return <div className="text-white text-center p-8 bg-slate-900 rounded-3xl">Please select modules to continue.</div>
             }
             
             if (currentModuleIndex >= selectedModules.length) {
               // Boundary check: Should inherently trigger DONE phase, but returns null safely here.
               return null;
             }
             
             console.log("Modules:", selectedModules)
             console.log("Current Index:", currentModuleIndex)
             
             const mid = selectedModules[currentModuleIndex]
             const modDef = MODULE_CATALOG.find(m => m.id === mid)
             
             console.log("Current Module:", modDef)
             
             if (!modDef) return <div className="text-white text-center p-8 bg-slate-900 rounded-3xl">Module not found.</div>
             
             if (modDef.component) {
               const ActiveGame = modDef.component
               return <ActiveGame key={`mod-${mid}`} onComplete={handleModuleComplete} />
             } else if (modDef.data) {
               return <MultiStepQuiz key={`mod-${mid}`} data={modDef.data} onComplete={handleModuleComplete} />
             }
           })()}

           <div className="flex justify-center mt-10">
              <p className="text-xs text-slate-500 font-semibold italic bg-slate-900 px-4 py-2 rounded-full shadow-inner border border-slate-800">
                "Multi-module correlation tracking active..."
              </p>
           </div>
        </div>
      )}

      {/* PHASE 4: DONE */}
      {phase === 'DONE' && (
        <div className="bg-[#111115] border border-slate-800 rounded-3xl p-12 text-center max-w-3xl mx-auto flex flex-col items-center shadow-2xl animate-in zoom-in">
           <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 border-dashed animate-spin-slow relative">
             <CheckCircle2 size={40} className="absolute inset-0 m-auto text-emerald-400 animate-none" />
           </div>
           <h2 className="text-4xl font-black text-white tracking-tight mb-4">Assessment Secured</h2>
           <p className="text-lg text-slate-400 mb-10 max-w-md leading-relaxed">
             The framework has successfully merged data across {selectedModules.length} distinct psycho-cognitive modules. Baseline matrices are being cross-referenced.
           </p>
           
           <button onClick={processData} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-12 py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center gap-3">
             Initialize Results Matrix <Sparkles size={20} />
           </button>
        </div>
      )}

    </div>
  )
}
