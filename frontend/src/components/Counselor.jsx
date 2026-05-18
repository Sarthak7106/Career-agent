import { useState } from 'react';
import { Star, Video, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

const counselors = [
  {
    id: 1,
    name: "Dr. Alok Sharma",
    expertise: "Career Guidance & Tech",
    rating: 4.8,
    mode: "Online",
    price: 999,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alok"
  },
  {
    id: 2,
    name: "Ms. Kavita Iyer",
    expertise: "Study Abroad (US/UK)",
    rating: 4.7,
    mode: "Offline",
    price: 1499,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita"
  },
  {
    id: 3,
    name: "Mr. Rohan Khan",
    expertise: "Startup & UX Design",
    rating: 4.6,
    mode: "Online",
    price: 799,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
  },
  {
    id: 4,
    name: "Dr. Neha Gupta",
    expertise: "Psychometric Profiling",
    rating: 4.9,
    mode: "Online",
    price: 1199,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha"
  }
];

export default function Counselor() {
  const [filter, setFilter] = useState('All');

  const filteredCounselors = counselors.filter(c => filter === 'All' || c.mode === filter);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 pb-12">
      
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-[#0B0B13] border border-slate-800 rounded-3xl p-10 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mt-20 -mr-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider mb-5">
              <ShieldCheck size={14} /> AI Verified Mentors
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Counselor <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Marketplace</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl">
              Connect with elite industry professionals and career strategists. Filter by format and book your 1-on-1 session instantly.
            </p>
          </div>
          
          {/* Glassmorphism Filter Panel */}
          <div className="w-full md:w-auto bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-2 rounded-2xl flex gap-2">
            {['All', 'Online', 'Offline'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`py-3 px-8 rounded-xl text-sm font-bold transition-all ${
                  filter === f 
                    ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCounselors.map((c) => (
          <div key={c.id} className="group relative bg-[#0f0f13] border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20">
             
             {/* Mode Badge - Absolute positioned */}
             <div className={`absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${
               c.mode === 'Online' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
             }`}>
               {c.mode === 'Online' ? <Video size={10} /> : <MapPin size={10} />}
               {c.mode}
             </div>

             <div className="bg-slate-900 rounded-[22px] p-6 h-full flex flex-col relative overflow-hidden">
                {/* Subtle background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-5">
                    <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-700 group-hover:border-indigo-400 transition-colors shadow-lg" />
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{c.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1 bg-slate-950/50 inline-flex px-2 py-0.5 rounded-md border border-slate-800">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-slate-300">{c.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Area of Expertise</p>
                    <p className="text-sm font-medium text-slate-300">{c.expertise}</p>
                  </div>

                  <div className="flex justify-between items-end mt-auto pt-6 border-t border-slate-800/60 mb-5">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Session Fee</p>
                      <p className="text-2xl font-black text-white">₹{c.price}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert("Session booked successfully!")}
                    className="w-full relative overflow-hidden group/btn bg-slate-800 hover:bg-indigo-600 text-white border border-slate-700 hover:border-indigo-500 rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                  >
                    <span>👉 Book Session</span>
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </button>
                </div>
             </div>
          </div>
        ))}

        {/* Empty State handling */}
        {filteredCounselors.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-900/50 border border-slate-800 rounded-3xl border-dashed">
            <p className="text-slate-400 text-lg">No counselors found matching this criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
}
