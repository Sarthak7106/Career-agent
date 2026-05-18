import { useState, useEffect, useRef } from 'react'
import { Sparkles, BrainCircuit, Target, CheckCircle2, Zap, Loader2, ArrowRight, ShieldCheck, Activity, Brain, Users, Lock } from 'lucide-react'

// --- RANDOMIZER UTILITY ---
const getRandomQuestions = (arr, n) => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n)
}

// --- TRAIT KEYS ---
const TRAIT_KEYS = ['Linguistic', 'Logical_Mathematical', 'Spatial_Visualization', 'Interpersonal', 'Intrapersonal', 'Musical', 'Bodily', 'Naturalist']

// --- DYNAMIC MAX TRAIT COMPUTER ---
function computeMaxTraits(questions) {
  const maxes = Object.fromEntries(TRAIT_KEYS.map(k => [k, 0]))
  questions.forEach(q => {
    TRAIT_KEYS.forEach(trait => {
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
  const [accumulatedTraits, setAccumulatedTraits] = useState(Object.fromEntries(TRAIT_KEYS.map(k => [k, 0])))
  const [selected, setSelected] = useState(null)
  const { title, questions } = data

  const handleSelect = (traits) => {
    if (selected !== null) return; // Prevent double clicks
    setSelected(traits)
    setTimeout(() => {
      const nextTraits = { ...accumulatedTraits }
      if (traits) {
        Object.keys(traits).forEach(t => {
          if (nextTraits[t] !== undefined) nextTraits[t] += traits[t]
        })
      }
      setSelected(null)
      if (qIndex < questions.length - 1) {
        setAccumulatedTraits(nextTraits)
        setQIndex(p => p + 1)
      } else {
        onComplete(nextTraits)
      }
    }, 220)
  }

  const currentQ = questions[qIndex]
  if (!currentQ) return null; // Safe rendering if data is still syncing

  return (
    <div className="flex flex-col justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl min-h-[420px] w-full max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full" style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}></div>
      <div className="absolute top-4 right-6 text-xs font-bold text-slate-500 uppercase tracking-widest">{qIndex + 1} / {questions.length}</div>

      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">{title}</h3>
      <h2 className="text-xl font-bold text-white mb-7 leading-relaxed max-w-2xl">{currentQ.q}</h2>

      <div className="flex flex-col gap-3">
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt.traits)}
            className={`text-left p-4 rounded-2xl border transition-all duration-200 group flex items-center justify-between
              ${selected === opt.traits
                ? 'bg-indigo-600/30 border-indigo-500 scale-[0.99]'
                : 'bg-[#1a1a24] border-slate-700/50 hover:bg-indigo-600/20 hover:border-indigo-500'
              }`}
          >
            <span className="text-slate-300 font-medium group-hover:text-indigo-100 text-sm">{opt.text}</span>
            <div className="w-5 h-5 rounded-full border border-slate-600 group-hover:border-indigo-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ml-3 shrink-0">
              <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full"></div>
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
        <div className="z-10 text-center"><p className="text-3xl font-black text-emerald-400 mb-4">{resultMsg}</p></div>
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
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-800 rounded-3xl h-80 w-full max-w-2xl mx-auto">
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
  const [phase, setPhase] = useState('show')
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

// ----------------------------
// QUESTION POOLS (20+ each)
// ----------------------------
const questionPool = {
  personality: [
    { q: "When faced with an abstract, unstructured problem, how do you initially respond?", options: [ {text: "Look for patterns and map out a logical framework first.", traits: {Logical_Mathematical: 4}}, {text: "Discuss it with a group to brainstorm diverse ideas.", traits: {Interpersonal: 4}}, {text: "Isolate myself to deeply reflect and internalize the nuances.", traits: {Intrapersonal: 4}} ] },
    { q: "During a quiet evening, what activity brings you the most focus?", options: [ {text: "Reading complex articles or writing journal entries.", traits: {Linguistic: 4}}, {text: "Organizing an environment or building physical models.", traits: {Spatial_Visualization: 3, Bodily: 2}}, {text: "Listening to intricate music or playing an instrument.", traits: {Musical: 4}} ] },
    { q: "If you were to explain a difficult concept, you would...", options: [ {text: "Draw diagrams, charts, and spatial representations.", traits: {Spatial_Visualization: 4}}, {text: "Tell an engaging story with perfect analogies.", traits: {Linguistic: 4}}, {text: "Use raw data, statistics, and sequential steps.", traits: {Logical_Mathematical: 4}} ] },
    { q: "What bothers you the most in a group project?", options: [ {text: "Lack of communication and social cohesion.", traits: {Interpersonal: 3}}, {text: "Messy, illogical, and unorganized workflows.", traits: {Logical_Mathematical: 3}}, {text: "People ignoring the holistic, big picture vision.", traits: {Naturalist: 3, Spatial_Visualization: 1}} ] },
    { q: "How do you memorize new information?", options: [ {text: "Repeating it aloud or writing it down multiple times.", traits: {Linguistic: 3}}, {text: "Associating it with a physical movement or feeling.", traits: {Bodily: 4}}, {text: "Linking it to a specific melody or beat.", traits: {Musical: 4}} ] },
    { q: "When working heavily, what is your relationship with nature?", options: [ {text: "I deliberately take breaks in natural environments to reset.", traits: {Naturalist: 4}}, {text: "I prefer synthetic, highly controlled indoor environments.", traits: {Logical_Mathematical: 2}}, {text: "Nature inspires my creative and spatial structures.", traits: {Spatial_Visualization: 2, Naturalist: 2}} ] },
    { q: "If you have completely failed a major task, how do you process it?", options: [ {text: "Analyze the mathematical probability of what went wrong.", traits: {Logical_Mathematical: 3}}, {text: "Internalize the failure and deeply analyze my own mental states.", traits: {Intrapersonal: 4}}, {text: "Talk it through with close colleagues for external perspective.", traits: {Interpersonal: 3}} ] },
    { q: "When navigating a completely new city, you rely on...", options: [ {text: "Reading street names and asking locals for verbal directions.", traits: {Linguistic: 2, Interpersonal: 2}}, {text: "Building an internal map based on landmarks and shapes.", traits: {Spatial_Visualization: 4}}, {text: "Using a grid coordinate system or GPS logic.", traits: {Logical_Mathematical: 3}} ] },
    { q: "What is your core motivator at work?", options: [ {text: "Building perfect, frictionless systems.", traits: {Logical_Mathematical: 3}}, {text: "Ensuring harmony and growth in my peers.", traits: {Interpersonal: 4}}, {text: "Achieving deep mastery of my own potential.", traits: {Intrapersonal: 4}} ] },
    { q: "When receiving a reward, you prefer:", options: [ {text: "Public acknowledgment and team celebrations.", traits: {Interpersonal: 3}}, {text: "Quiet, private bonuses supporting my autonomy.", traits: {Intrapersonal: 3}}, {text: "A promotion into a structurally higher role.", traits: {Logical_Mathematical: 2}} ] },
    { q: "You discover you have a completely free afternoon. You'd most likely:", options: [ {text: "Read a book or write in a journal.", traits: {Linguistic: 4}}, {text: "Go for a hike or explore outdoors.", traits: {Naturalist: 4, Bodily: 2}}, {text: "Work on a side project or solve a puzzle.", traits: {Logical_Mathematical: 3}} ] },
    { q: "How would colleagues describe you?", options: [ {text: "The quiet analyst who always finds the pattern.", traits: {Logical_Mathematical: 4, Intrapersonal: 2}}, {text: "The energetic connector who lifts team morale.", traits: {Interpersonal: 4, Linguistic: 2}}, {text: "The creative visionary who sees what others miss.", traits: {Spatial_Visualization: 4}} ] },
    { q: "When solving a creative challenge, you first:", options: [ {text: "Start sketching or mapping visual ideas.", traits: {Spatial_Visualization: 4}}, {text: "Talk through the challenge with someone you trust.", traits: {Interpersonal: 3, Linguistic: 2}}, {text: "Retreat and research systematically.", traits: {Intrapersonal: 3, Logical_Mathematical: 2}} ] },
    { q: "Which of these would you call your natural gift?", options: [ {text: "Telling stories that make complex things simple.", traits: {Linguistic: 5}}, {text: "Seeing structural flaws others always miss.", traits: {Logical_Mathematical: 4}}, {text: "Feeling the rhythm in everything around me.", traits: {Musical: 5}} ] },
    { q: "Your ideal weekend involves:", options: [ {text: "Attending a workshop or learning something new.", traits: {Linguistic: 2, Intrapersonal: 2}}, {text: "A long solo trail run through the wilderness.", traits: {Naturalist: 3, Bodily: 4}}, {text: "A city hackathon building something from scratch.", traits: {Logical_Mathematical: 3, Spatial_Visualization: 2}} ] },
    { q: "You find the most joy when:", options: [ {text: "Crafting the perfect sentence or argument.", traits: {Linguistic: 5}}, {text: "Cracking a complex math or coding problem.", traits: {Logical_Mathematical: 5}}, {text: "Guiding someone through a personal challenge.", traits: {Interpersonal: 5}} ] },
    { q: "When stressed, you cope by:", options: [ {text: "Exercising or physical movement.", traits: {Bodily: 4}}, {text: "Playing or listening to music.", traits: {Musical: 4}}, {text: "Stepping outside, walking, breathing fresh air.", traits: {Naturalist: 4}} ] },
    { q: "In your dream career, you would mostly be:", options: [ {text: "Analyzing large datasets and uncovering insights.", traits: {Logical_Mathematical: 4, Spatial_Visualization: 2}}, {text: "Leading teams and managing relationships.", traits: {Interpersonal: 5}}, {text: "Expressing ideas through words and storytelling.", traits: {Linguistic: 5}} ] },
    { q: "Your most common source of original ideas is:", options: [ {text: "Logical deduction from first principles.", traits: {Logical_Mathematical: 4}}, {text: "Observing people and social dynamics.", traits: {Interpersonal: 4}}, {text: "Being in nature or open spaces.", traits: {Naturalist: 4}} ] },
    { q: "Which statement describes you best?", options: [ {text: "I think in systems, rules, and cause-effect chains.", traits: {Logical_Mathematical: 5}}, {text: "I think in stories, metaphors, and narratives.", traits: {Linguistic: 5}}, {text: "I think in shapes, spaces, and visual layouts.", traits: {Spatial_Visualization: 5}} ] },
  ],

  decision: [
    { q: "Your team is running 2 weeks behind schedule. The client is furious. What is your immediate action?", options: [ {text: "Re-calculate exactly how many hours are needed and strip away low-value features.", traits: {Logical_Mathematical: 4, Intrapersonal: 1}}, {text: "Call an immediate crisis meeting to motivate the team and calm the client emotionally.", traits: {Interpersonal: 4, Linguistic: 2}}, {text: "Step in and physically do the hardest manual labor yourself to speed it up.", traits: {Bodily: 3, Spatial_Visualization: 1}} ] },
    { q: "You discover a critical flaw in your company's core product right before launch. No one else knows.", options: [ {text: "Write a detailed, articulate report explaining the flaw and present it to management.", traits: {Linguistic: 4, Interpersonal: 1}}, {text: "Halt the launch using your authority based on sheer logical risk-analysis.", traits: {Logical_Mathematical: 3, Intrapersonal: 2}}, {text: "Quietly orchestrate an internal team to patch it without causing panic.", traits: {Interpersonal: 3, Spatial_Visualization: 1}} ] },
    { q: "Two of your best employees refuse to work together due to a personal dispute. What do you do?", options: [ {text: "Sit them down together and mediate their psychological dispute heavily.", traits: {Interpersonal: 4, Intrapersonal: 2}}, {text: "Fire one or mathematically separate completely different workflows for them.", traits: {Logical_Mathematical: 3}}, {text: "Design a new spatial layout in the office so they rarely cross paths.", traits: {Spatial_Visualization: 3, Naturalist: 1}} ] },
    { q: "Your company demands you give a 1-hour presentation to 500 people tomorrow.", options: [ {text: "I write a stunning, perfectly articulated speech.", traits: {Linguistic: 4}}, {text: "I design an incredibly beautiful, visually complex slide deck.", traits: {Spatial_Visualization: 4}}, {text: "I walk on stage and wing it, using my physical presence and crowd interaction.", traits: {Bodily: 3, Interpersonal: 3}} ] },
    { q: "The whole office internet goes down for the day.", options: [ {text: "Suggest everyone moves to a local park to do team-building.", traits: {Naturalist: 4, Interpersonal: 2}}, {text: "Use the time alone to do deep, offline thinking.", traits: {Intrapersonal: 4}}, {text: "Use physical whiteboards to map out complex architecture offline.", traits: {Spatial_Visualization: 3, Bodily: 2}} ] },
    { q: "A competitor releases a product twice as good as yours.", options: [ {text: "Rally your team and boost morale via speeches.", traits: {Interpersonal: 3, Linguistic: 2}}, {text: "Lock yourself in a room and redesign your architecture logically.", traits: {Logical_Mathematical: 4, Intrapersonal: 2}} ] },
    { q: "You are asked to mentor a junior team member who is struggling.", options: [ {text: "Create a structured learning plan with clear milestones.", traits: {Logical_Mathematical: 3, Intrapersonal: 1}}, {text: "Meet regularly, listen deeply, and guide emotionally.", traits: {Interpersonal: 5}}, {text: "Share books and written resources to accelerate their learning.", traits: {Linguistic: 3}} ] },
    { q: "You're given a 6-month solo mission in a remote location.", options: [ {text: "I'd organize every hour with precision to maximize output.", traits: {Logical_Mathematical: 4, Intrapersonal: 3}}, {text: "I'd focus on observing the natural environment around me.", traits: {Naturalist: 5}}, {text: "I'd keep myself going through music and rhythm.", traits: {Musical: 4}} ] },
    { q: "A client wants a feature your team knows would hurt the product long-term.", options: [ {text: "Present data showing why their request is technically unsound.", traits: {Logical_Mathematical: 4}}, {text: "Negotiate diplomatically using empathy and compromise.", traits: {Interpersonal: 4, Linguistic: 2}}, {text: "Draw an alternative visual prototype to redirect them.", traits: {Spatial_Visualization: 4}} ] },
    { q: "During a high-pressure product demo, the system crashes. You:", options: [ {text: "Stay calm, improvise a manual walkthrough using clear verbal cues.", traits: {Linguistic: 4, Intrapersonal: 2}}, {text: "Quickly debug the system with systematic logical isolation.", traits: {Logical_Mathematical: 5}}, {text: "Engage the audience and turn it into a collaborative live session.", traits: {Interpersonal: 4}} ] },
    { q: "You're building a new team from scratch. Your first priority is:", options: [ {text: "Defining clear roles, responsibilities, and logical workflows.", traits: {Logical_Mathematical: 4}}, {text: "Establishing a high-trust, emotionally safe culture.", traits: {Interpersonal: 5}}, {text: "Setting up a powerful visual workspace and environment.", traits: {Spatial_Visualization: 3}} ] },
    { q: "You need to learn a complex new skill in 30 days. You:", options: [ {text: "Follow a structured, step-by-step curriculum rigorously.", traits: {Logical_Mathematical: 4, Intrapersonal: 2}}, {text: "Find a mentor and absorb through conversation and observation.", traits: {Interpersonal: 4, Linguistic: 2}}, {text: "Build something physical to apply the skill immediately.", traits: {Bodily: 4}} ] },
    { q: "When faced with an ethical dilemma at work, you:", options: [ {text: "Apply your internal moral framework and hold your ground quietly.", traits: {Intrapersonal: 5}}, {text: "Discuss with the team to reach a collective consensus.", traits: {Interpersonal: 4}}, {text: "Research ethical frameworks to inform your decision analytically.", traits: {Logical_Mathematical: 3, Linguistic: 2}} ] },
    { q: "What's your approach to managing a large, complex project?", options: [ {text: "Build a detailed GANTT chart with every dependency mapped.", traits: {Logical_Mathematical: 5}}, {text: "Hold daily stand-ups and maintain tight human alignment.", traits: {Interpersonal: 4}}, {text: "Create spatial mind maps and visual progress boards.", traits: {Spatial_Visualization: 4}} ] },
    { q: "You accidentally make a public mistake. You:", options: [ {text: "Analyze the root cause privately and create a fix before announcing.", traits: {Intrapersonal: 3, Logical_Mathematical: 3}}, {text: "Apologize transparently and address the team directly.", traits: {Interpersonal: 4, Linguistic: 3}}, {text: "Write a clear post-mortem document that others can learn from.", traits: {Linguistic: 5}} ] },
    { q: "You're stuck between two equally valid options. You:", options: [ {text: "Build a scoring matrix and let logic decide.", traits: {Logical_Mathematical: 5}}, {text: "Consult trusted peers and internalize their perspectives.", traits: {Interpersonal: 3, Intrapersonal: 2}}, {text: "Sleep on it and follow your gut feeling the next morning.", traits: {Intrapersonal: 4}} ] },
    { q: "A core product metric drops 30% suddenly. Your first step is:", options: [ {text: "Segment the data and isolate the root cause statistically.", traits: {Logical_Mathematical: 5}}, {text: "Interview users to understand the human behavioral shift.", traits: {Interpersonal: 4, Linguistic: 2}}, {text: "Rapidly prototype a fix and test it visually.", traits: {Spatial_Visualization: 3, Bodily: 2}} ] },
    { q: "You're asked to reduce budget by 20% without cutting staff. You:", options: [ {text: "Run a systematic cost-benefit analysis on every line item.", traits: {Logical_Mathematical: 5}}, {text: "Get team buy-in and crowdsource ideas from all levels.", traits: {Interpersonal: 4}}, {text: "Identify process inefficiencies through spatial mapping.", traits: {Spatial_Visualization: 3}} ] },
    { q: "Your most important decision-making tool is:", options: [ {text: "Hard data and probabilistic models.", traits: {Logical_Mathematical: 5}}, {text: "Emotional intelligence and social intuition.", traits: {Interpersonal: 5}}, {text: "Deep personal reflection and inner clarity.", traits: {Intrapersonal: 5}} ] },
    { q: "When onboarding a new team member, you:", options: [ {text: "Give them a structured doc with all processes mapped cleanly.", traits: {Logical_Mathematical: 3, Linguistic: 2}}, {text: "Personally spend time with them to ensure they feel welcome.", traits: {Interpersonal: 5}}, {text: "Assign a hands-on build task to get them learning fast.", traits: {Bodily: 3, Spatial_Visualization: 2}} ] },
  ],

  aptitude: [
    { q: "A sequence: 2, 4, 8, 16... What comes next?", options: [ {text: "32", traits: {Logical_Mathematical: 5}}, {text: "24", traits: {Logical_Mathematical: 1}}, {text: "20", traits: {Logical_Mathematical: 0}} ] },
    { q: "You have a map of a building. You're asked to estimate the fastest exit route during a fire. You:", options: [ {text: "Trace each path mathematically for shortest distance.", traits: {Logical_Mathematical: 4}}, {text: "Visualize the spatial layout and instinctively pick the route.", traits: {Spatial_Visualization: 5}}, {text: "Shout to guide others and create a group exit plan.", traits: {Interpersonal: 3}} ] },
    { q: "Which word does NOT belong: Piano, Guitar, Drum, Flute, Hammer?", options: [ {text: "Hammer", traits: {Logical_Mathematical: 3, Musical: 2}}, {text: "Drum", traits: {Logical_Mathematical: 1}}, {text: "Piano", traits: {Logical_Mathematical: 0}} ] },
    { q: "If south becomes north and west becomes east, which direction is 'left' when facing south?", options: [ {text: "East", traits: {Spatial_Visualization: 5, Logical_Mathematical: 3}}, {text: "West", traits: {Spatial_Visualization: 1}}, {text: "North", traits: {Spatial_Visualization: 0}} ] },
    { q: "You're given a 1000-piece jigsaw puzzle. Your approach is:", options: [ {text: "Sort by color and edge pieces first, then work inward logically.", traits: {Logical_Mathematical: 4}}, {text: "Visualize chunks of the picture and connect spatially.", traits: {Spatial_Visualization: 5}}, {text: "Work on it with others while chatting — more fun together.", traits: {Interpersonal: 3}} ] },
    { q: "Which analogy fits best? Book is to Reading as Music is to:", options: [ {text: "Listening", traits: {Musical: 5, Logical_Mathematical: 2}}, {text: "Watching", traits: {Logical_Mathematical: 0}}, {text: "Learning", traits: {Linguistic: 2}} ] },
    { q: "You need to fold a paper shape into a cube without instructions. You:", options: [ {text: "Mentally rotate and visualize the net structure first.", traits: {Spatial_Visualization: 5}}, {text: "Experiment by folding and checking each step physically.", traits: {Bodily: 4}}, {text: "Search for the pattern by finding symmetry.", traits: {Logical_Mathematical: 3}} ] },
    { q: "A scientist collects data for 6 months but the results are inconclusive. They should:", options: [ {text: "Re-examine variables systematically and redesign the experiment.", traits: {Logical_Mathematical: 5}}, {text: "Go back to the field to observe raw phenomena again.", traits: {Naturalist: 4}}, {text: "Consult peers at a research conference.", traits: {Interpersonal: 3}} ] },
    { q: "What is 15% of 280?", options: [ {text: "42", traits: {Logical_Mathematical: 5}}, {text: "38", traits: {Logical_Mathematical: 1}}, {text: "56", traits: {Logical_Mathematical: 0}} ] },
    { q: "Three engineers design a bridge. One focuses on load math, one on aesthetics, one on materials science. Who ensures it doesn't collapse?", options: [ {text: "The load math engineer — compression and tension are structural.", traits: {Logical_Mathematical: 5}}, {text: "All three must collaborate — no single view is sufficient.", traits: {Interpersonal: 4}}, {text: "The materials scientist — without the right components, math fails.", traits: {Naturalist: 3}} ] },
    { q: "You are listening to a complex symphony. You notice:", options: [ {text: "The mathematical progression of chord changes.", traits: {Musical: 4, Logical_Mathematical: 3}}, {text: "The emotion and story the melody tells.", traits: {Musical: 5, Intrapersonal: 2}}, {text: "The physical vibrations and rhythm in your body.", traits: {Bodily: 3, Musical: 3}} ] },
    { q: "You are decoding an unknown language. Your strategy:", options: [ {text: "Find structural grammar rules and pattern-match symbols.", traits: {Logical_Mathematical: 4, Linguistic: 3}}, {text: "Look for emotional or contextual clues in the text.", traits: {Linguistic: 4, Intrapersonal: 2}}, {text: "Visualize the symbols as pictographic meaning.", traits: {Spatial_Visualization: 4}} ] },
    { q: "Three boxes: Red, Blue, Green. Red has a ball. Blue is empty. Green has a cube. If you swap Red and Green, what is in Blue?", options: [ {text: "Still nothing — Blue was never swapped.", traits: {Logical_Mathematical: 5}}, {text: "The ball moved into Blue.", traits: {Logical_Mathematical: 0}}, {text: "A cube.", traits: {Logical_Mathematical: 1}} ] },
    { q: "You're tasked to improve soil health on a farm. Your first step:", options: [ {text: "Analyze soil pH, nitrogen levels, and microbial data.", traits: {Logical_Mathematical: 4, Naturalist: 3}}, {text: "Observe the existing plant growth patterns and local biology.", traits: {Naturalist: 5}}, {text: "Interview local farmers about historical yields.", traits: {Linguistic: 3, Interpersonal: 3}} ] },
    { q: "A melody has 8 notes. If each note doubles in duration, the total length:", options: [ {text: "Doubles.", traits: {Musical: 4, Logical_Mathematical: 3}}, {text: "Stays the same.", traits: {Logical_Mathematical: 0}}, {text: "Becomes 8x longer.", traits: {Logical_Mathematical: 1}} ] },
    { q: "What is the missing number: 1, 1, 2, 3, 5, 8, ?, 21?", options: [ {text: "13", traits: {Logical_Mathematical: 5}}, {text: "11", traits: {Logical_Mathematical: 1}}, {text: "10", traits: {Logical_Mathematical: 0}} ] },
    { q: "You're designing an app interface. Your priority is:", options: [ {text: "Clean spatial layout and intuitive visual flow.", traits: {Spatial_Visualization: 5}}, {text: "Logical user-journey mapping with minimal steps.", traits: {Logical_Mathematical: 4}}, {text: "Rich, accessible copy and content labels.", traits: {Linguistic: 4}} ] },
    { q: "A wildlife researcher spends 6 hours silently observing animal behavior. This requires:", options: [ {text: "Deep personal focus and patience.", traits: {Intrapersonal: 4, Naturalist: 3}}, {text: "Systematic logging and pattern recognition.", traits: {Logical_Mathematical: 3, Naturalist: 3}}, {text: "Physical endurance and environmental presence.", traits: {Bodily: 4, Naturalist: 2}} ] },
    { q: "Which task would you complete fastest?", options: [ {text: "Writing a 1000-word technical report.", traits: {Linguistic: 5}}, {text: "Building a working prototype with your hands.", traits: {Bodily: 5}}, {text: "Debugging 200 lines of code.", traits: {Logical_Mathematical: 5}} ] },
    { q: "An AI model shows 95% accuracy but fails for a specific subset. You:", options: [ {text: "Isolate the failure subset and re-train with targeted data.", traits: {Logical_Mathematical: 5}}, {text: "Talk to end users to understand the real-world failure impact.", traits: {Interpersonal: 4}}, {text: "Visualize prediction heatmaps to inspect error distribution.", traits: {Spatial_Visualization: 4}} ] },
  ]
}

// ----------------------------
// MODULE CATALOG CONFIG
// ----------------------------
const MODULE_CATALOG = [
  {
    id: 'personality', title: 'Core Personality Index',
    desc: 'Mandatory 8-question evaluation mapping foundational traits.',
    category: 'personality', mandatory: true, icon: Brain,
    getQuestions: () => getRandomQuestions(questionPool.personality, 8)
  },
  {
    id: 'aptitude', title: 'Aptitude Assessment',
    desc: 'Optional 8-question cognitive aptitude test.',
    category: 'personality', mandatory: false, icon: Target,
    getQuestions: () => getRandomQuestions(questionPool.aptitude, 8)
  },
  {
    id: 'decision', title: 'Workplace Scenarios',
    desc: 'Mandatory 8-scenario set testing real-world reactions under pressure.',
    category: 'situational', mandatory: true, icon: ShieldCheck,
    getQuestions: () => getRandomQuestions(questionPool.decision, 8)
  },
  {
    id: 'crisis', title: 'Crisis Management',
    desc: 'Optional rapid-decision scenarios testing risk boundaries.',
    category: 'situational', mandatory: false, icon: Users,
    getQuestions: () => getRandomQuestions(questionPool.decision, 5)
  },
  { id: 'reaction', title: 'Reaction Speed', desc: 'Test motor reflexes and neural processing.',          category: 'game', mandatory: false, icon: Zap,         component: ReactionGame,  maxTraits: {Bodily: 5, Spatial_Visualization: 2} },
  { id: 'pattern',  title: 'Pattern Master',  desc: 'Visual cognitive indexing and pattern matching.',    category: 'game', mandatory: false, icon: Activity,    component: PatternGame,   maxTraits: {Logical_Mathematical: 5, Spatial_Visualization: 4} },
  { id: 'memory',   title: 'Memory Matrix',   desc: 'Recall sequences and spatial memory under load.',    category: 'game', mandatory: false, icon: BrainCircuit, component: MemoryGame,    maxTraits: {Intrapersonal: 5, Logical_Mathematical: 3} },
]

// Precompute maxTraits for quiz modules (once on load)
MODULE_CATALOG.forEach(mod => {
  if (mod.getQuestions && !mod.maxTraits) {
    // Use a full pool sample to compute stable max bounds
    const sampleAll = questionPool[mod.id] || questionPool.personality
    mod.maxTraits = computeMaxTraits(sampleAll)
  }
})

// ----------------------------
// MAIN COMPONENT
// ----------------------------
export default function ProfileBuilder({ profile, setProfile, onSubmit, gainXp }) {
  const [phase, setPhase] = useState('BASIC')
  const [isProcessing, setIsProcessing] = useState(false)
  const [xpPopup, setXpPopup] = useState(null)
  const [basicInfo, setBasicInfo] = useState({ name: '', interests: '', country: 'India' })

  const [selectedModules, setSelectedModules] = useState(() =>
    MODULE_CATALOG.filter(m => m.mandatory).map(m => m.id)
  )
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [traitsLog, setTraitsLog] = useState([])

  // Resolved (randomized) questions for each module in this session
  const [resolvedModules, setResolvedModules] = useState({})

  const triggerXp = (amount, reason) => {
    gainXp(amount)
    setXpPopup({ amount, reason })
    setTimeout(() => setXpPopup(null), 2000)
  }

  const toggleModule = (id) => {
    const mod = MODULE_CATALOG.find(m => m.id === id)
    if (!mod || mod.mandatory) return
    if (selectedModules.includes(id)) {
      setSelectedModules(prev => prev.filter(mid => mid !== id))
    } else {
      if (selectedModules.length < 6) {
        setSelectedModules(prev => [...prev, id])
        triggerXp(1, "Module Attached")
      }
    }
  }

  const startAssessment = () => {
    // Resolve random questions for each selected module NOW (once per session)
    const resolved = {}
    selectedModules.forEach(mid => {
      const mod = MODULE_CATALOG.find(m => m.id === mid)
      if (mod && mod.getQuestions) {
        resolved[mid] = mod.getQuestions()
      }
    })
    setResolvedModules(resolved)
    setPhase('PLAYING')
    triggerXp(20, "Initiating Architecture")
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
      const possibleMax = Object.fromEntries(TRAIT_KEYS.map(k => [k, 0]))
      const appearances = Object.fromEntries(TRAIT_KEYS.map(k => [k, 0]))

      selectedModules.forEach(mid => {
        const def = MODULE_CATALOG.find(m => m.id === mid)
        if (def && def.maxTraits) {
          Object.entries(def.maxTraits).forEach(([t, v]) => {
            if (v > 0) { possibleMax[t] += v; appearances[t] += 1 }
          })
        }
      })

      const actualScore = Object.fromEntries(TRAIT_KEYS.map(k => [k, 0]))
      traitsLog.forEach(log => {
        Object.entries(log).forEach(([t, v]) => { if (actualScore[t] !== undefined) actualScore[t] += v })
      })

      const finalTraits = {}
      const finalConfidence = {}
      TRAIT_KEYS.forEach(trait => {
        finalTraits[trait] = possibleMax[trait] > 0
          ? Math.max(3, Math.round((actualScore[trait] / possibleMax[trait]) * 10))
          : 5
        const tested = appearances[trait]
        finalConfidence[trait] = tested === 0 ? 0.4 : tested === 1 ? 0.55 : tested === 2 ? 0.75 : 0.95
      })

      const newProfile = {
        ...profile,
        traits: finalTraits,
        traitConfidence: finalConfidence,
        skills: basicInfo.interests
          ? basicInfo.interests.split(',').map(s => s.trim()).filter(Boolean)
          : ["Communication", "Strategy"],
        targetCountry: basicInfo.country || "India"
      }

      setProfile(newProfile)
      setIsProcessing(false)
      onSubmit(newProfile)
    }, 2000)
  }

  const selCategories = selectedModules.map(mid => MODULE_CATALOG.find(m => m.id === mid)?.category)
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
              <input type="text" value={basicInfo.name} onChange={e => setBasicInfo({...basicInfo, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Sarthak" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Key Core Skills (Comma Separated)</label>
              <input type="text" value={basicInfo.interests} onChange={e => setBasicInfo({...basicInfo, interests: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Python, UI Design, Negotiation" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select Your Target Country</label>
              <select value={basicInfo.country} onChange={e => setBasicInfo({...basicInfo, country: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer">
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
          </div>
          <button onClick={() => { triggerXp(10, 'Onboarded'); setPhase('CATALOG') }} disabled={!basicInfo.name} className="mt-8 flex w-full justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all">
            Continue <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* PHASE 2: MODULE CATALOG */}
      {phase === 'CATALOG' && (
        <div className="animate-in slide-in-from-bottom-4">
          <div className="flex flex-col md:flex-row justify-between items-center bg-[#111115] border border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight mb-2">Construct Your Assessment</h2>
              <p className="text-slate-400 max-w-xl">Mandatory foundational modules are locked. Select at least 1 Cognitive Game to proceed. Questions randomize every session — no two assessments are the same!</p>
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
                      {mod.getQuestions && (
                        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">🎲 AI Insight: Randomized per session</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="flex justify-end sticky bottom-6 z-30">
            <button
              onClick={startAssessment}
              disabled={selectedModules.length < 3 || !hasGame}
              className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-2xl shadow-emerald-500/20"
            >
              {hasGame ? 'Begin Assessment' : 'Please select a Game'} <ArrowRight size={20} />
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
            <div className="text-right">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Overall Progress</p>
              <p className="text-sm font-bold text-indigo-400">{currentModuleIndex + 1} of {selectedModules.length}</p>
            </div>
          </div>

          {(() => {
            if (currentModuleIndex >= selectedModules.length) return null
            const mid = selectedModules[currentModuleIndex]
            const modDef = MODULE_CATALOG.find(m => m.id === mid)
            if (!modDef) return <div className="text-white text-center p-8">Module not found.</div>

            if (modDef.component) {
              const ActiveGame = modDef.component
              return <ActiveGame key={`mod-${mid}`} onComplete={handleModuleComplete} />
            } else if (modDef.getQuestions) {
              const questions = resolvedModules[mid] || modDef.getQuestions()
              return (
                <MultiStepQuiz
                  key={`mod-${mid}`}
                  data={{ title: modDef.title, questions }}
                  onComplete={handleModuleComplete}
                />
              )
            }
          })()}

          <div className="flex justify-center mt-10">
            <p className="text-xs text-slate-500 font-semibold italic bg-slate-900 px-4 py-2 rounded-full shadow-inner border border-slate-800">
              "Multi-module correlation tracking active — questions unique to this session."
            </p>
          </div>
        </div>
      )}

      {/* PHASE 4: DONE */}
      {phase === 'DONE' && (
        <div className="bg-[#111115] border border-slate-800 rounded-3xl p-12 text-center max-w-3xl mx-auto flex flex-col items-center shadow-2xl animate-in zoom-in">
          <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 border-dashed relative">
            <CheckCircle2 size={40} className="text-emerald-400" />
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
