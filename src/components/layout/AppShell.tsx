import { NavLink, Outlet } from "react-router-dom";
import { DATA_SCENARIOS, NAV_LINKS } from "../../config/app";
import { useDataScenario } from "../../state/DataScenarioContext";
import type { DataScenario } from "../../types/music";

function linkClassName(isActive: boolean): string {
  return isActive
    ? "rounded-lg px-3 py-2 text-sm font-medium bg-emerald-400 text-slate-950"
    : "rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 transition";
}

export default function AppShell() {
  const { scenario, setScenario } = useDataScenario();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-8 md:px-8">
      <header className="mb-8 rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-5 shadow-glow backdrop-blur">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Spotify Taste Chronicle</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">SoundLedger</h1>
            <p className="mt-1 text-sm text-slate-300">A living snapshot of your listening identity.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <nav className="flex gap-2 rounded-xl bg-slate-800/90 p-1" aria-label="Primary navigation">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => linkClassName(isActive)}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <label className="flex items-center gap-2 text-xs text-slate-300">
              Data mode
              <select
                value={scenario}
                onChange={(event) => setScenario(event.target.value as DataScenario)}
                className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100 focus:border-emerald-400 focus:outline-none"
                aria-label="Data mode"
              >
                {DATA_SCENARIOS.map((entry) => (
                  <option key={entry.value} value={entry.value}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
