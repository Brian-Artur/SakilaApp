import { Request, Response } from 'express';
import { db } from '../app';
import { Film } from '../models/Film';

export const getFilms = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query<Film[]>('SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film LIMIT 20');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener films:', error);
    res.status(500).json({ message: 'Error al obtener films', error });
  }
};
