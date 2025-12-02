# 🚀 Portafolio Web Fullstack - Juan Esteban Agudelo Carmona

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Portafolio web profesional fullstack desarrollado con tecnologías modernas. Incluye frontend responsive con React + Tailwind CSS, backend API REST con Node.js + Express, base de datos PostgreSQL, y **panel de administración con autenticación JWT**.

> 🎉 **NUEVO**: Panel de administración completo con autenticación, gestión de proyectos y mensajes.

## 👤 Sobre Mí

- **Nombre:** Juan Esteban Agudelo Carmona
- **Universidad:** Universidad del Valle
- **Programa:** Desarrollo de Software - 6to semestre
- **Ubicación:** Cali, Colombia
- **Nivel de Inglés:** A2
- **Email:** juan.agudelo@correounivalle.edu.co

## ✨ Características

### Frontend
- ⚡ Desarrollado con React 18 + Vite
- 🎨 Diseño moderno con Tailwind CSS
- 🌓 Modo oscuro/claro
- 📱 Totalmente responsive
- 🎭 Animaciones suaves
- 🔍 SEO optimizado
- 🔐 **Panel de administración completo**

### Backend
- 🚀 API REST con Node.js + Express
- 🔒 Validación de datos con express-validator
- 🛡️ Seguridad con Helmet y CORS
- 📝 Logging con Morgan
- ⚡ Manejo de errores robusto
- 🔐 **Autenticación JWT**
- 🔑 **Rutas protegidas**

### Base de Datos
- 🐘 PostgreSQL
- 📊 Diseño normalizado
- 🔄 Triggers automáticos
- 📈 Índices optimizados
- 🔍 Consultas eficientes
- 👥 **Gestión de usuarios admin**

### Panel de Administración (NUEVO)
- 🔐 Autenticación JWT segura
- 📝 Gestión CRUD de proyectos
- 📧 Gestión de mensajes de contacto
- 📊 Dashboard intuitivo
- 🎨 Interfaz con tabs y modales
- ✅ Validación de formularios

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18.2
- Vite 5.0
- Tailwind CSS 3.3
- React Icons 4.12
- Axios 1.6

### Backend
- Node.js 18+
- Express 4.18
- PostgreSQL 15
- pg (node-postgres) 8.11
- express-validator 7.0
- helmet 7.1
- cors 2.8
- dotenv 16.3
- morgan 1.10
- **bcrypt 5.1** (NUEVO)
- **jsonwebtoken 9.0** (NUEVO)

### Herramientas de Desarrollo
- ESLint
- Nodemon
- PostCSS
- Autoprefixer

## 📁 Estructura del Proyecto

```
portafolio-juan-agudelo/
├── frontend/                 # Aplicación React
│   ├── public/              # Archivos estáticos
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── admin/       # Componentes de admin (NUEVO)
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       └── ProjectForm.jsx
│   │   ├── pages/           # Páginas (NUEVO)
│   │   │   └── AdminPage.jsx
│   │   ├── config/          # Configuración (NUEVO)
│   │   │   └── api.js
│   │   ├── utils/           # Utilidades (NUEVO)
│   │   │   └── helpers.js
│   │   ├── App.jsx          # Componente principal
│   │   ├── main.jsx         # Punto de entrada
│   │   └── index.css        # Estilos globales
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json          # Config de Vercel (NUEVO)
│
├── backend/                  # API REST
│   ├── config/
│   │   └── database.js      # Configuración PostgreSQL
│   ├── middleware/          # Middleware (NUEVO)
│   │   └── auth.js          # Autenticación JWT
│   ├── routes/
│   │   ├── projects.js      # Rutas de proyectos (ACTUALIZADO)
│   │   ├── contact.js       # Rutas de contacto
│   │   └── admin.js         # Rutas de admin (NUEVO)
│   ├── scripts/             # Scripts de utilidad (NUEVO)
│   │   └── hashPassword.js
│   ├── server.js            # Servidor Express
│   ├── package.json
│   ├── render.yaml          # Config de Render (NUEVO)
│   └── .env.example         # Variables de entorno
```
│
├── database/                 # Scripts SQL
│   ├── schema.sql           # Estructura de BD
│   ├── seed.sql             # Datos de ejemplo
│   └── README.md            # Documentación BD
│
├── docs/                     # Documentación
│   ├── ARCHITECTURE.md      # Arquitectura del sistema
│   ├── DEPLOYMENT.md        # Guía de despliegue
│   └── API.md               # Documentación API
│
└── README.md                 # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18 o superior
- PostgreSQL 15 o superior
- npm o yarn
- Git

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/portafolio-juan-agudelo.git
cd portafolio-juan-agudelo
```

### 2. Configurar Base de Datos

```bash
# Crear la base de datos
psql -U postgres
CREATE DATABASE portafolio_db;
\c portafolio_db

# Ejecutar scripts SQL
\i database/schema.sql
\i database/seed.sql
\q
```

O usando archivos directamente:

```bash
psql -U postgres -d portafolio_db -f database/schema.sql
psql -U postgres -d portafolio_db -f database/seed.sql
```

### 3. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
copy .env.example .env

# Editar .env con tus credenciales
# DB_PASSWORD=tu_contraseña_postgresql
```

Contenido del archivo `.env`:

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portafolio_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
CORS_ORIGIN=http://localhost:3000
```

### 4. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install
```

## ▶️ Ejecutar en Visual Studio Code

### Opción 1: Terminal Integrada

1. Abrir el proyecto en VS Code
2. Abrir terminal integrada (Ctrl + `)
3. Dividir terminal (icono de split)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Opción 2: Scripts NPM

Puedes crear un `package.json` en la raíz:

```json
{
  "scripts": {
    "install:all": "cd frontend && npm install && cd ../backend && npm install",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\""
  }
}
```

Luego instalar concurrently:
```bash
npm install -g concurrently
npm run dev
```

### Opción 3: Extensión de VS Code

1. Instalar extensión "Tasks"
2. Crear `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "cd backend && npm run dev",
      "problemMatcher": []
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "cd frontend && npm run dev",
      "problemMatcher": []
    },
    {
      "label": "Start All",
      "dependsOn": ["Start Backend", "Start Frontend"],
      "problemMatcher": []
    }
  ]
}
```

## 🌐 URLs de Desarrollo

Una vez iniciado:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Panel Admin:** http://localhost:3000/admin

## 🔐 Panel de Administración

### Crear Usuario Admin

Antes de usar el panel de administración, necesitas crear un usuario admin:

```bash
cd backend
node scripts/hashPassword.js
# Ingresa tu contraseña
# Copia el SQL generado y ejecútalo en tu base de datos
```

O directamente en PostgreSQL (con contraseña ya hasheada):

```sql
INSERT INTO usuarios (nombre, email, password, rol)
VALUES (
  'Juan Esteban Agudelo Carmona',
  'admin@juanagudelo.com',
  '$2b$10$tu_hash_aquí',
  'admin'
);
```

### Acceso al Panel

1. Navega a: http://localhost:3000/admin
2. Ingresa credenciales:
   - **Email:** admin@juanagudelo.com
   - **Password:** (la que configuraste)

### Funcionalidades del Admin

#### Gestión de Proyectos
- ➕ Crear nuevos proyectos
- ✏️ Editar proyectos existentes
- 🗑️ Eliminar proyectos
- 📋 Ver lista completa de proyectos

#### Gestión de Mensajes
- 📧 Ver todos los mensajes de contacto
- ✅ Marcar como leído/no leído
- 🗑️ Eliminar mensajes

#### Seguridad
- 🔐 Autenticación JWT
- 🔒 Token con expiración de 24h
- 🛡️ Rutas protegidas
- 🔑 Contraseñas hasheadas con bcrypt
- **Health Check:** http://localhost:5000/api/health

## 📡 Endpoints de la API

### Proyectos

```http
GET    /api/projects              # Obtener todos los proyectos
GET    /api/projects?category=fullstack  # Filtrar por categoría
GET    /api/projects/:id          # Obtener proyecto específico
POST   /api/projects              # Crear proyecto (admin)
PUT    /api/projects/:id          # Actualizar proyecto (admin)
DELETE /api/projects/:id          # Eliminar proyecto (admin)
```

### Contacto

```http
GET    /api/contact               # Obtener mensajes (admin)
GET    /api/contact/:id           # Obtener mensaje específico
POST   /api/contact               # Enviar mensaje
PATCH  /api/contact/:id/status    # Actualizar estado
DELETE /api/contact/:id           # Eliminar mensaje
```

### Sistema

```http
GET    /api/health                # Estado del servidor
GET    /                          # Información de la API
```

Ver documentación completa en [docs/API.md](./docs/API.md)

## 🚀 Despliegue

### Frontend - Vercel

1. Conectar repositorio en Vercel
2. Configurar:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Backend - Render

1. Crear nuevo Web Service en Render
2. Configurar:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Variables de entorno (desde .env)

### Base de Datos - Railway

1. Crear proyecto en Railway
2. Añadir PostgreSQL
3. Copiar DATABASE_URL
4. Ejecutar scripts de migración

Ver guía completa en [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📝 Scripts Disponibles

### Frontend

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter
```

### Backend

```bash
npm start        # Producción
npm run dev      # Desarrollo con nodemon
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 📧 Contacto

**Juan Esteban Agudelo Carmona**

- 📧 Email: juan.agudelo@correounivalle.edu.co
- 💼 LinkedIn: [linkedin.com/in/juanagudelo](https://linkedin.com/in/juanagudelo)
- 🐙 GitHub: [github.com/juanagudelo](https://github.com/juanagudelo)
- 🌐 Portafolio: [tu-portafolio.com](https://tu-portafolio.com)

## 🎓 Proyecto Académico

Este proyecto fue desarrollado como parte del programa de Desarrollo de Software en la Universidad del Valle, Colombia.

## ⭐ Agradecimientos

- Universidad del Valle
- Comunidad de desarrolladores
- Recursos de aprendizaje online

---

**Hecho con ❤️ por Juan Esteban Agudelo Carmona**
