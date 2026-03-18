import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6">
      <section className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Page not found</h1>
        <p className="mt-2 text-sm text-slate-300">That playlist does not exist in your chronicle.</p>
        <Link to="/dashboard" className="mt-5 inline-block rounded-lg bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-300">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
