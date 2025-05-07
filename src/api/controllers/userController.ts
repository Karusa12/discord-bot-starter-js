import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found !' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};
