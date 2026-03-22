import { useState } from 'react'

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    alert('Authentication module coming soon')
  }

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleBackdrop}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Sign In</h2>
            <p className="text-xs text-slate-400 mt-0.5">AI Career Mentor Platform</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white w-7 h-7 flex items-center justify-center rounded hover:bg-slate-800 text-lg"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg text-sm mt-1"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-5">
          Don't have an account?{' '}
          <span className="text-indigo-400 cursor-default">Create account</span>
        </p>
      </div>
    </div>
  )
}
