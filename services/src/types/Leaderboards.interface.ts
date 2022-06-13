import { Individual } from "./Individual.interface";


export default interface Leaderboard {
    id: number;
    name: string;
    icon?: Blob;
    listOrder: number;
    limits?: number | undefined;
    type: string;  //large or small
    entries?: Individual[];
}

//remvoe this when we use MongoDb instead of in Memory Store
export interface Leaderboards {
    [key: number] : Leaderboard
}