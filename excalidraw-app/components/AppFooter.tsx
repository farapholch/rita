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
        }}
      ></div>
      <a href="https://wiki.trafikverket.local/display/TAOS/Rita+informationssida">
        <img src="TV_logo_symbol_rgb_rod.png" alt="Trv_Logo" width={22} height={32} title="Hjälp med Rita" />
      </a>
    </Footer>
  );
});
