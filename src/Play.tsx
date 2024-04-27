import { useRef, useState } from "react";
import contenders from "./contenders";
import { Contender } from "./Contender";
import { MOVES, Move, Results, rules } from "./rules";
import { ResultsPieChart } from "./ResultsPieChart";

function Match({ contender }: { contender: Contender<any> }) {
  const [results, setResults] = useState<Results>({ win: 0, lose: 0, draw: 0 });
  const fromContender = useRef(contender(undefined));

  function makeMove(move: Move) {
    results[rules[move][fromContender.current.move]]++;
    fromContender.current = contender({
      state: fromContender.current.state,
      opponentMove: move,
    });
    setResults({ ...results });
  }

  return (
    <>
      <div>{JSON.stringify(results)}</div>
      <ResultsPieChart results={results} />
      {MOVES.map((move) => {
        return (
          <button key={move} onClick={() => makeMove(move)}>
            {move}
          </button>
        );
      })}
    </>
  );
}

export function Play() {
  const contenderNames = Object.keys(contenders);
  contenderNames.sort();
  const [selectedContender, setSelectedContender] = useState(contenderNames[0]);
  return (
    <>
      <h1>Play against a contender</h1>
      <select
        value={selectedContender}
        onChange={(e) => setSelectedContender(e.target.value)}
      >
        {contenderNames.map((contender) => (
          <option
            key={contender}
            value={contender}
            onSelect={() => setSelectedContender(contender)}
          >
            {contender}
          </option>
        ))}
      </select>
      <h2>Playing against {selectedContender}</h2>
      <Match
        key={selectedContender}
        contender={contenders[selectedContender].contender}
      />
    </>
  );
}
