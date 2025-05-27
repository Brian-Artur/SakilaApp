import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors';
import filmRoutes from './routes/filmRoutes';
import path from 'path';// agregado para el favicon

const app = express();

//Esto permite servir favicon.ico, imágenes, etc.
app.use(express.static(path.join(__dirname, '../public')));

// Middleware
app.use(cors());
app.use(express.json());

// Conexión base de datos (Sakila)
export const db = createPool({
  host: 'localhost',
  user: 'root',
  password: 'mariadb', // Cambiar según tu config
  database: 'sakila',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Ruta de prueba
app.get('/api/films', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM film');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar la base de datos', error });
  }
});

// Usar rutas
app.use('/api/films', filmRoutes);

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, '../../frontend/public')));  // CSS, imágenes, etc.
app.use('/dist', express.static(path.join(__dirname, '../../frontend/dist')));  // JS compilado

// Ruta para el frontend (index.html)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

export default app;
