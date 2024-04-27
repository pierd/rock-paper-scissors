import React from "react";
import "./App.css";
import contenders from "./contenders";
import { Tournament } from "./Tournament";
import { CustomContenders } from "./CustomContenders";
import { Play } from "./Play";

type Page = "play" | "tournament" | "contenders";

export default function App() {
  const [page, setPage] = React.useState<Page>("tournament");
  return (
    <div>
      <nav>
        <button onClick={() => setPage("play")}>Play</button>
        <button onClick={() => setPage("tournament")}>Tournament</button>
        <button onClick={() => setPage("contenders")}>Contenders</button>
      </nav>
      {(() => {
        switch (page) {
          case "play":
            return <Play />;
          case "tournament":
            return <Tournament contenders={contenders} />;
          case "contenders":
            return <CustomContenders />;
        }
      })()}
    </div>
  );
}
