'use client';

const feeColors: Record<string, string> = {
  Paid: 'bg-teal-500/15 text-teal-400 border-teal-500/20',
  Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Overdue: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

export interface Student {
  id: string;
  name: string;
  class: string;
  roll: string;
  attendance: number;
  fee: 'Paid' | 'Pending' | 'Overdue';
  avatar: string;
}

interface Props {
  students: Student[];
  search: string;
  setSearch: (v: string) => void;
  title: string;
}

export default function StudentsTable({ students, search, setSearch, title }: Props) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-3 ml-auto">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search students..."
            className="bg-white/[0.05] border border-white/[0.08] rounded-xl pl-4 pr-4 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 w-48 transition-all"
          />
          <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-semibold text-white transition-colors">
            + Add Student
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.04]">
            {['Student', 'Class', 'Roll No.', 'Attendance', 'Fee Status', ''].map(h => (
              <th key={h} className="text-left text-[10px] text-white/25 font-semibold uppercase tracking-widest px-5 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr
              key={s.id}
              className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors last:border-0 ${
                i % 2 === 0 ? '' : 'bg-white/[0.01]'
              }`}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/40 to-violet-700/40 border border-violet-500/20 flex items-center justify-center text-violet-300 text-xs font-bold flex-shrink-0">
                    {s.avatar}
                  </div>
                  <span className="text-sm text-white/80 font-medium">{s.name}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-white/40">{s.class}</td>
              <td className="px-5 py-4 text-sm text-white/40 font-mono">{s.roll}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/[0.08] rounded-full overflow-hidden w-16">
                    <div
                      className={`h-full rounded-full ${
                        s.attendance >= 90 ? 'bg-teal-500' : s.attendance >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${s.attendance}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/40">{s.attendance}%</span>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${feeColors[s.fee]}`}>
                  {s.fee}
                </span>
              </td>
              <td className="px-5 py-4">
                <button className="text-white/20 hover:text-white/60 text-xs transition-colors">
                  View →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length === 0 && (
        <div className="py-12 text-center text-white/25 text-sm">No students found</div>
      )}
    </div>
  );
}