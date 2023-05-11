import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { shallow } from "zustand/shallow";
import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Error } from "./pages/Error";
import { HomePage } from "./pages/HomePage.js";
import { GlobalLayout } from "./pages/layout/GlobalLayout";
import { Loading } from "./pages/Loading.js";
import { Results } from "./pages/Results.js";
import { useAppStore } from "./stores/AppStore.js";
import { themeOptions } from "./theme/theme-options";

export const App = () => {
  const theme = createTheme(themeOptions());
  console.log(theme);
  const [loading, searched] = useAppStore(
    (state) => [state.loading, state.searched],
    shallow
  );

  const getPages = () => {
    if (loading) {
      // if (true) {
      return <Loading />;
    } else if (searched) {
      // } else if (true) {
      return <Results />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalLayout>{getPages()}</GlobalLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
