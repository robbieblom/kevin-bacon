import {
  ByteTheoryTheme,
  GlobalLayout,
} from "@bytetheoryinnovations/bytetheory-ui-library";
import React from "react";
import { shallow } from "zustand/shallow";
import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Error } from "./pages/Error";
import { HomePage } from "./pages/HomePage.js";
import { Loading } from "./pages/Loading.js";
import { Results } from "./pages/Results.js";
import { useAppStore } from "./stores/AppStore.js";

export const App = () => {
  const [loading, searched] = useAppStore(
    (state) => [state.loading, state.searched],
    shallow
  );

  const getPages = () => {
    if (loading) {
      // if (true) {
      return <Loading />;
      // } else if (searched) {
    } else if (true) {
      return <Results />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <ByteTheoryTheme mode={"dark"} rebaseStyles>
        <GlobalLayout>{getPages()}</GlobalLayout>
      </ByteTheoryTheme>
    </ErrorBoundary>
  );
};
