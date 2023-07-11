import {
  ByteTheoryConfig,
  ByteTheoryTheme,
  Footer,
  GlobalLayout,
  MenuIcon,
  NavModule,
} from "@bytetheoryinnovations/bytetheory-ui-library";
import React from "react";
import { shallow } from "zustand/shallow";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Error } from "./pages/Error";
import { HomePage } from "./pages/HomePage.js";
import { Loading } from "./pages/Loading.js";
import { Results } from "./pages/Results.js";
import { useAppStore } from "./stores/AppStore.js";

export const App = () => {
  const navDrawerMenuItems = [
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
  const logoUrl = {
    name: "Logo",
    url: "https://bytetheoryinnovations.com/#home",
    options: { target: "_blank", rel: "noopener nofollow noreferrer" },
  };

  const footerMenuItems = [
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
      // } else if (searched) {
    } else if (true) {
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
                icons={[<MenuIcon key={1} menuItems={navDrawerMenuItems} />]}
                logoUrl={logoUrl}
              />
            }
            footer={<Footer footerMenuItems={footerMenuItems} />}
          >
            {getPages()}
          </GlobalLayout>
        </ByteTheoryTheme>
      </ByteTheoryConfig>
    </ErrorBoundary>
  );
};
