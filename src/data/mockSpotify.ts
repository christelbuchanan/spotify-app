import type {
  Artist,
  DashboardData,
  DataScenario,
  GenreSlice,
  LibraryData,
  ListeningMonth,
  Profile,
  Track,
  TrendsData
} from "../types/music";

const profile: Profile = {
  displayName: "Alex Rivera",
  handle: "@cratekeeper",
  avatarUrl: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
  country: "United States",
  memberSince: "2017",
  streakDays: 46
};

const artists: Artist[] = [
  {
    id: "a1",
    name: "Tame Impala",
    genres: ["psychedelic rock", "neo-psychedelia"],
    followers: 10500000,
    popularity: 86,
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "a2",
    name: "Little Simz",
    genres: ["uk hip hop", "alternative r&b"],
    followers: 2200000,
    popularity: 74,
    imageUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "a3",
    name: "Khruangbin",
    genres: ["indie soul", "chill groove"],
    followers: 1850000,
    popularity: 71,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "a4",
    name: "Fred again..",
    genres: ["uk dance", "house"],
    followers: 4300000,
    popularity: 82,
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "a5",
    name: "SZA",
    genres: ["r&b", "pop soul"],
    followers: 32000000,
    popularity: 92,
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=80"
  }
];

const tracks: Track[] = [
  {
    id: "t1",
    title: "Let It Happen",
    artist: "Tame Impala",
    album: "Currents",
    durationMs: 467000,
    releaseYear: 2015,
    energy: 0.72,
    valence: 0.59
  },
  {
    id: "t2",
    title: "Point and Kill",
    artist: "Little Simz",
    album: "Sometimes I Might Be Introvert",
    durationMs: 209000,
    releaseYear: 2021,
    energy: 0.69,
    valence: 0.61
  },
  {
    id: "t3",
    title: "People Everywhere",
    artist: "Khruangbin",
    album: "Mordechai",
    durationMs: 223000,
    releaseYear: 2020,
    energy: 0.46,
    valence: 0.7
  },
  {
    id: "t4",
    title: "adore u",
    artist: "Fred again..",
    album: "ten days",
    durationMs: 201000,
    releaseYear: 2024,
    energy: 0.84,
    valence: 0.67
  },
  {
    id: "t5",
    title: "Snooze",
    artist: "SZA",
    album: "SOS",
    durationMs: 201000,
    releaseYear: 2022,
    energy: 0.52,
    valence: 0.63
  }
];

const history: ListeningMonth[] = [
  { month: "Jan", minutes: 2180, newArtists: 9 },
  { month: "Feb", minutes: 2450, newArtists: 11 },
  { month: "Mar", minutes: 2260, newArtists: 8 },
  { month: "Apr", minutes: 2670, newArtists: 14 },
  { month: "May", minutes: 2890, newArtists: 15 },
  { month: "Jun", minutes: 3010, newArtists: 10 },
  { month: "Jul", minutes: 3260, newArtists: 17 },
  { month: "Aug", minutes: 3110, newArtists: 12 },
  { month: "Sep", minutes: 2980, newArtists: 9 },
  { month: "Oct", minutes: 3400, newArtists: 21 },
  { month: "Nov", minutes: 3325, newArtists: 13 },
  { month: "Dec", minutes: 3570, newArtists: 16 }
];

const genreShare: GenreSlice[] = [
  { genre: "Alternative", minutes: 9200 },
  { genre: "Hip Hop", minutes: 7100 },
  { genre: "R&B", minutes: 6300 },
  { genre: "Electronic", minutes: 5700 },
  { genre: "Indie", minutes: 5100 }
];

const dashboardData: DashboardData = {
  profile,
  topByRange: {
    short_term: {
      artists: [artists[3], artists[1], artists[4]],
      tracks: [tracks[3], tracks[1], tracks[4]]
    },
    medium_term: {
      artists: [artists[0], artists[3], artists[2]],
      tracks: [tracks[0], tracks[3], tracks[2]]
    },
    long_term: {
      artists: [artists[0], artists[4], artists[1]],
      tracks: [tracks[0], tracks[4], tracks[1]]
    }
  },
  savedTracks: 1482,
  playlists: 38,
  minutesThisYear: 35105,
  recentGenres: ["neo-psychedelia", "uk hip hop", "indie soul", "house"]
};

const libraryData: LibraryData = {
  likedTracks: tracks,
  followedArtists: artists
};

const trendsData: TrendsData = {
  genreShare,
  history
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function withScenario<T>(scenario: DataScenario, payload: T, emptyPayload: T): T {
  if (scenario === "error") {
    throw new Error("Spotify sync failed. Try reloading or switching to normal mode.");
  }
  if (scenario === "empty") {
    return emptyPayload;
  }
  return payload;
}

export async function fetchDashboardData(scenario: DataScenario): Promise<DashboardData> {
  await wait(700);
  return withScenario(scenario, dashboardData, {
    ...dashboardData,
    topByRange: {
      short_term: { artists: [], tracks: [] },
      medium_term: { artists: [], tracks: [] },
      long_term: { artists: [], tracks: [] }
    },
    savedTracks: 0,
    playlists: 0,
    minutesThisYear: 0,
    recentGenres: []
  });
}

export async function fetchTrendsData(scenario: DataScenario): Promise<TrendsData> {
  await wait(900);
  return withScenario(scenario, trendsData, {
    genreShare: [],
    history: []
  });
}

export async function fetchLibraryData(scenario: DataScenario): Promise<LibraryData> {
  await wait(650);
  return withScenario(scenario, libraryData, {
    likedTracks: [],
    followedArtists: []
  });
}
