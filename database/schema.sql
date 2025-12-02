-- ============================================
-- PORTAFOLIO DATABASE - JUAN AGUDELO
-- Script de creación de base de datos
-- PostgreSQL
-- ============================================

-- Crear la base de datos (ejecutar como superusuario)
-- CREATE DATABASE portafolio_db;

-- Conectar a la base de datos
\c portafolio_db;

-- ============================================
-- TABLA: usuarios
-- Gestión de usuarios administradores
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'admin' CHECK (rol IN ('admin', 'superadmin')),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: projects
-- Almacena los proyectos del portafolio
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    technologies JSONB NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('fullstack', 'frontend', 'backend')),
    github VARCHAR(255),
    demo VARCHAR(255),
    image VARCHAR(255),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: messages
-- Mensajes de contacto del formulario
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA: skills
-- Habilidades y tecnologías (opcional)
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level INTEGER CHECK (level >= 0 AND level <= 100),
    icon VARCHAR(100),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ÍNDICES para optimizar consultas
-- ============================================
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_active ON projects(active);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_skills_category ON skills(category);

-- ============================================
-- TRIGGER para actualizar updated_at automáticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMENTARIOS en las tablas
-- ============================================
COMMENT ON TABLE usuarios IS 'Usuarios administradores del sistema';
COMMENT ON TABLE projects IS 'Proyectos del portafolio';
COMMENT ON TABLE messages IS 'Mensajes de contacto recibidos';
COMMENT ON TABLE skills IS 'Habilidades y tecnologías';

COMMENT ON COLUMN projects.technologies IS 'Array JSON con las tecnologías usadas';
COMMENT ON COLUMN messages.status IS 'Estado del mensaje: pending, read, replied';

-- Mensaje de finalización
SELECT 'Base de datos creada exitosamente' AS status;
