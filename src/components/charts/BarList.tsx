export interface BarDatum {
  label: string;
  value: number;
}

export default function BarList({
  data,
  valueLabel,
  max
}: {
  data: BarDatum[];
  valueLabel: (value: number) => string;
  max?: number;
}) {
  const localMax = max ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-3">
      {data.map((entry) => {
        const pct = (entry.value / localMax) * 100;
        return (
          <div key={entry.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-slate-200">{entry.label}</span>
              <span className="text-slate-400">{valueLabel(entry.value)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-[width] duration-500"
                style={{ width: `${Math.max(pct, 5)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
