import express, {Request, Response } from "express";
import * as leaderboardsService from "./services/LeaderboardService";
import Leaderboard, {Leaderboards} from "../types/Leaderboards.interface";
import { getErrorMessage } from "../utils/errors";


export const leaderboardsRouter = express.Router();

leaderboardsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const leaderboards: Leaderboards[] = await leaderboardsService.getAll();
        res.status(200).send(leaderboards);
    }
    catch (e : Error | any) {        
        res.status(500).send(getErrorMessage(e));
    }
});

leaderboardsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const leaderboard: Leaderboard | null = await leaderboardsService.find(id);
        if(leaderboard) {
            return res.status(200).send(leaderboard);
        }
        res.status(404).send("Leaderboard not found.");
    }
    catch (e : Error | any) {        
        res.status(500).send(getErrorMessage(e));
    }
});

leaderboardsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const boardUpdate : Leaderboard = req.body;
        const leaderboard: Leaderboard | null = await leaderboardsService.find(id);
        if(leaderboard) {
            const updatedLeaderboard = await leaderboardsService.update(id, boardUpdate);
            return res.status(200).send(updatedLeaderboard);
        }
        const newBoard = await leaderboardsService.add(boardUpdate);
        res.status(201).send(newBoard);
    }
    catch (e : Error | any) {        
        res.status(500).send(getErrorMessage(e));
    }
});

leaderboardsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        await leaderboardsService.remove(id);
        //res.sendStatus(204);
        res.status(204).json();
    }
    catch (e : Error | any) {        
        res.status(500).send(getErrorMessage(e));
    }
});