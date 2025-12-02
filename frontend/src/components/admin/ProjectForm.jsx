import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, getAuthHeaders } from '../../config/api';

/**
 * ProjectForm Component
 * Formulario para crear o editar proyectos
 */
const ProjectForm = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'fullstack',
    github: '',
    demo: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: Array.isArray(project.technologies)
          ? project.technologies.join(', ')
          : '',
        category: project.category || 'fullstack',
        github: project.github || '',
        demo: project.demo || '',
        image: project.image || '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.technologies.trim()) {
      newErrors.technologies = 'Las tecnologías son requeridas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map((tech) => tech.trim())
          .filter((tech) => tech),
      };

      if (project) {
        // Actualizar proyecto existente
        await axios.put(API_ENDPOINTS.projectById(project.id), dataToSend, {
          headers: getAuthHeaders(),
        });
      } else {
        // Crear nuevo proyecto
        await axios.post(API_ENDPOINTS.projects, dataToSend, {
          headers: getAuthHeaders(),
        });
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      alert(
        error.response?.data?.error ||
          'Error al guardar el proyecto. Por favor intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Título del Proyecto *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500`}
          placeholder="Mi Proyecto Increíble"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Descripción *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none`}
          placeholder="Descripción detallada del proyecto..."
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Technologies */}
      <div>
        <label htmlFor="technologies" className="block text-sm font-medium mb-2">
          Tecnologías * (separadas por comas)
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.technologies ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500`}
          placeholder="React, Node.js, PostgreSQL"
        />
        {errors.technologies && (
          <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Ejemplo: React, Node.js, PostgreSQL, Tailwind CSS
        </p>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Categoría *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="fullstack">Fullstack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      {/* GitHub URL */}
      <div>
        <label htmlFor="github" className="block text-sm font-medium mb-2">
          URL de GitHub (opcional)
        </label>
        <input
          type="url"
          id="github"
          name="github"
          value={formData.github}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="https://github.com/usuario/proyecto"
        />
      </div>

      {/* Demo URL */}
      <div>
        <label htmlFor="demo" className="block text-sm font-medium mb-2">
          URL de Demo (opcional)
        </label>
        <input
          type="url"
          id="demo"
          name="demo"
          value={formData.demo}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="https://mi-proyecto.vercel.app"
        />
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-2">
          URL de Imagen (opcional)
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="project-image.jpg"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Guardando...
            </div>
          ) : project ? (
            'Actualizar Proyecto'
          ) : (
            'Crear Proyecto'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
