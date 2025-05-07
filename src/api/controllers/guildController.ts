import { Request, Response, NextFunction } from 'express';
import * as guildService from '../services/guildService';

export const getAllGuilds = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const guilds = await guildService.findAll();
    res.json(guilds);
  } catch (err) {
    next(err);
  }
};

export const getGuildById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const guild = await guildService.findById(req.params.id);
    if (!guild) {
      res.status(404).json({ message: 'Guild not found !' });
      return;
    }
    res.json(guild);
  } catch (err) {
    next(err);
  }
};
