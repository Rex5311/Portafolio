-- ================================================
-- PORTAFOLIO DATABASE - COMPLETE SETUP
-- Esquema + Datos de ejemplo
-- Base de datos para portafolio de Juan Agudelo
-- ================================================

-- ================================================
-- PART 1: DROP EXISTING TABLES
-- ================================================
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- ================================================
-- PART 2: CREATE TABLES
-- ================================================

-- TABLA: usuarios
-- Gestión de usuarios administradores
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_usuarios_email ON usuarios(email);

-- TABLA: projects
-- Portafolio de proyectos
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

CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_active ON projects(active);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- TABLA: messages
-- Mensajes de contacto
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_email ON messages(email);

-- TABLA: skills
-- Habilidades técnicas
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('frontend', 'backend', 'database', 'tools', 'other')),
    level VARCHAR(20) DEFAULT 'intermediate' CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    icon VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_order ON skills(order_index);

-- ================================================
-- PART 3: CREATE TRIGGERS & FUNCTIONS
-- ================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- PART 4: INSERT DATA - SKILLS
-- ================================================
INSERT INTO skills (name, category, level, icon, order_index) VALUES
-- Frontend
('React', 'frontend', 'advanced', 'FaReact', 1),
('JavaScript', 'frontend', 'advanced', 'SiJavascript', 2),
('TypeScript', 'frontend', 'intermediate', 'SiTypescript', 3),
('HTML5', 'frontend', 'expert', 'FaHtml5', 4),
('CSS3', 'frontend', 'expert', 'FaCss3Alt', 5),
('Tailwind CSS', 'frontend', 'advanced', 'SiTailwindcss', 6),

-- Backend
('Node.js', 'backend', 'advanced', 'FaNodeJs', 7),
('Express', 'backend', 'advanced', 'SiExpress', 8),
('Python', 'backend', 'intermediate', 'FaPython', 9),
('Java', 'backend', 'intermediate', 'FaJava', 10),

-- Database
('PostgreSQL', 'database', 'advanced', 'SiPostgresql', 11),
('MongoDB', 'database', 'intermediate', 'SiMongodb', 12),
('MySQL', 'database', 'intermediate', 'SiMysql', 13),

-- Tools
('Git', 'tools', 'advanced', 'FaGitAlt', 14),
('GitHub', 'tools', 'advanced', 'FaGithub', 15),
('VS Code', 'tools', 'expert', 'SiVisualstudiocode', 16),
('Docker', 'tools', 'beginner', 'FaDocker', 17);

-- ================================================
-- PART 5: INSERT DATA - PROJECTS
-- ================================================
INSERT INTO projects (title, description, technologies, category, github, demo, image) VALUES
(
    'E-Commerce Platform',
    'Plataforma de comercio electrónico completa con carrito de compras, sistema de pagos integrado con Stripe, panel de administración para gestión de productos y órdenes. Incluye autenticación de usuarios, filtros avanzados y búsqueda en tiempo real.',
    ARRAY['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    'fullstack',
    'https://github.com/juanagudelo/ecommerce-platform',
    'https://ecommerce-demo.vercel.app',
    'ecommerce-project.jpg'
),
(
    'Task Management App',
    'Aplicación de gestión de tareas con funcionalidades de drag & drop, categorización por proyectos, asignación de prioridades y fechas límite. Sistema de notificaciones y colaboración en tiempo real.',
    ARRAY['React', 'TypeScript', 'Firebase', 'Material-UI', 'Redux'],
    'frontend',
    'https://github.com/juanagudelo/task-manager',
    'https://taskmanager-demo.netlify.app',
    'task-manager-project.jpg'
),
(
    'REST API - Blog Platform',
    'API RESTful robusta para plataforma de blogs con autenticación JWT, CRUD de posts, sistema de comentarios, likes y categorías. Incluye paginación, filtros y búsqueda avanzada.',
    ARRAY['Node.js', 'Express', 'MongoDB', 'JWT', 'Mongoose'],
    'backend',
    'https://github.com/juanagudelo/blog-api',
    'https://blog-api-demo.herokuapp.com/api/docs',
    'blog-api-project.jpg'
),
(
    'Weather Dashboard',
    'Dashboard interactivo del clima con datos en tiempo real de múltiples ciudades, gráficos de temperatura y pronósticos semanales. Geolocalización automática y búsqueda de ciudades.',
    ARRAY['React', 'OpenWeather API', 'Chart.js', 'CSS3', 'Axios'],
    'frontend',
    'https://github.com/juanagudelo/weather-dashboard',
    'https://weather-dashboard-demo.vercel.app',
    'weather-project.jpg'
),
(
    'Social Media Analytics',
    'Sistema fullstack de análisis de redes sociales con recopilación de métricas, visualización de datos con gráficos interactivos y generación de reportes automatizados.',
    ARRAY['React', 'Python', 'FastAPI', 'PostgreSQL', 'D3.js', 'Docker'],
    'fullstack',
    'https://github.com/juanagudelo/social-analytics',
    'https://analytics-demo.vercel.app',
    'analytics-project.jpg'
);

-- ================================================
-- PART 6: INSERT DATA - MESSAGES
-- ================================================
INSERT INTO messages (name, email, message, status) VALUES
(
    'María González',
    'maria.gonzalez@example.com',
    '¡Hola Juan! Me encantó tu portafolio. Estamos buscando un desarrollador fullstack para nuestro startup. ¿Estarías interesado en conversar?',
    'unread'
),
(
    'Carlos Rodríguez',
    'carlos.r@techcompany.com',
    'Hola, vi tu proyecto de E-Commerce y me impresionó mucho. Me gustaría discutir una oportunidad laboral contigo.',
    'read'
);

-- ================================================
-- PART 7: VERIFICATION & SUMMARY
-- ================================================
DO $$
DECLARE
    skill_count INTEGER;
    project_count INTEGER;
    message_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO skill_count FROM skills;
    SELECT COUNT(*) INTO project_count FROM projects;
    SELECT COUNT(*) INTO message_count FROM messages;
    
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'DATABASE SETUP COMPLETED SUCCESSFULLY';
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'Skills created: %', skill_count;
    RAISE NOTICE 'Projects created: %', project_count;
    RAISE NOTICE 'Messages created: %', message_count;
    RAISE NOTICE '==========================================';
END $$;

-- ================================================
-- END OF DATABASE SETUP
-- ================================================
