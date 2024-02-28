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
    </Footer>
  );
});
