import { Move, Result, rules } from "./rules";

export type Contender<T> = (last: {state: T, opponentMove: Move} | undefined) => { move: Move, state: T };

export function duel<A, B>(contenderA: Contender<A>, contenderB: Contender<B>, rounds: number): { [_ in Result]: number } {
    var results = { win: 0, lose: 0, draw: 0 };
    var a = contenderA(undefined);
    var b = contenderB(undefined);
    results[rules[a.move][b.move]]++;
    for (let i = 1; i < rounds; i++) {
        var moveA = a.move;
        a = contenderA({ state: a.state, opponentMove: b.move });
        b = contenderB({ state: b.state, opponentMove: moveA });
        results[rules[a.move][b.move]]++;
    }
    return results;
}