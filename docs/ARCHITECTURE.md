# 🏗️ Arquitectura del Sistema

## Visión General

El portafolio está construido siguiendo una arquitectura de tres capas (Three-tier architecture):

```
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                  │
│                   (Frontend - React)                     │
│              ┌──────────────────────────┐               │
│              │   Componentes React      │               │
│              │   - Navbar, Hero, etc.   │               │
│              │   Tailwind CSS           │               │
│              │   Estado Local           │               │
│              └──────────────────────────┘               │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTP/HTTPS (Axios)
                         │ REST API Calls
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   CAPA DE LÓGICA DE NEGOCIO             │
│                  (Backend - Node.js/Express)             │
│              ┌──────────────────────────┐               │
│              │   Routes & Controllers   │               │
│              │   - /api/projects        │               │
│              │   - /api/contact         │               │
│              │   Middleware             │               │
│              │   Validación             │               │
│              └──────────────────────────┘               │
└────────────────────────┬─────────────────────────────────┘
                         │ SQL Queries (pg)
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE DATOS                         │
│                   (PostgreSQL)                           │
│              ┌──────────────────────────┐               │
│              │   Tablas:                │               │
│              │   - usuarios             │               │
│              │   - projects             │               │
│              │   - messages             │               │
│              │   - skills               │               │
│              └──────────────────────────┘               │
└─────────────────────────────────────────────────────────┘
```

## Frontend (React + Vite + Tailwind)

### Estructura de Componentes

```
App (Root)
│
├── Navbar (Fixed, Responsive)
│   ├── Logo
│   ├── Navigation Links
│   └── Dark Mode Toggle
│
├── Hero (Landing Section)
│   ├── Introduction
│   ├── CTA Buttons
│   └── Social Links
│
├── About (Personal Info)
│   ├── Profile Image
│   ├── Description
│   └── Stats Grid
│
├── Skills (Technologies)
│   ├── Skill Categories
│   ├── Progress Bars
│   └── Additional Skills
│
├── Projects (Portfolio)
│   ├── Filter Buttons
│   ├── Project Cards
│   └── Dynamic Loading
│
├── Contact (Form)
│   ├── Contact Info
│   ├── Contact Form
│   └── Status Messages
│
└── Footer
    ├── Links
    ├── Social Media
    └── Copyright
```

### Flujo de Datos Frontend

```
Usuario Interacción
        ↓
  Componente React
        ↓
   Event Handler
        ↓
 Axios API Call ──→ Backend API
        ↓
  Estado actualizado
        ↓
    Re-render
        ↓
   UI Actualizada
```

### Características Técnicas

- **Gestión de Estado**: React Hooks (useState, useEffect)
- **Enrutamiento**: Scroll suave con anchor links
- **Estilizado**: Tailwind CSS + CSS custom
- **Peticiones HTTP**: Axios
- **Optimización**: 
  - Code splitting
  - Lazy loading
  - Image optimization
  - Tree shaking (Vite)

## Backend (Node.js + Express)

### Arquitectura Backend

```
server.js (Entry Point)
    │
    ├── Middleware Stack
    │   ├── helmet (Security)
    │   ├── cors (Cross-Origin)
    │   ├── morgan (Logging)
    │   └── express.json (Body Parser)
    │
    ├── Routes
    │   ├── /api/projects → routes/projects.js
    │   └── /api/contact → routes/contact.js
    │
    ├── Database Connection
    │   └── config/database.js (PostgreSQL Pool)
    │
    └── Error Handlers
        ├── 404 Handler
        └── Global Error Handler
```

### Flujo de Petición HTTP

```
Cliente HTTP Request
        ↓
    Express Server
        ↓
  Middleware Chain
   (CORS, Helmet, etc.)
        ↓
    Route Matcher
        ↓
   Validation Middleware
   (express-validator)
        ↓
  Route Handler/Controller
        ↓
  Database Query (pg)
        ↓
    PostgreSQL
        ↓
   Response Formatting
        ↓
  HTTP Response (JSON)
        ↓
    Cliente
```

### Estructura de Rutas

#### Projects Routes (`/api/projects`)

```javascript
GET    /                 → getAllProjects()
GET    /:id              → getProjectById()
POST   /                 → createProject()
PUT    /:id              → updateProject()
DELETE /:id              → deleteProject()
```

#### Contact Routes (`/api/contact`)

```javascript
POST   /                 → sendMessage()
GET    /                 → getAllMessages()
GET    /:id              → getMessageById()
PATCH  /:id/status       → updateMessageStatus()
DELETE /:id              → deleteMessage()
```

### Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de origen cruzado
- **Validation**: Sanitización de inputs
- **Error Handling**: No exponer stack traces en producción
- **SQL Injection Prevention**: Consultas parametrizadas

## Base de Datos (PostgreSQL)

### Diseño Relacional

```sql
┌──────────────┐
│  usuarios    │
│──────────────│
│ id (PK)      │
│ nombre       │
│ email (UK)   │
│ password_hash│
│ rol          │
└──────────────┘

┌──────────────┐
│  projects    │
│──────────────│
│ id (PK)      │
│ title        │
│ description  │
│ technologies │ (JSONB)
│ category     │
│ github       │
│ demo         │
│ image        │
│ active       │
└──────────────┘

┌──────────────┐
│  messages    │
│──────────────│
│ id (PK)      │
│ name         │
│ email        │
│ subject      │
│ message      │
│ status       │
└──────────────┘

┌──────────────┐
│  skills      │
│──────────────│
│ id (PK)      │
│ name         │
│ category     │
│ level        │
│ icon         │
│ active       │
└──────────────┘
```

### Índices

```sql
-- Optimización de consultas frecuentes
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_active ON projects(active);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
```

### Triggers

```sql
-- Actualización automática de timestamps
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Patrones de Diseño

### 1. MVC (Model-View-Controller)

- **Model**: Tablas PostgreSQL + Queries
- **View**: Componentes React
- **Controller**: Route handlers Express

### 2. RESTful API

- Recursos bien definidos (projects, messages)
- Métodos HTTP semánticos (GET, POST, PUT, DELETE)
- Respuestas JSON consistentes
- Códigos de estado HTTP apropiados

### 3. Separation of Concerns

- Frontend: UI y experiencia de usuario
- Backend: Lógica de negocio y validación
- Database: Persistencia de datos

## Flujo Completo: Ejemplo de Envío de Mensaje

```
1. Usuario completa formulario de contacto
        ↓
2. Frontend valida campos (React)
        ↓
3. onClick → handleSubmit()
        ↓
4. axios.post('/api/contact', formData)
        ↓
5. Request llega al backend Express
        ↓
6. CORS middleware verifica origen
        ↓
7. express-validator valida datos
        ↓
8. Route handler procesa request
        ↓
9. Query SQL INSERT into messages
        ↓
10. PostgreSQL almacena el mensaje
        ↓
11. Backend responde 201 Created + JSON
        ↓
12. Frontend recibe response
        ↓
13. Estado actualizado (setStatus)
        ↓
14. UI muestra mensaje de éxito
        ↓
15. Formulario se limpia
```

## Escalabilidad

### Consideraciones para Crecer

1. **Frontend**
   - Implementar state management (Redux/Zustand)
   - Agregar lazy loading de componentes
   - Implementar service workers (PWA)

2. **Backend**
   - Implementar cache (Redis)
   - Rate limiting
   - Autenticación JWT
   - WebSockets para real-time

3. **Base de Datos**
   - Connection pooling (ya implementado)
   - Read replicas
   - Particionamiento de tablas
   - Índices adicionales según uso

## Performance

### Optimizaciones Implementadas

- **Frontend**: Vite para build ultra-rápido
- **Backend**: Connection pool para PostgreSQL
- **Database**: Índices en columnas frecuentemente consultadas
- **HTTP**: GZIP compression (via hosting)

## Monitoreo y Logging

- **Morgan**: Logs HTTP en desarrollo
- **Console logs**: Queries SQL con duración
- **Error tracking**: Stack traces en desarrollo

## Testing Strategy (Recomendado)

```
Frontend:
  - Unit: Jest + React Testing Library
  - E2E: Cypress/Playwright

Backend:
  - Unit: Jest
  - Integration: Supertest
  - API: Postman/Insomnia

Database:
  - Migrations: Manual SQL scripts
  - Seed data: seed.sql
```

## Deployment Architecture

```
GitHub Repository
        ↓
    ┌───┴───┐
    │       │
Frontend  Backend
(Vercel)  (Render)
    │       │
    └───┬───┘
        │
   Database
   (Railway)
```

Ver más detalles en [DEPLOYMENT.md](./DEPLOYMENT.md)

## Mejoras Futuras

- [ ] Autenticación de administrador
- [ ] Panel de administración
- [ ] Upload de imágenes
- [ ] Blog integrado
- [ ] Analytics
- [ ] Newsletter
- [ ] Multi-idioma (i18n)
- [ ] Tests automatizados
- [ ] CI/CD pipeline
- [ ] Docker containerization

---

Esta arquitectura está diseñada para ser:
- ✅ **Escalable**: Fácil de agregar nuevas features
- ✅ **Mantenible**: Código organizado y documentado
- ✅ **Segura**: Mejores prácticas de seguridad
- ✅ **Performante**: Optimizaciones en todas las capas
