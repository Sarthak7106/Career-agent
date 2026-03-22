export default function Navbar({ page, setPage, onLoginClick }) {
  return (
    <nav className="bg-slate-900 border-b border-slate-700 px-6 py-3 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            AI
          </div>
          <span className="text-white font-semibold text-sm tracking-tight hidden sm:block">
            AI Career Mentor
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-1 ml-6">
          <button
            onClick={() => setPage('home')}
            className={`px-3 py-1.5 rounded text-sm font-medium ${
              page === 'home'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setPage('dashboard')}
            className={`px-3 py-1.5 rounded text-sm font-medium ${
              page === 'dashboard'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Right: Login */}
        <div className="ml-auto">
          <button
            onClick={onLoginClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}
