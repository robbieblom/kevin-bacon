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
    searched: false,
    setSearched: (s) => {
        set({ searched: s })
    },
    sourceActor: null,
    // sourceActor: bradPitt,
    setSourceActor: (sa) => {
        set({ sourceActor: sa })
    },
    targetActor: null,
    // targetActor: jonahHill,
    setTargetActor: (ta) => {
        set({ targetActor: ta })
    },
    results: [],
    // results: mockResults,
    setResults: (r) => {
        set({ results: r })
    }
}))