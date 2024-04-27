export type Move = "rock" | "paper" | "scissors";
export const MOVES: Move[] = ["rock", "paper", "scissors"];

export type Result = "win" | "lose" | "draw";
export type Results = { [_ in Result]: number };

export const rules: { [_ in Move]: { [_ in Move]: Result } } = {
  rock: {
    rock: "draw",
    paper: "lose",
    scissors: "win",
  },
  paper: {
    rock: "win",
    paper: "draw",
    scissors: "lose",
  },
  scissors: {
    rock: "lose",
    paper: "win",
    scissors: "draw",
  },
};

// beats[X] = Y means that Y beats X
export const beats: { [_ in Move]: Move } = {
  rock: "paper",
  paper: "scissors",
  scissors: "rock",
};

// beatenBy[X] = Y means that Y is beaten by X
export const beatenBy: { [_ in Move]: Move } = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};
