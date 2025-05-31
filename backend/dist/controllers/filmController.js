"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailable = exports.getFilms = void 0;
const db_1 = require("../database/db");
//Lógica de getFilms
const getFilms = async (_req, res) => {
    try {
        //Llamamos a getDbPool para comprobar conexion
        const db = (0, db_1.getDbPool)();
        const [rows] = await db.query('SELECT film_id, title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating FROM film;');
        res.json(rows);
    }
    catch (error) {
        console.error('Error al obtener films:', error);
        res.status(500).json({ message: 'Error al obtener films', error });
    }
};
exports.getFilms = getFilms;
//Lógica de de getAvailable
const getAvailable = async (_req, res) => {
    //Llamamos a getDbPool para comprobar conexion
    const db = (0, db_1.getDbPool)();
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error al consultar datos', error });
    }
};
exports.getAvailable = getAvailable;
