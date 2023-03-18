import { useTheme } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/system'
import { deepmerge } from '@mui/utils'
import React from 'react'
import { shallow } from 'zustand/shallow'
import './App.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Error } from './pages/Error'
import { HomePage } from './pages/HomePage.js'
import { Loading } from './pages/Loading.js'
import { Results } from './pages/Results.js'
import { useAppStore } from './stores/AppStore.js'
import { themeOptions } from './theme/theme-options'

export const App = () => {
    const muiSystemTheme = useTheme()
    const theme = createTheme(deepmerge(muiSystemTheme, themeOptions()))

    const [loading, searched] = useAppStore((state) => [state.loading, state.searched], shallow)

    const getPages = () => {
        if (loading) {
            // if (true) {
            return (<Loading />)
        } else if (searched) {
            // } else if (true) {
            return (<Results />)
        } else {
            return (<HomePage />)
        }
    }

    return (
        <ErrorBoundary fallback={<Error />}>
            <ThemeProvider theme={theme}>
                {getPages()}
            </ThemeProvider>
        </ErrorBoundary>
    )

}
