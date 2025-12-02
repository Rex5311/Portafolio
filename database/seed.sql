-- ============================================
-- DATOS DE EJEMPLO - PORTAFOLIO
-- Script para poblar la base de datos con datos iniciales
-- ============================================

-- ============================================
-- INSERTAR USUARIO ADMINISTRADOR
-- Password: admin123 (debe ser hasheado en producción)
-- ============================================
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Juan Esteban Agudelo Carmona', 'juan.agudelo@correounivalle.edu.co', '$2b$10$example_hash_change_this', 'admin');

-- ============================================
-- INSERTAR PROYECTOS
-- ============================================
INSERT INTO projects (title, description, technologies, category, github, demo, image) VALUES
(
    'Sistema de Gestión Académica',
    'Aplicación web completa para gestionar estudiantes, cursos y calificaciones. Incluye panel administrativo con gráficos y reportes en tiempo real.',
    '["React", "Node.js", "PostgreSQL", "Express", "Tailwind CSS"]',
    'fullstack',
    'https://github.com/juanagudelo/academic-system',
    'https://academic-system-demo.com',
    'project1.jpg'
),
(
    'E-commerce Platform',
    'Tienda online completa con carrito de compras, pasarela de pagos integrada, panel de administración de productos, inventario y órdenes.',
    '["React", "Tailwind CSS", "Node.js", "MongoDB", "Stripe"]',
    'fullstack',
    'https://github.com/juanagudelo/ecommerce',
    'https://ecommerce-demo.com',
    'project2.jpg'
),
(
    'Task Management App',
    'Aplicación de gestión de tareas con funcionalidades de colaboración en tiempo real, notificaciones push y sincronización entre dispositivos.',
    '["React", "Firebase", "Material-UI", "Redux"]',
    'frontend',
    'https://github.com/juanagudelo/task-manager',
    'https://task-manager-demo.com',
    'project3.jpg'
),
(
    'API REST Blog',
    'API RESTful completa para un sistema de blog con autenticación JWT, CRUD completo, paginación, búsqueda y filtros avanzados.',
    '["Node.js", "Express", "PostgreSQL", "JWT", "Swagger"]',
    'backend',
    'https://github.com/juanagudelo/blog-api',
    NULL,
    'project4.jpg'
),
(
    'Weather Dashboard',
    'Dashboard interactivo del clima con gráficos, pronósticos de 7 días, mapas interactivos y alertas meteorológicas usando APIs externas.',
    '["React", "Chart.js", "Tailwind CSS", "OpenWeather API"]',
    'frontend',
    'https://github.com/juanagudelo/weather-dashboard',
    'https://weather-dashboard-demo.com',
    'project5.jpg'
),
(
    'Inventory System',
    'Sistema de inventario empresarial con reportes detallados, alertas de stock mínimo, gestión de proveedores y análisis de ventas.',
    '["Python", "FastAPI", "MySQL", "React", "Pandas"]',
    'fullstack',
    'https://github.com/juanagudelo/inventory-system',
    NULL,
    'project6.jpg'
),
(
    'Social Network API',
    'Backend para red social con sistema de amigos, publicaciones, comentarios, likes y mensajería instantánea en tiempo real.',
    '["Node.js", "Express", "MongoDB", "Socket.io", "Redis"]',
    'backend',
    'https://github.com/juanagudelo/social-api',
    NULL,
    'project7.jpg'
),
(
    'Portfolio CMS',
    'Sistema de gestión de contenidos para portafolios con editor WYSIWYG, gestión de proyectos y blog integrado.',
    '["React", "Node.js", "PostgreSQL", "TipTap", "Tailwind CSS"]',
    'fullstack',
    'https://github.com/juanagudelo/portfolio-cms',
    'https://portfolio-cms-demo.com',
    'project8.jpg'
);

-- ============================================
-- INSERTAR HABILIDADES
-- ============================================
INSERT INTO skills (name, category, level, icon) VALUES
-- Frontend
('React', 'Frontend', 85, 'SiReact'),
('JavaScript', 'Frontend', 90, 'SiJavascript'),
('HTML5', 'Frontend', 95, 'SiHtml5'),
('CSS3', 'Frontend', 90, 'SiCss3'),
('Tailwind CSS', 'Frontend', 85, 'SiTailwindcss'),
('Vue.js', 'Frontend', 70, 'SiVuedotjs'),

-- Backend
('Node.js', 'Backend', 80, 'SiNodedotjs'),
('Express', 'Backend', 80, 'SiExpress'),
('Python', 'Backend', 75, 'SiPython'),
('FastAPI', 'Backend', 70, 'SiFastapi'),

-- Bases de Datos
('PostgreSQL', 'Database', 85, 'SiPostgresql'),
('MySQL', 'Database', 85, 'SiMysql'),
('MongoDB', 'Database', 75, 'SiMongodb'),
('Redis', 'Database', 65, 'SiRedis'),

-- Herramientas
('Git', 'Tools', 85, 'SiGit'),
('GitHub', 'Tools', 90, 'SiGithub'),
('VS Code', 'Tools', 95, 'SiVisualstudiocode'),
('Postman', 'Tools', 80, 'SiPostman'),
('Figma', 'Tools', 70, 'SiFigma'),
('Docker', 'Tools', 65, 'SiDocker');

-- ============================================
-- INSERTAR MENSAJES DE EJEMPLO
-- ============================================
INSERT INTO messages (name, email, subject, message, status) VALUES
(
    'María González',
    'maria.gonzalez@example.com',
    'Consulta sobre proyecto',
    'Hola Juan, me interesa conocer más sobre tu experiencia en desarrollo fullstack. ¿Podrías contactarme?',
    'pending'
),
(
    'Carlos Ramírez',
    'carlos.ramirez@tech.com',
    'Oportunidad laboral',
    'Hola, tenemos una posición junior en nuestra empresa. Tu perfil nos interesa. ¿Estarías disponible para una entrevista?',
    'read'
),
(
    'Ana Torres',
    'ana.torres@startup.io',
    'Colaboración en proyecto',
    'Estamos buscando desarrolladores para un proyecto innovador. Tu portafolio nos impresionó. ¿Te gustaría participar?',
    'replied'
);

-- ============================================
-- VERIFICAR DATOS INSERTADOS
-- ============================================
SELECT 'Datos insertados exitosamente' AS status;
SELECT COUNT(*) AS total_projects FROM projects;
SELECT COUNT(*) AS total_skills FROM skills;
SELECT COUNT(*) AS total_messages FROM messages;
