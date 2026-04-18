import { History as HistoryIcon, ArrowRight, TrendingUp } from 'lucide-react'

export default function HistoryTab({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center text-slate-700 mb-6 border border-slate-800">
          <HistoryIcon size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-300 mb-2">No History Yet</h3>
        <p className="text-slate-500 max-w-sm">Complete your first psychometric analysis to see your past recommendations and track your progress over time.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
          <HistoryIcon size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Analysis History</h2>
          <p className="text-slate-400 text-sm">Review your past career matches and track changes in your traits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {history.map((item, index) => (
          <div 
            key={item.id} 
            className="group relative bg-[#111115] border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/30 hover:bg-[#15151A] transition-all duration-300 overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
             
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
               
               <div className="flex items-center gap-6">
                 <div className="text-center bg-slate-900 border border-slate-800 rounded-xl p-3 min-w-[80px]">
                   <span className="block text-2xl font-black text-indigo-400 leading-none mb-1">{item.match_score}%</span>
                   <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Match</span>
                 </div>
                 
                 <div>
                   <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">{item.career}</h3>
                   <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                     <span>{item.date}</span>
                     <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                     <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-emerald-500" /> Top Trait: <strong className="text-slate-300">{item.topTrait}</strong></span>
                   </div>
                 </div>
               </div>

               <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg transition-colors">
                 View Details <ArrowRight size={16} />
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
