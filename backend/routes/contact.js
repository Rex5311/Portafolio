import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('subject').trim().notEmpty().withMessage('El asunto es requerido'),
  body('message').trim().notEmpty().withMessage('El mensaje es requerido')
    .isLength({ min: 10 }).withMessage('El mensaje debe tener al menos 10 caracteres'),
];

// POST contact message
router.post('/', validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, subject, message } = req.body;
    
    const result = await query(
      `INSERT INTO messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`,
      [name, email, subject, message]
    );

    res.status(201).json({
      message: 'Mensaje enviado exitosamente',
      id: result.rows[0].id,
      timestamp: result.rows[0].created_at
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

// GET all messages (admin only - should add authentication)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    
    let queryText = 'SELECT * FROM messages ORDER BY created_at DESC';
    let params = [];

    if (status) {
      queryText = 'SELECT * FROM messages WHERE status = $1 ORDER BY created_at DESC';
      params = [status];
    }

    const result = await query(queryText, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// GET single message by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM messages WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
});

// PATCH update message status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const result = await query(
      'UPDATE messages SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.json({
      message: 'Estado actualizado exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ error: 'Error al actualizar el estado' });
  }
});

// DELETE message
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    res.json({ message: 'Mensaje eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Error al eliminar el mensaje' });
  }
});

export default router;
