import { Request, Response } from 'express';
import { getDbPool } from '../database/db';


//Lógica de getFilms
export const getFilms = async (_req: Request, res: Response) => {
  try {
    //Llamamos a getDbPool para comprobar conexion
    const db = getDbPool();
    const [rows] = await db.query('SELECT film_id, title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating FROM film;');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener films:', error);
    res.status(500).json({ message: 'Error al obtener films', error });
  }
};

//Lógica de de getAvailable
export const getAvailable = async (_req: Request, res: Response) => {
  //Llamamos a getDbPool para comprobar conexion
  const db = getDbPool();
  try {
    const [rows] = await db.query(`
      SELECT f.film_id, f.title
      FROM film f
      JOIN inventory i ON f.film_id = i.film_id
      LEFT JOIN rental r ON i.inventory_id = r.inventory_id
      WHERE r.rental_id IS NULL
      GROUP BY f.film_id, f.title;
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar datos', error });
  }
}
