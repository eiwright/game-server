import { AchievementState } from './AchievementState'

export interface Achievements {
    id: string;
    name: string;
    description: string;
    icon: Blob;
    listOrder:number;
    state: AchievementState;
    incremental: number;
    points: number;
}