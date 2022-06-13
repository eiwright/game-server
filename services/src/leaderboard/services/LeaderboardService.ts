import { Individual } from "../../types/Individual.interface";
import Leaderboard, {Leaderboards} from "../../types/Leaderboards.interface";


//TEMP

let leaderboards: Leaderboards = {
    1: {
        id: 1,
        name: 'HighScores',
        icon: undefined,
        listOrder: 1,
        limits: undefined,
        type: 'Large'
    },
    2: {
        id: 2,
        name: 'Deaths',
        icon: undefined,
        listOrder: 2,
        limits: undefined,
        type: 'Large'
    }
}
// let leaderboardsArray: Leaderboards[] = [
//     {
//         id: 1,
//         name: 'HighScores',
//         icon: undefined,
//         listOrder: 1,
//         limits: undefined,
//         type: 'Large'
//     },
//     {
//         id: 2,
//         name: 'Deaths',
//         icon: undefined,
//         listOrder: 2,
//         limits: undefined,
//         type: 'Large'
//     }
// ]

//export const getAll = async (): Promise<Leaderboards[]> => leaderboards;
export const getAll = async (): Promise<Leaderboards[]> => Object.values(leaderboards);

export const find = async (id: number): Promise<Leaderboard | null>  => {
    // var boards = leaderboards.filter(l => l.id == id);
    // return boards.length > 0 ? boards[0] : null;
    return leaderboards[id];
}

export const add = async (newBoard: Leaderboard): Promise<Leaderboard> => {
    const id: number = Date.now().valueOf() + Math.random();
    leaderboards[id] = {
        ...newBoard,
        id
    };
    return leaderboards[id];
}

export const update = async (id: number, boardUpdate: Leaderboard) : Promise<Leaderboard | null> => {
    const leaderboard = await find(id);
    if(!leaderboard){
        return null;
    }
    leaderboards[id] = { ...boardUpdate, id };
    return leaderboards[id];
}

export const remove = async (id: number): Promise<null | void> => {
    const leaderboard = await find(id);
    if(!leaderboard){
        return null;
    }
    delete leaderboards[id];
}