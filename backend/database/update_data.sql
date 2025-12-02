-- ================================================
-- ACTUALIZACIÓN DE DATOS - Juan Esteban Agudelo
-- ================================================

-- Limpiar datos anteriores
DELETE FROM skills;
DELETE FROM projects;

-- ================================================
-- SKILLS ACTUALIZADAS - Según perfil real
-- ================================================
INSERT INTO skills (name, category, level, icon, order_index) VALUES
-- Frontend
('React', 'frontend', 'advanced', 'FaReact', 1),
('JavaScript', 'frontend', 'advanced', 'SiJavascript', 2),
('HTML5', 'frontend', 'expert', 'FaHtml5', 3),
('CSS3', 'frontend', 'expert', 'FaCss3Alt', 4),
('Tailwind CSS', 'frontend', 'advanced', 'SiTailwindcss', 5),

-- Backend - Python como principal
('Python', 'backend', 'advanced', 'FaPython', 6),
('FastAPI', 'backend', 'intermediate', 'SiFastapi', 7),
('Express', 'backend', 'intermediate', 'SiExpress', 8),
('Node.js', 'backend', 'intermediate', 'FaNodeJs', 9),

-- Database - Nivel intermedio
('PostgreSQL', 'database', 'intermediate', 'SiPostgresql', 10),
('MySQL', 'database', 'intermediate', 'SiMysql', 11),
('MongoDB', 'database', 'intermediate', 'SiMongodb', 12),

-- Tools y otras competencias
('Git', 'tools', 'advanced', 'FaGitAlt', 13),
('GitHub', 'tools', 'expert', 'FaGithub', 14),
('VS Code', 'tools', 'expert', 'SiVisualstudiocode', 15),
('Inteligencia Artificial', 'other', 'intermediate', 'FaBrain', 16),
('Machine Learning', 'other', 'beginner', 'SiTensorflow', 17);

-- ================================================
-- PROYECTOS REALES de GitHub - Rex5311
-- ================================================

-- Nota: Basado en https://github.com/Rex5311
-- Agrega proyectos reales aquí cuando estén disponibles

INSERT INTO projects (title, description, technologies, category, github, demo, image) VALUES
(
    'Portafolio Web Fullstack',
    'Portafolio web profesional desarrollado con React, Node.js y PostgreSQL. Incluye panel de administración con autenticación JWT, gestión de proyectos y mensajes de contacto. Diseño responsive con modo oscuro y optimizado para SEO.',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Express', 'JWT'],
    'fullstack',
    'https://github.com/Rex5311/portafolio-fullstack',
    'https://portafolio-demo.vercel.app',
    'portafolio-project.jpg'
),
(
    'Proyecto de IA',
    'Aplicación de inteligencia artificial para [descripción del proyecto]. Implementa modelos de machine learning para análisis y predicción de datos.',
    ARRAY['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
    'backend',
    'https://github.com/Rex5311',
    NULL,
    'ai-project.jpg'
),
(
    'Sistema de Gestión',
    'Sistema web para gestión y administración desarrollado con Python y FastAPI. Incluye autenticación, CRUD completo y generación de reportes.',
    ARRAY['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker'],
    'fullstack',
    'https://github.com/Rex5311',
    NULL,
    'management-system.jpg'
);

-- ================================================
-- Verificación
-- ================================================
SELECT COUNT(*) as total_skills FROM skills;
SELECT COUNT(*) as total_projects FROM projects;
