import type { Track } from "../../types/music";
import { formatDuration } from "../../lib/analytics";

export default function TrackRow({ track, rank }: { track: Track; rank: number }) {
  return (
    <article className="flex items-center gap-3 rounded-lg border border-slate-700/70 bg-slate-800/70 p-3">
      <span className="w-6 text-center text-sm text-slate-400">#{rank}</span>
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-white">{track.title}</h4>
        <p className="truncate text-xs text-slate-400">
          {track.artist} • {track.album} • {track.releaseYear}
        </p>
      </div>
      <p className="text-xs text-slate-300">{formatDuration(track.durationMs)}</p>
    </article>
  );
}
