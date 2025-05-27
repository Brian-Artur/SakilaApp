import { Router } from 'express';
import { getFilms } from '../controllers/filmController';

const router = Router();

router.get('/', getFilms);

export default router;
