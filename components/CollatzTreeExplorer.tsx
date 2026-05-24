import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip as LineTooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Tooltip as BarTooltip
} from 'recharts';

function collatz(n: number): number[] {
  const seq = [n];
  while (n !== 1) {
    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
    seq.push(n);
  }
  return seq;
}

const CustomizedDot = (props: any) => {
  const { cx, cy, payload, index } = props;
  let fill = '#378ADD'; // seed
  if (payload.type === 'fruit') fill = '#F5A623';
  else if (payload.type === 'branch') fill = '#20B2AA';
  else if (payload.type === 'root') fill = '#FF6347';
  
  return <circle key={`dot-${index}`} cx={cx} cy={cy} r={index > 80 ? 2 : 4} fill={fill} stroke="none" />;
};

const CustomLineTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const typeStr = data.type === 'seed' ? 'seed' : (data.type === 'fruit' ? '★ fruit node' : (data.type === 'branch' ? '↑ branch (3n+1)' : '↓ root (n/2)'));
    return (
      <div className="bg-slate-900 border border-slate-700 p-2 rounded shadow-xl text-xs text-slate-300">
        <span className="font-bold text-white">{data.value}</span> — {typeStr}
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-2 rounded shadow-xl text-xs text-slate-300">
        <span className="font-bold text-white">{payload[0].value}</span> steps
      </div>
    );
  }
  return null;
};

export const CollatzTreeExplorer: React.FC = () => {
  const [seed, setSeed] = useState<number>(3);

  const { seq, lineData, barData, steps, peak, fruitIdx } = useMemo(() => {
    const seq = collatz(seed);
    const steps = seq.length - 1;
    const peak = Math.max(...seq);
    const fruitIdx = seq.indexOf(7);

    const lineData = seq.map((v, i) => {
      let type = i === 0 ? 'seed' : (v === 7 ? 'fruit' : (v > seq[i-1] ? 'branch' : 'root'));
      return { step: i, value: v, type };
    });

    const barData = [];
    for (let s = 1; s <= 114; s++) {
      barData.push({ seed: s, steps: collatz(s).length - 1 });
    }

    return { seq, lineData, barData, steps, peak, fruitIdx };
  }, [seed]);

  return (
    <div className="bg-slate-950/40 border border-teal-500/20 p-6 md:p-8 rounded-[2.5rem] mt-12 w-full font-sans">
      <h3 className="text-xl font-bold text-white mb-4">Collatz Integer Tree Explorer</h3>
      <p className="text-sm text-gray-400 mb-6 font-light">DCU Framework visualization of n/2 (root/compression) and 3n+1 (branch/expansion) operators converging to node 1</p>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <label className="text-sm text-gray-400 min-w-[56px] font-medium">Seed n</label>
        <input 
          type="range" 
          min="1" max="114" 
          value={seed} 
          onChange={(e) => setSeed(parseInt(e.target.value))}
          className="flex-1 min-w-[120px] accent-teal-500 hover:accent-teal-400 cursor-pointer"
        />
        <span className="text-lg font-medium text-white min-w-[28px]">{seed}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 shadow-inner">
          <div className="text-xs text-gray-400 mb-1 tracking-wider uppercase font-medium">Seed</div>
          <div className="text-xl font-bold text-white">{seed}</div>
        </div>
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 shadow-inner">
          <div className="text-xs text-gray-400 mb-1 tracking-wider uppercase font-medium">Steps to 1</div>
          <div className="text-xl font-bold text-white">{steps}</div>
        </div>
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 shadow-inner">
          <div className="text-xs text-gray-400 mb-1 tracking-wider uppercase font-medium">Peak value</div>
          <div className="text-xl font-bold text-white">{peak}</div>
        </div>
        <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 shadow-inner">
          <div className="text-xs text-gray-400 mb-1 tracking-wider uppercase font-medium">First fruit (7?)</div>
          <div className="text-xl font-bold text-white">{fruitIdx >= 0 ? `step ${fruitIdx}` : '—'}</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 text-xs text-gray-300 mb-6 font-medium">
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#378ADD] mr-2 shadow-[0_0_8px_rgba(55,138,221,0.5)]"></span>Seed / neutral</span>
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#20B2AA] mr-2 shadow-[0_0_8px_rgba(32,178,170,0.5)]"></span>Branch moment (3n+1) ↑</span>
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#FF6347] mr-2 shadow-[0_0_8px_rgba(255,99,71,0.5)]"></span>Root moment (n/2) ↓</span>
        <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] mr-2 shadow-[0_0_8px_rgba(245,166,35,0.5)]"></span>Node 7 — fruit</span>
      </div>

      {/* Sequence Display */}
      <div className="bg-black/40 p-4 rounded-xl border border-white/5 shadow-inner text-sm text-gray-400 leading-relaxed mb-8 break-all max-h-32 overflow-y-auto custom-scrollbar">
        {seq.map((v, i) => {
          let type = i === 0 ? 'n' : (v === 7 ? 'f' : (v > seq[i-1] ? 'b' : 'r'));
          let colorCls = type === 'n' ? 'text-[#378ADD]' : type === 'f' ? 'text-[#F5A623] text-base font-bold' : type === 'b' ? 'text-[#20B2AA]' : 'text-[#FF6347]';
          if (i > 60) {
            if (i === 61) return <span key={i} className="text-gray-500 font-mono text-xs"> … [{seq.length - i} more]</span>;
            return null;
          }
          return (
            <React.Fragment key={i}>
              {i > 0 && <span className="mx-1.5 text-gray-600/50">→</span>}
              <span className={`font-mono font-medium ${colorCls}`}>{v}</span>
            </React.Fragment>
          )
        })}
      </div>

      {/* Line Chart */}
      <div className="w-full h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <XAxis dataKey="step" stroke="#475569" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} />
            <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} />
            <LineTooltip content={<CustomLineTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#1e293b" 
              strokeWidth={1} 
              dot={<CustomizedDot />}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Depth Map */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="text-sm font-medium tracking-wide text-gray-400 mb-4 uppercase">Collatz tree depth map (all seeds 1–114)</div>
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis dataKey="seed" stroke="#475569" tick={{ fill: '#64748b', fontSize: 9, fontFamily: 'monospace' }} />
              <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} />
              <BarTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomBarTooltip />} />
              <Bar dataKey="steps" isAnimationActive={false}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.seed === seed ? '#F5A623' : '#0ea5e9'} className="transition-all duration-300" opacity={entry.seed === seed ? 1 : 0.4} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
