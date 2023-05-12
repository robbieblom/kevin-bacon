import { create } from "zustand";

export const useAppStore = create((set) => ({
  loading: false,
  setLoading: (l) => {
    set({ loading: l });
  },
  currentDegree: 1,
  setCurrentDegree: (d) => {
    set({ currentDegree: d });
  },
  movieCount: 0,
  incrementMovieCount: () => {
    set((state) => ({ movieCount: state.movieCount + 1 }));
  },
  setMovieCount: (mc) => {
    set({ movieCount: mc });
  },
  searched: false,
  setSearched: (s) => {
    set({ searched: s });
  },
  sourceActor: null,
  //   sourceActor: { name: "jonah" },
  setSourceActor: (sa) => {
    set({ sourceActor: sa });
  },
  targetActor: null,
  //   targetActor: { name: "brad" },
  setTargetActor: (ta) => {
    set({ targetActor: ta });
  },
  results: [],
  //   results: mockResults,
  setResults: (r) => {
    set({ results: r });
  },
}));
