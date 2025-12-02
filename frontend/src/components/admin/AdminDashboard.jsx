import { useState, useEffect } from 'react';
import { FiLogOut, FiPlus, FiEdit, FiTrash2, FiMail, FiX } from 'react-icons/fi';
import axios from 'axios';
import { API_ENDPOINTS, getAuthHeaders } from '../../config/api';
import { removeAuthToken } from '../../utils/helpers';
import ProjectForm from './ProjectForm';

/**
 * AdminDashboard Component
 * Panel de administración para gestionar proyectos y mensajes
 */
const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    } else {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.projects, {
        headers: getAuthHeaders(),
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.contact, {
        headers: getAuthHeaders(),
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;

    try {
      await axios.delete(API_ENDPOINTS.projectById(id), {
        headers: getAuthHeaders(),
      });
      fetchProjects();
    } catch (error) {
      alert('Error al eliminar proyecto');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

    try {
      await axios.delete(API_ENDPOINTS.messageById(id), {
        headers: getAuthHeaders(),
      });
      fetchMessages();
    } catch (error) {
      alert('Error al eliminar mensaje');
    }
  };

  const handleUpdateMessageStatus = async (id, status) => {
    try {
      await axios.patch(
        API_ENDPOINTS.messageStatus(id),
        { status },
        { headers: getAuthHeaders() }
      );
      fetchMessages();
    } catch (error) {
      alert('Error al actualizar estado');
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    if (onLogout) onLogout();
  };

  const handleProjectFormSuccess = () => {
    setShowProjectForm(false);
    setEditingProject(null);
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Panel de Administración</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Gestiona tu portafolio
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Portafolio
              </a>
              <button onClick={handleLogout} className="btn-primary flex items-center gap-2">
                <FiLogOut />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Proyectos ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Mensajes ({messages.filter((m) => m.status === 'pending').length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'projects' ? (
          <div>
            {/* Projects Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Proyectos</h2>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectForm(true);
                }}
                className="btn-primary flex items-center gap-2"
              >
                <FiPlus />
                Nuevo Proyecto
              </button>
            </div>

            {/* Projects List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : projects.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No hay proyectos aún. ¡Crea tu primer proyecto!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="card">
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(project.technologies) ? (
                        project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded"
                          >
                            {tech}
                          </span>
                        ))
                      ) : null}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setShowProjectForm(true);
                        }}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                      >
                        <FiEdit />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                      >
                        <FiTrash2 />
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Messages Header */}
            <h2 className="text-2xl font-bold mb-6">Mensajes de Contacto</h2>

            {/* Messages List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="card text-center py-12">
                <FiMail className="text-6xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No hay mensajes aún
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="card">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold">{message.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {message.email}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={message.status}
                          onChange={(e) =>
                            handleUpdateMessageStatus(message.id, e.target.value)
                          }
                          className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="read">Leído</option>
                          <option value="replied">Respondido</option>
                        </select>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    <p className="font-semibold mb-2">{message.subject}</p>
                    <p className="text-gray-700 dark:text-gray-300">{message.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                      {new Date(message.created_at).toLocaleString('es-ES')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h2>
              <button
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <ProjectForm
                project={editingProject}
                onSuccess={handleProjectFormSuccess}
                onCancel={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
