import { useState } from 'react'
import { getRecommendations } from '../lib/careerEngine'

const COUNSELORS = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialization: 'Technology & STEM Careers',
    experience: '12 years',
    rating: 4.9,
    slots: ['Mon 10:00 AM', 'Wed 2:00 PM', 'Fri 11:00 AM'],
    avatar: 'PS',
    domains: ['Data Science', 'Software Engineering', 'AI/ML'],
  },
  {
    id: 2,
    name: 'Mr. Arjun Mehta',
    specialization: 'Creative & Design Careers',
    experience: '8 years',
    rating: 4.7,
    slots: ['Tue 11:00 AM', 'Thu 3:00 PM', 'Sat 10:00 AM'],
    avatar: 'AM',
    domains: ['UX Design', 'Digital Arts', 'Media'],
  },
  {
    id: 3,
    name: 'Dr. Lakshmi Nair',
    specialization: 'Social Sciences & Education',
    experience: '15 years',
    rating: 4.8,
    slots: ['Mon 2:00 PM', 'Wed 11:00 AM', 'Fri 4:00 PM'],
    avatar: 'LN',
    domains: ['Psychology', 'Teaching', 'Counseling'],
  },
  {
    id: 4,
    name: 'Mr. Rahul Gupta',
    specialization: 'Environment & Natural Sciences',
    experience: '10 years',
    rating: 4.6,
    slots: ['Tue 9:00 AM', 'Thu 1:00 PM', 'Sat 2:00 PM'],
    avatar: 'RG',
    domains: ['Environmental Science', 'Sustainability', 'Biology'],
  },
]

function RatingStars({ rating }) {
  const full = Math.floor(rating)
  return (
    <span className="flex items-center gap-1 text-amber-400 text-xs">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      <span className="text-slate-400 ml-1">{rating}</span>
    </span>
  )
}

export default function Counselor({ profile }) {
  const { top, confidence, confidenceMsg } = getRecommendations(profile)
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booked, setBooked] = useState(false)

  const aiSummary = `Student profile: Strong in ${
    Object.entries(profile.traits).sort(([,a],[,b]) => b-a).slice(0,2).map(([t]) => t.replace('_', ' ')).join(' & ')
  }. AI recommends ${top.title} with ${confidence} confidence. ${confidenceMsg} Skills present: ${
    profile.skills.length > 0 ? profile.skills.join(', ') : 'Not specified'
  }. Suggested discussion: skill development path and career transition roadmap.`

  const handleBook = (counselor) => {
    setSelectedCounselor(counselor)
    setSelectedSlot(null)
    setBooked(false)
  }

  const confirmBooking = () => {
    if (selectedSlot) setBooked(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold text-white">Human-in-the-Loop Counseling</h2>
          <p className="text-slate-400 text-sm mt-0.5">Connect with a career counselor for personalised guidance</p>
        </div>
      </div>

      {/* AI Summary Card */}
      <div className="bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-indigo-800/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-indigo-400">🤖</span>
          <h3 className="text-base font-semibold text-white">AI-Generated Session Brief</h3>
          <span className="ml-auto text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">Shared with counselor before session</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{aiSummary}</p>
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="text-xs bg-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700">Career: {top.title}</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">Confidence: {confidence}</span>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">Skills: {profile.skills.length}</span>
        </div>
      </div>

      {/* Counselor List */}
      <h3 className="text-base font-semibold text-slate-300">Available Counselors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COUNSELORS.map((c) => (
          <div
            key={c.id}
            className={`bg-slate-900 border rounded-xl p-5 ${
              selectedCounselor?.id === c.id ? 'border-indigo-600 ring-1 ring-indigo-600/30' : 'border-slate-700'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm">{c.name}</h4>
                <p className="text-xs text-indigo-400 mb-1">{c.specialization}</p>
                <RatingStars rating={c.rating} />
                <p className="text-xs text-slate-500 mt-1">{c.experience} experience</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.domains.map((d) => (
                    <span key={d} className="text-xs bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{d}</span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleBook(c)}
              className={`mt-4 w-full text-sm font-medium py-2 rounded-lg border ${
                selectedCounselor?.id === c.id
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-indigo-600 hover:text-white'
              }`}
            >
              {selectedCounselor?.id === c.id ? '✓ Selected' : 'Book Session'}
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal / Panel */}
      {selectedCounselor && !booked && (
        <div className="bg-slate-900 border border-indigo-700 rounded-xl p-6">
          <h3 className="text-base font-semibold text-white mb-1">Book Session with {selectedCounselor.name}</h3>
          <p className="text-sm text-slate-400 mb-4">Select an available time slot</p>
          <div className="flex flex-wrap gap-3 mb-5">
            {selectedCounselor.slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  selectedSlot === slot
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-indigo-500'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* AI Summary preview before confirm */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
            <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wider">AI Brief (sent to counselor)</p>
            <p className="text-xs text-slate-400 leading-relaxed">{aiSummary}</p>
          </div>

          <button
            onClick={confirmBooking}
            disabled={!selectedSlot}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-lg"
          >
            Confirm Booking {selectedSlot && `· ${selectedSlot}`}
          </button>
        </div>
      )}

      {/* Booking Confirmation */}
      {booked && (
        <div className="bg-emerald-950/40 border border-emerald-700 rounded-xl p-6 flex items-start gap-4">
          <span className="text-emerald-400 text-2xl">✅</span>
          <div>
            <h3 className="text-base font-semibold text-white mb-1">Session Booked Successfully!</h3>
            <p className="text-sm text-slate-300">
              Your session with <span className="text-indigo-400 font-medium">{selectedCounselor.name}</span> is confirmed for{' '}
              <span className="text-emerald-400 font-medium">{selectedSlot}</span>.
            </p>
            <p className="text-xs text-slate-500 mt-2">The AI session brief has been shared with the counselor in advance.</p>
          </div>
        </div>
      )}
    </div>
  )
}
