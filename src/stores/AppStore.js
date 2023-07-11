import { create } from "zustand";

export const useAppStore = create((set) => ({
  loading: false,
  setLoading: (l) => {
    set({ loading: l });
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
  // sourceActor: { name: "jonah" },
  setSourceActor: (sa) => {
    set({ sourceActor: sa });
  },
  targetActor: null,
  // targetActor: { name: "brad" },
  setTargetActor: (ta) => {
    set({ targetActor: ta });
  },
  sourceActorResults: [],
  // sourceActorResults: mockSourceResults,
  setSourceActorResults: (r) => {
    set({ sourceActorResults: r });
  },
  targetActorResults: [],
  // targetActorResults: mockTargetResults,
  setTargetActorResults: (r) => {
    set({ targetActorResults: r });
  },
}));
