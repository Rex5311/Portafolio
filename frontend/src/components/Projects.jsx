import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

/**
 * Projects Component
 * Muestra el portafolio de proyectos con filtrado por categoría
 */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  /**
   * Obtiene los proyectos desde la API
   */
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_ENDPOINTS.projects);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Error al cargar proyectos');
      // Fallback to static projects if API fails
      setProjects(staticProjects);
    } finally {
      setLoading(false);
    }
  };

  // Static projects as fallback
  const staticProjects = [
    {
      id: 1,
      title: 'Sistema de Gestión Académica',
      description:
        'Aplicación web completa para gestionar estudiantes, cursos y calificaciones con panel administrativo.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Express'],
      category: 'fullstack',
      github: 'https://github.com/juanagudelo/academic-system',
      demo: 'https://academic-system-demo.com',
      image: 'project1.jpg',
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description:
        'Tienda online con carrito de compras, pasarela de pagos y panel de administración de productos.',
      technologies: ['React', 'Tailwind', 'Node.js', 'MongoDB'],
      category: 'fullstack',
      github: 'https://github.com/juanagudelo/ecommerce',
      demo: 'https://ecommerce-demo.com',
      image: 'project2.jpg',
    },
    {
      id: 3,
      title: 'Task Management App',
      description:
        'Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      category: 'frontend',
      github: 'https://github.com/juanagudelo/task-manager',
      demo: 'https://task-manager-demo.com',
      image: 'project3.jpg',
    },
    {
      id: 4,
      title: 'API REST Blog',
      description:
        'API RESTful completa para un sistema de blog con autenticación JWT y CRUD completo.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      category: 'backend',
      github: 'https://github.com/juanagudelo/blog-api',
      demo: null,
      image: 'project4.jpg',
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      description:
        'Dashboard interactivo del clima con gráficos y pronósticos usando APIs externas.',
      technologies: ['React', 'Chart.js', 'Tailwind', 'OpenWeather API'],
      category: 'frontend',
      github: 'https://github.com/juanagudelo/weather-dashboard',
      demo: 'https://weather-dashboard-demo.com',
      image: 'project5.jpg',
    },
    {
      id: 6,
      title: 'Inventory System',
      description:
        'Sistema de inventario con reportes, alertas de stock y gestión de proveedores.',
      technologies: ['Python', 'FastAPI', 'MySQL', 'React'],
      category: 'fullstack',
      github: 'https://github.com/juanagudelo/inventory-system',
      demo: null,
      image: 'project6.jpg',
    },
  ];

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'fullstack', label: 'Fullstack' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section
      id="projects"
      className="section-padding bg-gray-100 dark:bg-gray-800"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mis <span className="gradient-text">Proyectos</span>
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Algunos de los proyectos en los que he trabajado
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category.value
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="card group cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-4 bg-gradient-to-br from-primary-500 to-purple-600 h-48 flex items-center justify-center">
                  <FiFolder className="text-white text-6xl opacity-50" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub className="text-gray-900" size={24} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink className="text-gray-900" size={24} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No se encontraron proyectos en esta categoría.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
