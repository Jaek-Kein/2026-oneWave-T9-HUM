import { create } from "zustand";
import dummyData from "../data/dummy.json";

type SortType = "latest" | "frequency" | "alphabet";
type Language = "ALL" | "ENGLISH" 

type WordItem = {
  id: number;
  word: string;
  meaning: string;
  partOfSpeech: string;
  artist: string;
  song: string;
  frequency: number;
  addedAt: string;
  language: Language; // 여기서도 enum 기반으로 고정 추천
};

type WordStore = {
  wordList: WordItem[];

  query: string;
  sortType: SortType;
  language: Language;

  setQuery: (v: string) => void;
  setSortType: (v: SortType) => void;
  setLanguage: (v: Language) => void;

  fetchWordList: () => Promise<void>;

  // ✅ filtered list 제공: 파생 데이터는 getter로 제공
  getFilteredWords: () => WordItem[];
};

export const useWordStore = create<WordStore>((set, get) => ({
  wordList: [],

  query: "",
  sortType: "latest",
  language: "ALL",

  setQuery: (v) => set({ query: v }),
  setSortType: (v) => set({ sortType: v }),
  setLanguage: (v) => set({ language: v }),

  fetchWordList: async () => {
    set({ wordList: dummyData.words as WordItem[] });
  },

  getFilteredWords: () => {
    const { wordList, query, sortType, language } = get();

    const normalized = query.trim().toLowerCase();

    let filtered = normalized
      ? wordList.filter((item) =>
          item.word.toLowerCase().includes(normalized) ||
          item.meaning.toLowerCase().includes(normalized) ||
          item.artist.toLowerCase().includes(normalized)
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

    // latest는 지금 addedAt이 "YYYY.MM" 문자열이라면
    // 실제 최신 정렬이 필요하면 파싱해서 비교하는게 안전합니다.
    return [...filtered].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  },
}));
