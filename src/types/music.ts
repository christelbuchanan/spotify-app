export type TimeRange = "short_term" | "medium_term" | "long_term";

export type DataScenario = "normal" | "empty" | "error";

export interface Profile {
  displayName: string;
  handle: string;
  avatarUrl: string;
  country: string;
  memberSince: string;
  streakDays: number;
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  followers: number;
  popularity: number;
  imageUrl: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  durationMs: number;
  releaseYear: number;
  energy: number;
  valence: number;
}

export interface ListeningMonth {
  month: string;
  minutes: number;
  newArtists: number;
}

export interface GenreSlice {
  genre: string;
  minutes: number;
}

export interface DashboardData {
  profile: Profile;
  topByRange: Record<TimeRange, { artists: Artist[]; tracks: Track[] }>;
  savedTracks: number;
  playlists: number;
  minutesThisYear: number;
  recentGenres: string[];
}

export interface TrendsData {
  genreShare: GenreSlice[];
  history: ListeningMonth[];
}

export interface LibraryData {
  likedTracks: Track[];
  followedArtists: Artist[];
}
