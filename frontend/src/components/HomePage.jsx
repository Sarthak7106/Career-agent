const FEATURES = [
  {
    icon: '🧠',
    title: 'Psychometric Analysis',
    desc: 'Evaluate 8 cognitive dimensions from Gardner\'s Multiple Intelligence Framework via interactive sliders.',
  },
  {
    icon: '🤖',
    title: 'AI Career Recommendation',
    desc: 'Trait-weighted scoring engine surfaces the best-fit career from a curated database of 8 domains.',
  },
  {
    icon: '🔍',
    title: 'Skill Gap Detection',
    desc: 'Compare your current skills against role requirements and get a readiness percentage score.',
  },
  {
    icon: '🗺️',
    title: 'Career Roadmap',
    desc: 'Receive a personalised step-by-step roadmap across Beginner, Intermediate, and Advanced levels.',
  },
  {
    icon: '⚡',
    title: 'What-If Simulation',
    desc: 'Simulate trait improvements and see how your career recommendation shifts in real time.',
  },
  {
    icon: '👩‍💼',
    title: 'Human Counselor Support',
    desc: 'Book a session with a domain expert. AI prepares a session brief automatically.',
  },
]

const PIPELINE = ['Profile', 'Recommendation', 'Skill Gap', 'Roadmap', 'What-If', 'Counselor']

export default function HomePage({ onStartAssessment, onLoginClick }) {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-950/70 border border-indigo-800 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          Agentic AI · Psychometrics · Human Validation
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
          AI Career Mentor
        </h1>
        <p className="text-xl text-indigo-300 font-medium mb-4">
          AI + Human Intelligence Driven Career Guidance System
        </p>
        <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed mb-10">
          From self-discovery to career clarity using AI, psychometric insights, and expert validation
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onStartAssessment}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm"
          >
            Start Assessment →
          </button>
          <button
            onClick={scrollToFeatures}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-medium px-6 py-2.5 rounded-lg text-sm"
          >
            Explore Features
          </button>
          <button
            onClick={onLoginClick}
            className="border border-indigo-600 text-indigo-400 hover:bg-indigo-950/50 font-medium px-6 py-2.5 rounded-lg text-sm"
          >
            Login
          </button>
        </div>
      </section>

      {/* ── Pipeline Banner ── */}
      <section className="bg-slate-900 border-y border-slate-800 px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-slate-500 text-center mb-4 uppercase tracking-widest font-semibold">
            End-to-End Guidance Pipeline
          </p>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {PIPELINE.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {step}
                </span>
                {i < PIPELINE.length - 1 && (
                  <span className="text-slate-600 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Everything You Need</h2>
          <p className="text-slate-400 text-sm">Six intelligent modules working together as a unified pipeline</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-indigo-700"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartAssessment}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg text-sm"
          >
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="bg-slate-900 border-t border-slate-800 px-6 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '8', label: 'Career Domains' },
            { value: '8', label: 'Cognitive Traits' },
            { value: '3', label: 'Roadmap Levels' },
            { value: '4', label: 'Expert Counselors' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-indigo-400">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">
              AI
            </div>
            <span className="text-sm font-medium text-slate-300">AI Career Mentor</span>
          </div>
          <p className="text-xs text-slate-500">
            Agentic AI Career Decision Support System · Demo Build
          </p>
        </div>
      </footer>
    </div>
  )
}
