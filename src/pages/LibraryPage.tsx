import { useMemo, useState } from "react";
import ArtistRow from "../components/music/ArtistRow";
import TrackRow from "../components/music/TrackRow";
import PageIntro from "../components/ui/PageIntro";
import SectionCard from "../components/ui/SectionCard";
import StateNotice from "../components/ui/StateNotice";
import { fetchLibraryData } from "../data/mockSpotify";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { useDataScenario } from "../state/DataScenarioContext";

export default function LibraryPage() {
  const { scenario } = useDataScenario();
  const [query, setQuery] = useState("");
  const { data, loading, error, reload } = useAsyncResource(() => fetchLibraryData(scenario), [scenario]);

  const filtered = useMemo(() => {
    if (!data) return { tracks: [], artists: [] };
    const term = query.trim().toLowerCase();
    if (!term) return { tracks: data.likedTracks, artists: data.followedArtists };
    return {
      tracks: data.likedTracks.filter((track) => `${track.title} ${track.artist} ${track.album}`.toLowerCase().includes(term)),
      artists: data.followedArtists.filter((artist) => `${artist.name} ${artist.genres.join(" ")}`.toLowerCase().includes(term))
    };
  }, [data, query]);

  if (loading) {
    return <StateNotice variant="loading" title="Loading library" description="Pulling liked songs and followed artists from your profile..." />;
  }

  if (error) {
    return <StateNotice variant="error" title="Could not load library" description={error} actionLabel="Try again" onAction={reload} />;
  }

  if (!data) {
    return <StateNotice title="No library data" description="Connect your Spotify account to start tracking your catalog." />;
  }

  const hasNoData = data.likedTracks.length === 0 && data.followedArtists.length === 0;

  if (hasNoData) {
    return <StateNotice title="Your library is empty" description="Save tracks and follow artists to build your personal archive." />;
  }

  const noSearchResults = filtered.tracks.length === 0 && filtered.artists.length === 0;

  return (
    <div className="space-y-5">
      <PageIntro title="Library" description="Search and revisit the songs and artists that shape your taste." />

      <div className="rounded-xl border border-slate-700/80 bg-slate-900/70 p-4">
        <label className="block text-xs uppercase tracking-wide text-slate-400">Search your library</label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try artist, song, album, genre..."
          className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-300 focus:outline-none"
        />
      </div>

      {noSearchResults ? (
        <StateNotice title="No matches found" description="Try a broader keyword or clear the search field." />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard title="Liked tracks" subtitle={`${filtered.tracks.length} tracks`}>
            <div className="space-y-2">
              {filtered.tracks.map((track, index) => (
                <TrackRow key={track.id} track={track} rank={index + 1} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Followed artists" subtitle={`${filtered.artists.length} artists`}>
            <div className="space-y-2">
              {filtered.artists.map((artist, index) => (
                <ArtistRow key={artist.id} artist={artist} rank={index + 1} />
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
