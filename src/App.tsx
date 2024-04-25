import React from "react";
import "./App.css";
import contenders from "./contenders";
import { Tournament } from "./Tournament";
import { CustomContenders } from "./CustomContenders";

type Page = "tournament" | "contenders";

export default function App() {
  const [page, setPage] = React.useState<Page>("tournament");
  return (
    <div>
      <nav>
        <button onClick={() => setPage("tournament")}>Tournament</button>
        <button onClick={() => setPage("contenders")}>Contenders</button>
      </nav>
      {page === "tournament" ? (
        <Tournament contenders={contenders} />
      ) : (
        <CustomContenders />
      )}
    </div>
  );
}
