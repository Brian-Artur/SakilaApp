"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// sqlRoutes.ts
const express_1 = require("express");
const db_1 = require("../database/db"); // o donde tengas tu conexión
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Falta la consulta SQL.' });
    }
    try {
        const [rows] = await db_1.db.query(query);
        res.json(rows);
    }
    catch (error) {
        console.error('Error en consulta SQL:', error);
        res.status(500).json({ error: 'Error al ejecutar la consulta SQL.' });
    }
});
exports.default = router;
