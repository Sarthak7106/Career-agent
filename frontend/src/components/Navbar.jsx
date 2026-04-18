import { Home, LayoutDashboard, LogIn, Sparkles } from 'lucide-react'

export default function Navbar({ page, setPage, onLoginClick }) {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-indigo-500/20 px-6 py-3 sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => setPage('home')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-tight hidden sm:block bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
            AI Career Mentor
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-2 ml-6">
          <button
            onClick={() => setPage('home')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              page === 'home'
                ? 'bg-indigo-500/10 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button
            onClick={() => setPage('dashboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              page === 'dashboard'
                ? 'bg-indigo-500/10 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        </div>

        {/* Right: Login */}
        <div className="ml-auto">
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-indigo-500/10 hover:border-indigo-500/50"
          >
            <LogIn size={16} />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
