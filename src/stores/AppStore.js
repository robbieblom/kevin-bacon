import { create } from 'zustand'

export const useAppStore = create((set) => ({
    error: false,
    setError: (e) => {
        set({ error: e })
    },
    loading: false,
    setLoading: (l) => {
        set({ loading: l })
    },
    currentDegree: 1,
    setCurrentDegree: (d) => {
        set({ currentDegree: d })
    },
    movieCount: 0,
    incrementMovieCount: () => {
        set((state) => ({ movieCount: state.movieCount + 1 }))
    },
    setMovieCount: (mc) => {
        set({ movieCount: mc })
    },
    searched: false,
    setSearched: (s) => {
        set({ searched: s })
    },
    sourceActor: null,
    setSourceActor: (sa) => {
        set({ sourceActor: sa })
    },
    targetActor: null,
    setTargetActor: (ta) => {
        set({ targetActor: ta })
    },
    results: [],
    setResults: (r) => {
        set({ results: r })
    }
}))