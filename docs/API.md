# 📡 Documentación de la API

Documentación completa de los endpoints REST del backend.

**Base URL:** `http://localhost:5000` (desarrollo) | `https://tu-backend.onrender.com` (producción)

## Tabla de Contenidos

- [Autenticación](#autenticación)
- [Respuestas](#respuestas)
- [Códigos de Estado](#códigos-de-estado)
- [Endpoints](#endpoints)
  - [Sistema](#sistema)
  - [Proyectos](#proyectos)
  - [Contacto](#contacto)

## Autenticación

Actualmente la API no requiere autenticación para endpoints públicos. Los endpoints de administración (POST, PUT, DELETE) deberían protegerse con JWT en una implementación futura.

## Respuestas

Todas las respuestas son en formato JSON.

### Respuesta Exitosa

```json
{
  "message": "Operación exitosa",
  "data": { ... }
}
```

### Respuesta de Error

```json
{
  "error": "Mensaje de error descriptivo",
  "details": [ ... ] // Opcional, para errores de validación
}
```

## Códigos de Estado

| Código | Significado |
|--------|-------------|
| 200 | OK - Petición exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Error en los datos enviados |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Sistema

### Health Check

Verifica el estado del servidor.

```http
GET /api/health
```

**Respuesta:**

```json
{
  "status": "OK",
  "message": "Portafolio API is running",
  "timestamp": "2024-12-02T10:30:00.000Z"
}
```

### Información de la API

Obtiene información general de la API.

```http
GET /
```

**Respuesta:**

```json
{
  "message": "Welcome to Juan Agudelo's Portfolio API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "projects": "/api/projects",
    "contact": "/api/contact"
  }
}
```

---

## Proyectos

### Obtener Todos los Proyectos

Obtiene lista de todos los proyectos activos.

```http
GET /api/projects
```

**Query Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| category | string | Filtrar por categoría: `fullstack`, `frontend`, `backend`, `all` |

**Ejemplo:**

```http
GET /api/projects?category=fullstack
```

**Respuesta 200:**

```json
[
  {
    "id": 1,
    "title": "Sistema de Gestión Académica",
    "description": "Aplicación web completa para gestionar estudiantes...",
    "technologies": ["React", "Node.js", "PostgreSQL", "Express"],
    "category": "fullstack",
    "github": "https://github.com/juanagudelo/academic-system",
    "demo": "https://academic-system-demo.com",
    "image": "project1.jpg",
    "active": true,
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "E-commerce Platform",
    "description": "Tienda online completa con carrito de compras...",
    "technologies": ["React", "Tailwind", "Node.js", "MongoDB"],
    "category": "fullstack",
    "github": "https://github.com/juanagudelo/ecommerce",
    "demo": "https://ecommerce-demo.com",
    "image": "project2.jpg",
    "active": true,
    "created_at": "2024-02-01T10:00:00.000Z",
    "updated_at": "2024-02-01T10:00:00.000Z"
  }
]
```

### Obtener Proyecto por ID

Obtiene un proyecto específico.

```http
GET /api/projects/:id
```

**Parámetros de URL:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | integer | ID del proyecto |

**Ejemplo:**

```http
GET /api/projects/1
```

**Respuesta 200:**

```json
{
  "id": 1,
  "title": "Sistema de Gestión Académica",
  "description": "Aplicación web completa para gestionar estudiantes, cursos y calificaciones.",
  "technologies": ["React", "Node.js", "PostgreSQL", "Express"],
  "category": "fullstack",
  "github": "https://github.com/juanagudelo/academic-system",
  "demo": "https://academic-system-demo.com",
  "image": "project1.jpg",
  "active": true,
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

**Respuesta 404:**

```json
{
  "error": "Proyecto no encontrado"
}
```

### Crear Proyecto

Crea un nuevo proyecto (requiere autenticación en producción).

```http
POST /api/projects
```

**Body (JSON):**

```json
{
  "title": "Nuevo Proyecto",
  "description": "Descripción del proyecto",
  "technologies": ["React", "Node.js"],
  "category": "fullstack",
  "github": "https://github.com/usuario/repo",
  "demo": "https://demo.com",
  "image": "image.jpg"
}
```

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título del proyecto |
| description | string | ✅ | Descripción detallada |
| technologies | array | ✅ | Lista de tecnologías |
| category | string | ✅ | `fullstack`, `frontend`, o `backend` |
| github | string | ❌ | URL del repositorio |
| demo | string | ❌ | URL de la demo |
| image | string | ❌ | Nombre de la imagen |

**Respuesta 201:**

```json
{
  "message": "Proyecto creado exitosamente",
  "project": {
    "id": 9,
    "title": "Nuevo Proyecto",
    "description": "Descripción del proyecto",
    "technologies": ["React", "Node.js"],
    "category": "fullstack",
    "github": "https://github.com/usuario/repo",
    "demo": "https://demo.com",
    "image": "image.jpg",
    "active": true,
    "created_at": "2024-12-02T10:00:00.000Z",
    "updated_at": "2024-12-02T10:00:00.000Z"
  }
}
```

**Respuesta 400 (Error de validación):**

```json
{
  "errors": [
    {
      "msg": "El título es requerido",
      "param": "title",
      "location": "body"
    },
    {
      "msg": "Categoría inválida",
      "param": "category",
      "location": "body"
    }
  ]
}
```

### Actualizar Proyecto

Actualiza un proyecto existente.

```http
PUT /api/projects/:id
```

**Body:** Mismo formato que POST

**Respuesta 200:**

```json
{
  "message": "Proyecto actualizado exitosamente",
  "project": { ... }
}
```

**Respuesta 404:**

```json
{
  "error": "Proyecto no encontrado"
}
```

### Eliminar Proyecto

Elimina (soft delete) un proyecto.

```http
DELETE /api/projects/:id
```

**Respuesta 200:**

```json
{
  "message": "Proyecto eliminado exitosamente"
}
```

**Respuesta 404:**

```json
{
  "error": "Proyecto no encontrado"
}
```

---

## Contacto

### Enviar Mensaje

Envía un mensaje desde el formulario de contacto.

```http
POST /api/contact
```

**Body (JSON):**

```json
{
  "name": "María González",
  "email": "maria@example.com",
  "subject": "Consulta sobre proyecto",
  "message": "Hola Juan, me interesa conocer más sobre tu experiencia..."
}
```

**Campos:**

| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| name | string | ✅ | No vacío |
| email | string | ✅ | Email válido |
| subject | string | ✅ | No vacío |
| message | string | ✅ | Mínimo 10 caracteres |

**Respuesta 201:**

```json
{
  "message": "Mensaje enviado exitosamente",
  "id": 15,
  "timestamp": "2024-12-02T10:30:00.000Z"
}
```

**Respuesta 400:**

```json
{
  "errors": [
    {
      "msg": "Email inválido",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "El mensaje debe tener al menos 10 caracteres",
      "param": "message",
      "location": "body"
    }
  ]
}
```

### Obtener Todos los Mensajes

Obtiene todos los mensajes recibidos (admin).

```http
GET /api/contact
```

**Query Parameters:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| status | string | Filtrar por estado: `pending`, `read`, `replied` |

**Ejemplo:**

```http
GET /api/contact?status=pending
```

**Respuesta 200:**

```json
[
  {
    "id": 1,
    "name": "María González",
    "email": "maria@example.com",
    "subject": "Consulta sobre proyecto",
    "message": "Hola Juan, me interesa conocer más...",
    "status": "pending",
    "created_at": "2024-12-01T15:30:00.000Z",
    "updated_at": "2024-12-01T15:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Carlos Ramírez",
    "email": "carlos@tech.com",
    "subject": "Oportunidad laboral",
    "message": "Tenemos una posición junior...",
    "status": "read",
    "created_at": "2024-12-02T09:00:00.000Z",
    "updated_at": "2024-12-02T10:00:00.000Z"
  }
]
```

### Obtener Mensaje por ID

Obtiene un mensaje específico.

```http
GET /api/contact/:id
```

**Respuesta 200:**

```json
{
  "id": 1,
  "name": "María González",
  "email": "maria@example.com",
  "subject": "Consulta sobre proyecto",
  "message": "Hola Juan, me interesa conocer más sobre tu experiencia en desarrollo fullstack.",
  "status": "pending",
  "created_at": "2024-12-01T15:30:00.000Z",
  "updated_at": "2024-12-01T15:30:00.000Z"
}
```

### Actualizar Estado del Mensaje

Actualiza el estado de un mensaje.

```http
PATCH /api/contact/:id/status
```

**Body (JSON):**

```json
{
  "status": "read"
}
```

**Estados válidos:**
- `pending` - Pendiente
- `read` - Leído
- `replied` - Respondido

**Respuesta 200:**

```json
{
  "message": "Estado actualizado exitosamente",
  "data": {
    "id": 1,
    "name": "María González",
    "email": "maria@example.com",
    "subject": "Consulta sobre proyecto",
    "message": "Hola Juan...",
    "status": "read",
    "created_at": "2024-12-01T15:30:00.000Z",
    "updated_at": "2024-12-02T10:30:00.000Z"
  }
}
```

**Respuesta 400:**

```json
{
  "error": "Estado inválido"
}
```

### Eliminar Mensaje

Elimina un mensaje permanentemente.

```http
DELETE /api/contact/:id
```

**Respuesta 200:**

```json
{
  "message": "Mensaje eliminado exitosamente"
}
```

---

## Ejemplos de Uso

### JavaScript (Axios)

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Obtener proyectos
const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/projects`);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

// Enviar mensaje de contacto
const sendMessage = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/contact`, formData);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

### cURL

```bash
# Obtener proyectos
curl http://localhost:5000/api/projects

# Filtrar proyectos por categoría
curl http://localhost:5000/api/projects?category=fullstack

# Enviar mensaje
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "subject": "Consulta",
    "message": "Hola, me gustaría contactarte"
  }'

# Crear proyecto
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nuevo Proyecto",
    "description": "Descripción del proyecto",
    "technologies": ["React", "Node.js"],
    "category": "fullstack"
  }'
```

### Python (requests)

```python
import requests

API_URL = "http://localhost:5000"

# Obtener proyectos
response = requests.get(f"{API_URL}/api/projects")
projects = response.json()
print(projects)

# Enviar mensaje
data = {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "subject": "Consulta",
    "message": "Hola, me gustaría contactarte"
}
response = requests.post(f"{API_URL}/api/contact", json=data)
result = response.json()
print(result)
```

## Rate Limiting

Actualmente no hay rate limiting implementado. En producción, se recomienda:

- Limitar requests por IP: 100 requests/15 min
- Endpoints sensibles: 5 requests/min
- Implementar con `express-rate-limit`

## CORS

La API acepta requests desde:
- `http://localhost:3000` (desarrollo)
- Tu dominio de Vercel (producción)

Configurado en `server.js` con la variable `CORS_ORIGIN`.

## Webhooks (Futuro)

Posibles webhooks para notificaciones:
- `POST /webhooks/contact` - Nuevo mensaje recibido
- `POST /webhooks/project` - Nuevo proyecto creado

## Versionado

Actualmente v1.0.0. Futuras versiones podrían usar:
- `/api/v1/projects`
- `/api/v2/projects`

## Testing

Colección de Postman disponible (crear manualmente):

1. Importar endpoints
2. Configurar environment con `API_URL`
3. Ejecutar tests

---

**Mantenido por:** Juan Esteban Agudelo Carmona  
**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0
