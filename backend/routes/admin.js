import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { generateToken, authMiddleware } from '../middleware/auth.js';
import pool from '../config/database.js';

const router = express.Router();

/**
 * POST /api/admin/login
 * Autenticación de administrador
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
  ],
  async (req, res) => {
    try {
      // Validar errores de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Buscar usuario en la base de datos
      const result = await pool.query(
        'SELECT id, email, password FROM usuarios WHERE email = $1 AND rol = $2',
        [email, 'admin']
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      const user = result.rows[0];

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ 
          error: 'Credenciales inválidas' 
        });
      }

      // Generar token JWT
      const token = generateToken(user.id, user.email);

      res.json({
        message: 'Autenticación exitosa',
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        error: 'Error al procesar la autenticación' 
      });
    }
  }
);

/**
 * POST /api/admin/verify
 * Verificar si el token es válido
 */
router.post('/verify', authMiddleware, (req, res) => {
  res.json({
    message: 'Token válido',
    user: req.user
  });
});

/**
 * GET /api/admin/stats
 * Obtener estadísticas del portafolio (requiere autenticación)
 */
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const projectsCount = await pool.query('SELECT COUNT(*) FROM projects');
    const messagesCount = await pool.query('SELECT COUNT(*) FROM messages');
    const unreadMessages = await pool.query(
      'SELECT COUNT(*) FROM messages WHERE status = $1',
      ['unread']
    );

    res.json({
      projects: parseInt(projectsCount.rows[0].count),
      messages: parseInt(messagesCount.rows[0].count),
      unreadMessages: parseInt(unreadMessages.rows[0].count)
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ 
      error: 'Error al obtener estadísticas' 
    });
  }
});

export default router;
