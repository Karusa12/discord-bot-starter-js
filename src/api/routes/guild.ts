import { Router, Request, Response, NextFunction } from 'express';
import { getAllGuilds, getGuildById } from '../controllers/guildController';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => getAllGuilds(req, res, next));
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => getGuildById(req, res, next));

// http://localhost:3000/guild/
// http://localhost:3000/guild/(id discord)

export default router;