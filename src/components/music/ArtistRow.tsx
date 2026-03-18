import type { Artist } from "../../types/music";
import { formatFollowers } from "../../lib/analytics";

export default function ArtistRow({ artist, rank }: { artist: Artist; rank: number }) {
  return (
    <article className="flex items-center gap-3 rounded-lg border border-slate-700/70 bg-slate-800/70 p-3">
      <span className="w-6 text-center text-sm text-slate-400">#{rank}</span>
      <img src={artist.imageUrl} alt={artist.name} className="h-11 w-11 rounded-md object-cover" loading="lazy" />
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-medium text-white">{artist.name}</h4>
        <p className="truncate text-xs text-slate-400">{artist.genres.join(" • ")}</p>
      </div>
      <p className="text-xs text-slate-300">{formatFollowers(artist.followers)} followers</p>
    </article>
  );
}
