-- Insertar proyectos reales de GitHub en Supabase
-- Ejecuta este SQL en Supabase SQL Editor

-- Limpiar proyectos existentes (opcional, comenta si quieres mantener los anteriores)
-- DELETE FROM projects;

-- Proyecto 1: Portafolio Web Fullstack
INSERT INTO projects (
  title,
  description,
  technologies,
  category,
  github,
  demo,
  image,
  active
) VALUES (
  'Portafolio Web Fullstack',
  'Portafolio web profesional desarrollado con React + Vite, Tailwind CSS, Node.js + Express, y PostgreSQL migrado a Supabase. Incluye panel de administración con autenticación JWT, gestión de proyectos y mensajes de contacto.',
  ARRAY['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Supabase', 'PostgreSQL'],
  'fullstack',
  'https://github.com/Rex5311/Portafolio',
  'https://portafolio-2-anij.onrender.com',
  'https://hsxqkllexhcjimpxdkrn.supabase.co/storage/v1/object/public/portfolio/proyecto_portafolio.png',
  true
);

-- Proyecto 2: Sistema de Restaurante
INSERT INTO projects (
  title,
  description,
  technologies,
  category,
  github,
  demo,
  image,
  active
) VALUES (
  'Sistema de Restaurante',
  'Aplicación fullstack para gestión de restaurante con menú digital, carrito de compras y sistema de pedidos. Desarrollada con JavaScript vanilla, CSS y backend con Node.js.',
  ARRAY['JavaScript', 'Node.js', 'HTML', 'CSS', 'Express'],
  'fullstack',
  'https://github.com/Rex5311/Restaurante-FS',
  NULL,
  'https://hsxqkllexhcjimpxdkrn.supabase.co/storage/v1/object/public/portfolio/proyecto_restaurante.png',
  true
);

-- Proyecto 3: Portal CEA San Emigdio (Colaboración)
INSERT INTO projects (
  title,
  description,
  technologies,
  category,
  github,
  demo,
  image,
  active
) VALUES (
  'Portal CEA San Emigdio',
  'Portal web para el Centro Educativo Ambiental San Emigdio - Parque Ecológico. Proyecto colaborativo desarrollado con JavaScript fullstack, incluyendo gestión de contenido y información del parque. Contribuidor activo en el desarrollo frontend y backend.',
  ARRAY['JavaScript', 'HTML', 'CSS', 'Node.js', 'Fullstack'],
  'fullstack',
  'https://github.com/APACHES6X/Portal-CEA-San-Emigdio',
  NULL,
  'https://hsxqkllexhcjimpxdkrn.supabase.co/storage/v1/object/public/portfolio/proyecto_cea.png',
  true
);

-- Proyecto 4: Parcial POE
INSERT INTO projects (
  title,
  description,
  technologies,
  category,
  github,
  demo,
  image,
  active
) VALUES (
  'Parcial 2 - Programación Orientada a Eventos',
  'Proyecto académico desarrollado para el curso de Programación Orientada a Eventos en la Universidad del Valle. Implementa conceptos de manejo de eventos y arquitectura basada en eventos.',
  ARRAY['JavaScript', 'POE', 'Event-Driven'],
  'backend',
  'https://github.com/Rex5311/Parcial-2-POE',
  NULL,
  'https://hsxqkllexhcjimpxdkrn.supabase.co/storage/v1/object/public/portfolio/proyecto_poe.png',
  true
);

-- Verificar que se insertaron correctamente
SELECT id, title, category, github, active FROM projects ORDER BY created_at;
