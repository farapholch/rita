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
      <a href="https://wiki.trafikverket.local/display/TAOS/Rita+info">
        <img src="favicon-32x32.png" alt="Trv_Logo" width={32} height={32} title="Hjälp med Rita" />
      </a>
    </Footer>
  );
});
