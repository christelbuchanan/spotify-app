import { useMemo, useState } from "react";
import ArtistRow from "../components/music/ArtistRow";
import TrackRow from "../components/music/TrackRow";
import PageIntro from "../components/ui/PageIntro";
import SectionCard from "../components/ui/SectionCard";
import RangeTabs from "../components/ui/RangeTabs";
import StateNotice from "../components/ui/StateNotice";
import StatCard from "../components/ui/StatCard";
import { fetchDashboardData } from "../data/mockSpotify";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { formatMinutes } from "../lib/analytics";
import { useDataScenario } from "../state/DataScenarioContext";
import type { TimeRange } from "../types/music";

export default function DashboardPage() {
  const { scenario } = useDataScenario();
  const [range, setRange] = useState<TimeRange>("medium_term");
  const { data, loading, error, reload } = useAsyncResource(() => fetchDashboardData(scenario), [scenario]);

  const selected = useMemo(() => data?.topByRange[range], [data, range]);

  if (loading) {
    return <StateNotice variant="loading" title="Syncing your Spotify story" description="Pulling your latest listening insights..." />;
  }

  if (error) {
    return <StateNotice variant="error" title="Could not load dashboard" description={error} actionLabel="Try again" onAction={reload} />;
  }

  if (!data) {
    return <StateNotice title="No dashboard data" description="Your account has no listening highlights yet." />;
  }

  const noHighlights = selected?.artists.length === 0 && selected?.tracks.length === 0;

  return (
    <div className="space-y-6">
      <PageIntro title="Dashboard" description="Your listening profile, highlights, and genre pulse." />

      <section className="rounded-2xl border border-emerald-300/20 bg-slate-900/80 p-5">
        <div className="flex items-center gap-4">
          <img src={data.profile.avatarUrl} alt={data.profile.displayName} className="h-16 w-16 rounded-xl object-cover" />
          <div>
            <h3 className="text-2xl font-semibold text-white">{data.profile.displayName}</h3>
            <p className="text-sm text-slate-300">
              {data.profile.handle} • {data.profile.country} • listening since {data.profile.memberSince}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Minutes this year" value={formatMinutes(data.minutesThisYear)} helper="Up 12% from last year" />
        <StatCard label="Saved tracks" value={formatMinutes(data.savedTracks)} helper="Across all devices" />
        <StatCard label="Playlist streak" value={`${data.profile.streakDays} days`} helper={`${data.playlists} active playlists`} />
        <StatCard label="Recent genres" value={`${data.recentGenres.length}`} helper="In active rotation" />
      </div>

      <SectionCard title="Top picks" subtitle="Your most played artists and tracks by period.">
        <RangeTabs value={range} onChange={setRange} />
        {noHighlights ? (
          <StateNotice title="No highlights for this period" description="Spin more music and come back for a fresh breakdown." />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wide text-slate-400">Artists</h4>
              {selected?.artists.map((artist, index) => <ArtistRow key={artist.id} artist={artist} rank={index + 1} />)}
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wide text-slate-400">Tracks</h4>
              {selected?.tracks.map((track, index) => <TrackRow key={track.id} track={track} rank={index + 1} />)}
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Genre pulse" subtitle="Labels that define your current taste.">
        {data.recentGenres.length === 0 ? (
          <StateNotice title="No genres yet" description="Once your library grows, your genre pulse will appear here." />
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.recentGenres.map((genre) => (
              <span key={genre} className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                {genre}
              </span>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
