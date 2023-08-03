import {
  ByteTheoryConfig,
  ByteTheoryTheme,
  Footer,
  GlobalLayout,
  NavModule,
} from "@bytetheoryinnovations/bytetheory-ui-library";
import { Logo } from "@bytetheoryinnovations/bytetheory-ui-library/assets";
import React from "react";
import { shallow } from "zustand/shallow";
import DocsButton from "./components/DocsButton";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Error } from "./pages/Error";
import { HomePage } from "./pages/HomePage.js";
import { Loading } from "./pages/Loading.js";
import { Results } from "./pages/Results.js";
import { useAppStore } from "./stores/AppStore.js";

export const App = () => {
  const navLogoUrl = {
    name: "Logo",
    url: "https://bytetheoryinnovations.com/#home",
    options: { target: "_blank", rel: "noopener nofollow noreferrer" },
  };

  const linksMenuItems = [
    {
      name: "Home",
      url: "https://bytetheoryinnovations.com/#home",
      options: { target: "_blank", rel: "noopener nofollow noreferrer" },
    },
    {
      name: "About",
      url: "https://bytetheoryinnovations.com/#services",
      options: { target: "_blank", rel: "noopener nofollow noreferrer" },
    },
    {
      name: "Projects",
      url: "https://bytetheoryinnovations.com/#projects",
      options: { target: "_blank", rel: "noopener nofollow noreferrer" },
    },
    {
      name: "Contact",
      url: "https://bytetheoryinnovations.com/#contact",
      options: { target: "_blank", rel: "noopener nofollow noreferrer" },
    },
  ];

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
      <ByteTheoryConfig providingLibraries={["@mui/material"]}>
        <ByteTheoryTheme mode={"dark"} rebaseStyles>
          <GlobalLayout
            nav={
              <NavModule
                leftIcons={[<DocsButton key={1} />]}
                rightIcons={[<Logo key={1} logoUrl={navLogoUrl} />]}
              />
            }
            footer={<Footer linksMenuItems={linksMenuItems} />}
          >
            {getPages()}
          </GlobalLayout>
        </ByteTheoryTheme>
      </ByteTheoryConfig>
    </ErrorBoundary>
  );
};
