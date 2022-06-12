import { getGames, setGame, endGame, getGameById } from './sessions';
import { Game, Visibility } from './models/game';
import { Difficulty } from './models/core/difficulty';
import { randomUUID } from 'crypto';

const newGame = (): Game => ({
    campaign: null,
    difficulty: Difficulty.Easy,
    workingSquad: [],
    characters: [],
    gameId: randomUUID(),
    operators: [],
    visibility: Visibility.Private
})

describe('sessions', () => {
    test("it had no games", () => {
        expect(getGames(Visibility.Public).length).toBe(0);
    })
    test('new games can be created', () => {
        const g: Game = newGame();
        setGame(g);
        expect(getGameById(g.gameId)).toBe(g);
    });
    test('public games can be retrieved', () => {
        const allExistingGames = getGames(null),
              publicExistingGames = getGames(Visibility.Public);
        setGame(newGame());
        expect(getGames(null).length).toBe(allExistingGames.length + 1);
        expect(getGames(Visibility.Public).length).toBe(publicExistingGames.length);

    })
})