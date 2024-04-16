import React from "react";
import { Footer } from "../../src/packages/excalidraw/index";

export const AppFooter = React.memo(() => {
  return (
    <Footer>
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          alignItems: "center",
          margin: ".50rem",
        }}
      >
        TESTMILJÖ
      </div>
      <a href="https://wiki.trafikverket.local/pages/viewpage.action?pageId=113739507">
        <img src="TV_logo_symbol_rgb_rod.png" alt="Trv_Logo" width={22} height={32} title="Hjälp med Rita" />
      </a>
    </Footer>
  );
});
