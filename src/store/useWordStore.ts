import { create } from "zustand";
import dummyData from "../data/dummy.json";

type SortType = "latest" | "frequency" | "alphabet";
type TrackSortType = "latest" | "title" | "words";
type Language = "ALL" | "ENGLISH" | "JAPANESE" | "KOREAN";
type Platform = "youtube" | "spotify" | "apple";
type PlatformFilter = "ALL" | "YOUTUBE" | "SPOTIFY" | "APPLE";

type WordItem = {
  id: number;
  word: string;
  meaning: string;
  partOfSpeech: string;
  artist: string;
  song: string;
  frequency: number;
  addedAt: string;
  language: Exclude<Language, "ALL">;
};

type TrackItem = {
  id: number;
  title: string;
  artist: string;
  capturedAt: string;
  extractedWords: number;
  source: string;
  platform: Platform;
  coverStart: string;
  coverEnd: string;
};

type DashboardData = {
  greetingName: string;
  totalWords: number;
  totalTracks: number;
};

type UserData = {
  name: string;
  avatarText: string;
};

type ProfileData = {
  email: string;
  level: string;
  streakDays: number;
  favoriteLanguage: string;
  totalCapturedWords: number;
  totalCapturedTracks: number;
};

type WordStore = {
  wordList: WordItem[];
  trackList: TrackItem[];
  dashboard: DashboardData;
  user: UserData;
  profile: ProfileData;

  query: string;
  sortType: SortType;
  language: Language;
  trackPlatformFilter: PlatformFilter;
  trackSortType: TrackSortType;

  setQuery: (v: string) => void;
  setSortType: (v: SortType) => void;
  setLanguage: (v: Language) => void;
  setTrackPlatformFilter: (v: PlatformFilter) => void;
  setTrackSortType: (v: TrackSortType | ((prev: TrackSortType) => TrackSortType)) => void;

  fetchAppData: () => Promise<void>;

  getFilteredWords: () => WordItem[];
  getFilteredTracks: (queryText: string) => TrackItem[];
  getDashboardRecentWords: (count?: number) => WordItem[];
  getDashboardRecentTracks: (count?: number) => TrackItem[];
};

export const useWordStore = create<WordStore>((set, get) => ({
  wordList: [],
  trackList: [],
  dashboard: {
    greetingName: "홍길동",
    totalWords: 0,
    totalTracks: 0,
  },
  user: {
    name: "홍길동",
    avatarText: "홍",
  },
  profile: {
    email: "user@example.com",
    level: "Beginner",
    streakDays: 0,
    favoriteLanguage: "ENGLISH",
    totalCapturedWords: 0,
    totalCapturedTracks: 0,
  },

  query: "",
  sortType: "latest",
  language: "ALL",
  trackPlatformFilter: "ALL",
  trackSortType: "latest",

  setQuery: (v) => set({ query: v }),
  setSortType: (v) => set({ sortType: v }),
  setLanguage: (v) => set({ language: v }),
  setTrackPlatformFilter: (v) => set({ trackPlatformFilter: v }),
  setTrackSortType: (v) =>
    set((state) => ({
      trackSortType:
        typeof v === "function"
          ? (v as (prev: TrackSortType) => TrackSortType)(state.trackSortType)
          : v,
    })),

  fetchAppData: async () => {
    const words = (dummyData.words as WordItem[]) ?? [];
    const tracks = ((dummyData as { tracks?: TrackItem[] }).tracks ?? []) as TrackItem[];
    const dashboard =
      ((dummyData as { dashboard?: DashboardData }).dashboard as DashboardData | undefined) ?? {
        greetingName: "홍길동",
        totalWords: words.length,
        totalTracks: tracks.length,
      };
    const user =
      ((dummyData as { user?: UserData }).user as UserData | undefined) ?? {
        name: "홍길동",
        avatarText: "홍",
      };
    const profile =
      ((dummyData as { profile?: ProfileData }).profile as ProfileData | undefined) ?? {
        email: "user@example.com",
        level: "Beginner",
        streakDays: 0,
        favoriteLanguage: "ENGLISH",
        totalCapturedWords: words.length,
        totalCapturedTracks: tracks.length,
      };

    set({
      wordList: words,
      trackList: tracks,
      dashboard: {
        ...dashboard,
        totalWords: dashboard.totalWords || words.length,
        totalTracks: dashboard.totalTracks || tracks.length,
      },
      user,
      profile: {
        ...profile,
        totalCapturedWords: profile.totalCapturedWords || words.length,
        totalCapturedTracks: profile.totalCapturedTracks || tracks.length,
      },
    });
  },

  getFilteredWords: () => {
    const { wordList, query, sortType, language } = get();

    const normalized = query.trim().toLowerCase();

    let filtered = normalized
      ? wordList.filter(
          (item) =>
            item.word.toLowerCase().includes(normalized) ||
            item.meaning.toLowerCase().includes(normalized) ||
            item.artist.toLowerCase().includes(normalized),
        )
      : wordList;

    if (language !== "ALL") {
      filtered = filtered.filter((item) => item.language === language);
    }

    if (sortType === "alphabet") {
      return [...filtered].sort((a, b) => a.word.localeCompare(b.word));
    }
    if (sortType === "frequency") {
      return [...filtered].sort((a, b) => b.frequency - a.frequency);
    }

    return [...filtered].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  },

  getFilteredTracks: (queryText) => {
    const { trackList, trackPlatformFilter, trackSortType } = get();
    const normalized = queryText.trim().toLowerCase();

    let filtered = normalized
      ? trackList.filter(
          (track) =>
            track.title.toLowerCase().includes(normalized) ||
            track.artist.toLowerCase().includes(normalized),
        )
      : trackList;

    if (trackPlatformFilter !== "ALL") {
      filtered = filtered.filter((track) => {
        if (trackPlatformFilter === "YOUTUBE") return track.platform === "youtube";
        if (trackPlatformFilter === "SPOTIFY") return track.platform === "spotify";
        return track.platform === "apple";
      });
    }

    if (trackSortType === "title") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (trackSortType === "words") {
      return [...filtered].sort((a, b) => b.extractedWords - a.extractedWords);
    }

    return [...filtered].sort((a, b) => b.capturedAt.localeCompare(a.capturedAt));
  },

  getDashboardRecentWords: (count = 3) => {
    const { wordList } = get();
    return [...wordList]
      .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
      .slice(0, count);
  },

  getDashboardRecentTracks: (count = 3) => {
    const { trackList } = get();
    return [...trackList]
      .sort((a, b) => b.capturedAt.localeCompare(a.capturedAt))
      .slice(0, count);
  },
}));
