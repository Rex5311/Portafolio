# Scripts de Base de Datos - PostgreSQL

Este directorio contiene los scripts SQL para configurar y poblar la base de datos del portafolio.

## Archivos

- **schema.sql**: Script de creación de tablas, índices y triggers
- **seed.sql**: Datos de ejemplo para poblar la base de datos

## Instalación de PostgreSQL

### Windows

1. Descargar PostgreSQL desde: https://www.postgresql.org/download/windows/
2. Ejecutar el instalador y seguir las instrucciones
3. Recordar la contraseña del usuario `postgres`
4. PostgreSQL se instalará por defecto en el puerto 5432

### Verificar instalación

```powershell
psql --version
```

## Crear la Base de Datos

### Opción 1: Usando pgAdmin (GUI)

1. Abrir pgAdmin
2. Conectar al servidor local
3. Click derecho en "Databases" → "Create" → "Database"
4. Nombre: `portafolio_db`
5. Ejecutar los scripts desde Query Tool

### Opción 2: Línea de comandos

```powershell
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE portafolio_db;

# Conectar a la nueva base de datos
\c portafolio_db

# Ejecutar el script de schema
\i schema.sql

# Ejecutar el script de datos
\i seed.sql

# Verificar tablas creadas
\dt
```

### Opción 3: Script completo

```powershell
# Ejecutar schema
psql -U postgres -d portafolio_db -f schema.sql

# Ejecutar seed data
psql -U postgres -d portafolio_db -f seed.sql
```

## Estructura de la Base de Datos

### Tabla: usuarios
Gestión de usuarios administradores del sistema.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único (PK) |
| nombre | VARCHAR(100) | Nombre completo |
| email | VARCHAR(150) | Email único |
| password_hash | VARCHAR(255) | Contraseña hasheada |
| rol | VARCHAR(20) | admin o superadmin |
| activo | BOOLEAN | Estado del usuario |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### Tabla: projects
Proyectos del portafolio.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único (PK) |
| title | VARCHAR(200) | Título del proyecto |
| description | TEXT | Descripción detallada |
| technologies | JSONB | Array de tecnologías |
| category | VARCHAR(20) | fullstack/frontend/backend |
| github | VARCHAR(255) | URL del repositorio |
| demo | VARCHAR(255) | URL de la demo |
| image | VARCHAR(255) | URL de la imagen |
| active | BOOLEAN | Proyecto activo |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### Tabla: messages
Mensajes del formulario de contacto.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único (PK) |
| name | VARCHAR(100) | Nombre del remitente |
| email | VARCHAR(150) | Email del remitente |
| subject | VARCHAR(200) | Asunto |
| message | TEXT | Contenido del mensaje |
| status | VARCHAR(20) | pending/read/replied |
| created_at | TIMESTAMP | Fecha de recepción |
| updated_at | TIMESTAMP | Fecha de actualización |

### Tabla: skills
Habilidades y tecnologías (opcional).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único (PK) |
| name | VARCHAR(100) | Nombre de la habilidad |
| category | VARCHAR(50) | Categoría |
| level | INTEGER | Nivel (0-100) |
| icon | VARCHAR(100) | Nombre del ícono |
| active | BOOLEAN | Habilidad activa |
| created_at | TIMESTAMP | Fecha de creación |

## Consultas Útiles

### Ver todos los proyectos
```sql
SELECT * FROM projects WHERE active = true ORDER BY created_at DESC;
```

### Ver mensajes pendientes
```sql
SELECT * FROM messages WHERE status = 'pending' ORDER BY created_at DESC;
```

### Ver habilidades por categoría
```sql
SELECT * FROM skills WHERE active = true ORDER BY category, level DESC;
```

### Buscar proyectos por tecnología
```sql
SELECT * FROM projects 
WHERE technologies::text ILIKE '%React%' 
AND active = true;
```

### Estadísticas
```sql
SELECT 
    COUNT(*) as total_proyectos,
    COUNT(CASE WHEN category = 'fullstack' THEN 1 END) as fullstack,
    COUNT(CASE WHEN category = 'frontend' THEN 1 END) as frontend,
    COUNT(CASE WHEN category = 'backend' THEN 1 END) as backend
FROM projects WHERE active = true;
```

## Backup y Restauración

### Crear backup
```powershell
pg_dump -U postgres portafolio_db > backup.sql
```

### Restaurar backup
```powershell
psql -U postgres portafolio_db < backup.sql
```

## Configuración del Backend

Asegúrate de configurar las variables de entorno en el archivo `.env` del backend:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portafolio_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aqui
```

## Solución de Problemas

### Error de conexión
- Verificar que PostgreSQL esté corriendo
- Verificar credenciales en .env
- Verificar que el puerto 5432 esté disponible

### Error de permisos
```sql
GRANT ALL PRIVILEGES ON DATABASE portafolio_db TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
```

## Mantenimiento

### Limpiar mensajes antiguos (más de 6 meses)
```sql
DELETE FROM messages 
WHERE created_at < NOW() - INTERVAL '6 months' 
AND status = 'replied';
```

### Optimizar base de datos
```sql
VACUUM ANALYZE;
```
