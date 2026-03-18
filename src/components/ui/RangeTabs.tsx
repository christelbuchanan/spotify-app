import { TIME_RANGE_LABELS } from "../../config/app";
import type { TimeRange } from "../../types/music";

export default function RangeTabs({
  value,
  onChange
}: {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}) {
  return (
    <div className="mb-4 inline-flex rounded-lg bg-slate-800 p-1">
      {(Object.keys(TIME_RANGE_LABELS) as TimeRange[]).map((range) => (
        <button
          key={range}
          type="button"
          onClick={() => onChange(range)}
          className={`rounded-md px-3 py-1.5 text-sm transition ${
            value === range ? "bg-emerald-400 text-slate-950" : "text-slate-200 hover:bg-slate-700"
          }`}
        >
          {TIME_RANGE_LABELS[range]}
        </button>
      ))}
    </div>
  );
}
