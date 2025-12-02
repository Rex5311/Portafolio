import express from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateProject = [
  body('title').trim().notEmpty().withMessage('El título es requerido'),
  body('description').trim().notEmpty().withMessage('La descripción es requerida'),
  body('technologies').isArray().withMessage('Las tecnologías deben ser un array'),
  body('category').isIn(['fullstack', 'frontend', 'backend']).withMessage('Categoría inválida'),
];

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let queryText = 'SELECT * FROM projects WHERE active = true ORDER BY created_at DESC';
    let params = [];

    if (category && category !== 'all') {
      queryText = 'SELECT * FROM projects WHERE active = true AND category = $1 ORDER BY created_at DESC';
      params = [category];
    }

    const result = await query(queryText, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

// GET single project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM projects WHERE id = $1 AND active = true',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
});

// POST create new project (protected)
router.post('/', authMiddleware, validateProject, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, technologies, category, github, demo, image } = req.body;
    
    const result = await query(
      `INSERT INTO projects (title, description, technologies, category, github, demo, image)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, description, JSON.stringify(technologies), category, github, demo, image]
    );

    res.status(201).json({
      message: 'Proyecto creado exitosamente',
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
});

// PUT update project (protected)
router.put('/:id', authMiddleware, validateProject, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { title, description, technologies, category, github, demo, image } = req.body;

    const result = await query(
      `UPDATE projects 
       SET title = $1, description = $2, technologies = $3, category = $4, 
           github = $5, demo = $6, image = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 AND active = true
       RETURNING *`,
      [title, description, JSON.stringify(technologies), category, github, demo, image, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json({
      message: 'Proyecto actualizado exitosamente',
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
});

// DELETE project (soft delete, protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'UPDATE projects SET active = false WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json({ message: 'Proyecto eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
});

export default router;
