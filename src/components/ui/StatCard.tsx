interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
}

export default function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <article className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-4 transition hover:border-slate-500/80">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {helper ? <p className="mt-1 text-xs text-slate-400">{helper}</p> : null}
    </article>
  );
}
