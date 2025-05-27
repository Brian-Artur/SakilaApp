"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilms = void 0;
const app_1 = require("../app");
const getFilms = async (_req, res) => {
    try {
        const [rows] = await app_1.db.query('SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film LIMIT 20');
        res.json(rows);
    }
    catch (error) {
        console.error('Error al obtener films:', error);
        res.status(500).json({ message: 'Error al obtener films', error });
    }
};
exports.getFilms = getFilms;
