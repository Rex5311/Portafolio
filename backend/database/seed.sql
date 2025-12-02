-- ================================================
-- SEED DATA - Datos de ejemplo
-- Portafolio de Juan Esteban Agudelo Carmona
-- ================================================

-- ================================================
-- SKILLS: Habilidades técnicas
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
-- PROJECTS: Proyectos de ejemplo
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
-- MESSAGES: Mensajes de ejemplo (opcional)
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
-- VERIFICACIÓN DE DATOS
-- ================================================

-- Mostrar resumen de datos insertados
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
    RAISE NOTICE 'DATOS INSERTADOS EXITOSAMENTE';
    RAISE NOTICE '==========================================';
    RAISE NOTICE 'Skills insertadas: %', skill_count;
    RAISE NOTICE 'Proyectos insertados: %', project_count;
    RAISE NOTICE 'Mensajes insertados: %', message_count;
    RAISE NOTICE '==========================================';
END $$;

-- ================================================
-- FIN DEL SEED DATA
-- ================================================
