import { Contender } from "./Contender";
import { loadContenders } from "./CustomContenders";
import { Move, beats, MOVES } from "./rules";

var contenders: { [id: string]: { name: string; contender: Contender<any> } } =
  {};

MOVES.forEach((move) => {
  contenders[`always_${move}`] = {
    name: `Always ${move}`,
    contender: () => ({ move, state: undefined }),
  };
});

function randomMove(): Move {
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

contenders.random = {
  name: "Random",
  contender: () => ({ move: randomMove(), state: undefined }),
};

contenders.beat_last = {
  name: "Beat last",
  contender: (last) => ({
    move: last ? beats[last.opponentMove] : randomMove(),
    state: undefined,
  }),
};

const customContenders = loadContenders();
Object.entries(customContenders).forEach(([name, code]) => {
  try {
    contenders[name] = {
      name,
      // FIXME: transpile
      // eslint-disable-next-line no-eval
      contender: eval(code) as Contender<any>,
    };
  } catch (e) {
    console.error(`Error loading contender ${name}:`, e);
  }
});

export default contenders;
