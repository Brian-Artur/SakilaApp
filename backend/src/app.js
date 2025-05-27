"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const promise_1 = require("mysql2/promise");
const cors_1 = __importDefault(require("cors"));
const filmRoutes_1 = __importDefault(require("./routes/filmRoutes"));
const path_1 = __importDefault(require("path")); // agregado para el favicon
const app = (0, express_1.default)();
//Esto permite servir favicon.ico, imágenes, etc.
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Conexión base de datos (Sakila)
exports.db = (0, promise_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: '', // Cambiar según tu config
    database: 'sakila',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Ruta de prueba
app.get('/api/films', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield exports.db.query('SELECT * FROM film LIMIT 10');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al consultar la base de datos', error });
    }
}));
// Usar rutas
app.use('/api/films', filmRoutes_1.default);
// Middleware para archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/public'))); // CSS, imágenes, etc.
app.use('/dist', express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist'))); // JS compilado
// Ruta para el frontend (index.html)
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/public/index.html'));
});
exports.default = app;
