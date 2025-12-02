/**
 * API Configuration
 * Centraliza las URLs y configuración de API
 */

// Obtener URL base de la API desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Configuración de endpoints
export const API_ENDPOINTS = {
  // Proyectos
  projects: `${API_BASE_URL}/api/projects`,
  projectById: (id) => `${API_BASE_URL}/api/projects/${id}`,
  
  // Contacto
  contact: `${API_BASE_URL}/api/contact`,
  messageById: (id) => `${API_BASE_URL}/api/contact/${id}`,
  messageStatus: (id) => `${API_BASE_URL}/api/contact/${id}/status`,
  
  // Admin (autenticación)
  adminLogin: `${API_BASE_URL}/api/admin/login`,
  adminVerify: `${API_BASE_URL}/api/admin/verify`,
  
  // Health check
  health: `${API_BASE_URL}/api/health`,
};

// Configuración de timeout
export const API_TIMEOUT = 10000; // 10 segundos

// Headers comunes
export const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default API_BASE_URL;
