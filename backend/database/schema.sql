-- ================================================
-- PORTAFOLIO DATABASE SCHEMA
-- Base de datos para portafolio de Juan Agudelo
-- ================================================

-- Eliminar tablas si existen (para recrear)
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- ================================================
-- TABLA: usuarios
-- Gestión de usuarios administradores
-- ================================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsqueda por email
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- ================================================
-- TABLA: projects
-- Portafolio de proyectos
-- ================================================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('fullstack', 'frontend', 'backend')),
    github VARCHAR(255),
    demo VARCHAR(255),
    image VARCHAR(255),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_active ON projects(active);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- ================================================
-- TABLA: messages
-- Mensajes de contacto
-- ================================================
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_email ON messages(email);

-- ================================================
-- TABLA: skills
-- Habilidades técnicas
-- ================================================
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('frontend', 'backend', 'database', 'tools', 'other')),
    level VARCHAR(20) DEFAULT 'intermediate' CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    icon VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ordenar skills
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_order ON skills(order_index);

-- ================================================
-- TRIGGERS: Actualización automática de timestamps
-- ================================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para usuarios
CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para projects
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para messages
CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- COMENTARIOS EN TABLAS
-- ================================================
COMMENT ON TABLE usuarios IS 'Usuarios administradores del sistema';
COMMENT ON TABLE projects IS 'Proyectos del portafolio';
COMMENT ON TABLE messages IS 'Mensajes de contacto recibidos';
COMMENT ON TABLE skills IS 'Habilidades técnicas y herramientas';

-- ================================================
-- FIN DEL SCHEMA
-- ================================================
