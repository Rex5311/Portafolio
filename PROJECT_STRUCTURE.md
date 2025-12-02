# 📂 Estructura Completa del Proyecto

```
portafolio-juan-agudelo/
│
├── 📁 frontend/                          # Aplicación React
│   ├── 📁 public/                        # Archivos estáticos
│   │   └── favicon.svg                   # Icono del sitio
│   │
│   ├── 📁 src/                           # Código fuente
│   │   ├── 📁 components/                # Componentes React
│   │   │   ├── Navbar.jsx               # Barra de navegación
│   │   │   ├── Hero.jsx                 # Sección hero/principal
│   │   │   ├── About.jsx                # Sobre mí
│   │   │   ├── Skills.jsx               # Habilidades técnicas
│   │   │   ├── Projects.jsx             # Portafolio de proyectos
│   │   │   ├── Contact.jsx              # Formulario de contacto
│   │   │   └── Footer.jsx               # Pie de página
│   │   │
│   │   ├── App.jsx                       # Componente principal
│   │   ├── main.jsx                      # Punto de entrada
│   │   └── index.css                     # Estilos globales + Tailwind
│   │
│   ├── index.html                        # HTML principal
│   ├── package.json                      # Dependencias frontend
│   ├── vite.config.js                    # Configuración Vite
│   ├── tailwind.config.js                # Configuración Tailwind
│   ├── postcss.config.js                 # Configuración PostCSS
│   └── .eslintrc.cjs                     # Configuración ESLint
│
├── 📁 backend/                           # API REST Node.js
│   ├── 📁 config/                        # Configuraciones
│   │   └── database.js                   # Conexión PostgreSQL
│   │
│   ├── 📁 routes/                        # Rutas de la API
│   │   ├── projects.js                   # CRUD de proyectos
│   │   └── contact.js                    # CRUD de mensajes
│   │
│   ├── server.js                         # Servidor Express
│   ├── package.json                      # Dependencias backend
│   ├── .env.example                      # Ejemplo variables de entorno
│   └── .env                              # Variables (no versionar)
│
├── 📁 database/                          # Scripts SQL
│   ├── schema.sql                        # Estructura de BD
│   ├── seed.sql                          # Datos de ejemplo
│   └── README.md                         # Documentación BD
│
├── 📁 docs/                              # Documentación
│   ├── ARCHITECTURE.md                   # Arquitectura del sistema
│   ├── DEPLOYMENT.md                     # Guía de despliegue
│   ├── API.md                            # Documentación API REST
│   └── VSCODE_GUIDE.md                   # Guía VS Code
│
├── 📁 .vscode/                           # Configuración VS Code
│   ├── settings.json                     # Configuración del editor
│   └── extensions.json                   # Extensiones recomendadas
│
├── README.md                             # Documentación principal
├── QUICKSTART.md                         # Guía inicio rápido
├── CHANGELOG.md                          # Historial de cambios
├── CONTRIBUTING.md                       # Guía de contribución
├── LICENSE                               # Licencia MIT
├── .gitignore                            # Archivos ignorados por Git
└── PROJECT_STRUCTURE.md                  # Este archivo
```

## 📊 Descripción de Directorios

### 🎨 Frontend (`frontend/`)

**Responsabilidad:** Interfaz de usuario, experiencia visual, interacción con el usuario

**Tecnologías:**
- React 18.2 - Framework UI
- Vite 5.0 - Build tool
- Tailwind CSS 3.3 - Estilizado
- React Icons 4.12 - Iconografía
- Axios 1.6 - HTTP client

**Componentes Principales:**
- `Navbar` - Navegación responsive con modo oscuro
- `Hero` - Landing page con CTA y presentación
- `About` - Información personal y estadísticas
- `Skills` - Habilidades técnicas con barras de progreso
- `Projects` - Grid de proyectos con filtros
- `Contact` - Formulario validado de contacto
- `Footer` - Links y redes sociales

### 🔧 Backend (`backend/`)

**Responsabilidad:** Lógica de negocio, API REST, validación, comunicación con BD

**Tecnologías:**
- Node.js 18+ - Runtime
- Express 4.18 - Framework web
- pg 8.11 - Driver PostgreSQL
- express-validator 7.0 - Validación
- helmet 7.1 - Seguridad
- cors 2.8 - Cross-origin
- morgan 1.10 - Logging

**Endpoints:**
- `GET/POST/PUT/DELETE /api/projects` - Gestión de proyectos
- `GET/POST/PATCH/DELETE /api/contact` - Gestión de mensajes
- `GET /api/health` - Health check

### 💾 Database (`database/`)

**Responsabilidad:** Persistencia de datos, estructura relacional

**Tecnología:** PostgreSQL 15

**Tablas:**
- `usuarios` - Administradores del sistema
- `projects` - Proyectos del portafolio
- `messages` - Mensajes de contacto
- `skills` - Habilidades (opcional)

**Features:**
- Índices para optimización
- Triggers automáticos
- Constraints y validaciones
- Soft deletes

### 📚 Docs (`docs/`)

**Contenido:**
- Arquitectura de tres capas
- Guía de deployment en Vercel/Render/Railway
- Documentación completa de API REST
- Tutorial paso a paso para VS Code

### ⚙️ Configuración (`.vscode/`)

**Archivos:**
- `settings.json` - Format on save, ESLint, Prettier
- `extensions.json` - Extensiones recomendadas

## 📈 Flujo de Datos

```
Usuario (Navegador)
        ↓
   Frontend React
   (localhost:3000)
        ↓
   HTTP Request (Axios)
        ↓
   Backend Express
   (localhost:5000)
        ↓
   SQL Query (pg)
        ↓
   PostgreSQL
   (localhost:5432)
        ↓
   Response JSON
        ↓
   Frontend Update
        ↓
   UI Re-render
```

## 🔐 Archivos Sensibles (No Versionar)

```
❌ backend/.env
❌ node_modules/
❌ dist/
❌ build/
❌ .DS_Store
❌ *.log
```

Estos están en `.gitignore`

## 📦 Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Dependencias y scripts |
| `.env` | Variables de entorno |
| `vite.config.js` | Build del frontend |
| `tailwind.config.js` | Tema y estilos |
| `.eslintrc.cjs` | Reglas de linting |
| `.gitignore` | Ignorar archivos |

## 🎯 Puntos de Entrada

### Frontend
```javascript
// main.jsx → App.jsx → Componentes
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
```

### Backend
```javascript
// server.js → routes → database
import express from 'express';
import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';
```

## 📱 Características Implementadas

✅ Diseño responsive (mobile-first)  
✅ Modo oscuro/claro persistente  
✅ Validación de formularios  
✅ Manejo de errores robusto  
✅ API REST completa  
✅ Base de datos normalizada  
✅ Seguridad (CORS, Helmet)  
✅ Hot reload (Vite + Nodemon)  
✅ Logging de peticiones  
✅ Documentación completa  

## 🚀 Próximas Features

🔜 Autenticación JWT  
🔜 Panel de administración  
🔜 Upload de imágenes  
🔜 Blog integrado  
🔜 Tests (Jest + RTL)  
🔜 CI/CD pipeline  
🔜 Docker containerization  
🔜 Rate limiting  

## 📊 Estadísticas del Proyecto

- **Líneas de código:** ~3,500+
- **Componentes React:** 7
- **Endpoints API:** 13
- **Tablas de BD:** 4
- **Archivos de documentación:** 8
- **Tiempo de desarrollo:** ~20 horas

## 🛠️ Comandos Útiles

```powershell
# Instalación inicial
cd frontend && npm install
cd backend && npm install

# Desarrollo
cd backend && npm run dev      # Puerto 5000
cd frontend && npm run dev     # Puerto 3000

# Producción
cd backend && npm start
cd frontend && npm run build && npm run preview

# Base de datos
psql -U postgres -d portafolio_db -f database/schema.sql
psql -U postgres -d portafolio_db -f database/seed.sql

# Linting
cd frontend && npm run lint
```

## 📞 Soporte

**Documentación:** Ver carpeta `docs/`  
**Issues:** Crear issue en GitHub  
**Email:** juan.agudelo@correounivalle.edu.co  

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0  
**Autor:** Juan Esteban Agudelo Carmona
