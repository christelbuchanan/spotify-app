interface StateNoticeProps {
  title: string;
  description: string;
  variant?: "loading" | "error" | "empty";
  actionLabel?: string;
  onAction?: () => void;
}

const variantStyles = {
  loading: {
    container: "border-sky-300/30 bg-sky-500/10",
    label: "Syncing"
  },
  error: {
    container: "border-rose-300/30 bg-rose-500/10",
    label: "Issue"
  },
  empty: {
    container: "border-slate-600/50 bg-slate-800/70",
    label: "Empty"
  }
} as const;

export default function StateNotice({
  title,
  description,
  variant = "empty",
  actionLabel,
  onAction
}: StateNoticeProps) {
  return (
    <section
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "loading" ? "polite" : "off"}
      className={`rounded-2xl border p-6 text-center ${variantStyles[variant].container}`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{variantStyles[variant].label}</p>
      <h2 className="mt-1 text-lg font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
