# 🚀 Guía de Despliegue (Deployment)

Esta guía detalla cómo desplegar el portafolio fullstack en servicios gratuitos de hosting.

## 📋 Tabla de Contenidos

1. [Resumen de Servicios](#resumen-de-servicios)
2. [Base de Datos - Railway](#base-de-datos---railway)
3. [Backend - Render](#backend---render)
4. [Frontend - Vercel](#frontend---vercel)
5. [Configuración de Dominio](#configuración-de-dominio)
6. [Variables de Entorno](#variables-de-entorno)
7. [CI/CD con GitHub](#cicd-con-github)
8. [Troubleshooting](#troubleshooting)

## Resumen de Servicios

| Componente | Servicio Recomendado | Plan Gratuito | Alternativas |
|------------|---------------------|---------------|--------------|
| Frontend | Vercel | ✅ Sí | Netlify, GitHub Pages |
| Backend | Render | ✅ Sí (sleep después de inactividad) | Railway, Fly.io |
| Base de Datos | Railway | ✅ Sí ($5 gratis/mes) | Supabase, ElephantSQL |
| Dominio | Namecheap/Hostinger | ❌ No | Usar subdominio gratuito |

## Base de Datos - Railway

### Paso 1: Crear Cuenta

1. Ir a [Railway.app](https://railway.app/)
2. Registrarse con GitHub
3. Verificar email

### Paso 2: Crear Proyecto

1. Click en "New Project"
2. Seleccionar "Provision PostgreSQL"
3. Esperar a que se cree la instancia

### Paso 3: Obtener Credenciales

1. Click en la base de datos PostgreSQL
2. Ir a la pestaña "Variables"
3. Copiar las credenciales:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`
   - `DATABASE_URL` (conexión completa)

### Paso 4: Ejecutar Migraciones

**Opción A: Desde Railway CLI**

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link al proyecto
railway link

# Ejecutar migrations
railway run psql $DATABASE_URL < database/schema.sql
railway run psql $DATABASE_URL < database/seed.sql
```

**Opción B: Desde tu computadora**

```bash
# Conectar usando DATABASE_URL de Railway
psql "postgresql://usuario:password@host:puerto/database" < database/schema.sql
psql "postgresql://usuario:password@host:puerto/database" < database/seed.sql
```

**Opción C: Usando pgAdmin**

1. Abrir pgAdmin
2. Crear nueva conexión con credenciales de Railway
3. Abrir Query Tool
4. Ejecutar contenido de `schema.sql` y `seed.sql`

### Paso 5: Verificar

```sql
-- Conectar y verificar tablas
\dt

-- Ver datos
SELECT * FROM projects;
SELECT * FROM messages;
```

## Backend - Render

### Paso 1: Preparar Repositorio

Asegúrate de tener estos archivos en la raíz del backend:

**`backend/package.json`** (ya existe)

**Verificar scripts:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Paso 2: Crear Web Service en Render

1. Ir a [Render.com](https://render.com/)
2. Registrarse con GitHub
3. Click "New +" → "Web Service"
4. Conectar tu repositorio GitHub
5. Configurar:

**Build Settings:**
```
Name: portafolio-backend
Root Directory: backend
Environment: Node
Region: Frankfurt (más cercano)
Branch: main
```

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

### Paso 3: Variables de Entorno

En la sección "Environment Variables" agregar:

```
NODE_ENV=production
PORT=5000
DB_HOST=[Railway PGHOST]
DB_PORT=[Railway PGPORT]
DB_NAME=[Railway PGDATABASE]
DB_USER=[Railway PGUSER]
DB_PASSWORD=[Railway PGPASSWORD]
CORS_ORIGIN=[URL de Vercel frontend]
```

O usar DATABASE_URL directamente:

```
NODE_ENV=production
DATABASE_URL=[Railway DATABASE_URL completa]
CORS_ORIGIN=https://tu-portafolio.vercel.app
```

### Paso 4: Deploy

1. Click "Create Web Service"
2. Esperar a que se complete el build (5-10 min)
3. Verificar en los logs que no hay errores
4. Copiar la URL del servicio: `https://tu-backend.onrender.com`

### Paso 5: Verificar Backend

Probar los endpoints:

```bash
# Health check
curl https://tu-backend.onrender.com/api/health

# Proyectos
curl https://tu-backend.onrender.com/api/projects
```

## Frontend - Vercel

### Paso 1: Preparar Frontend

Actualizar la configuración de Axios en `frontend/src/components/`:

**Crear `frontend/src/config.js`:**

```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

**Actualizar componentes para usar API_URL:**

```javascript
// En Projects.jsx y Contact.jsx
import { API_URL } from '../config';

// Cambiar
await axios.get('/api/projects');
// Por
await axios.get(`${API_URL}/api/projects`);
```

**Crear `frontend/.env.production`:**

```env
VITE_API_URL=https://tu-backend.onrender.com
```

### Paso 2: Deploy en Vercel

1. Ir a [Vercel.com](https://vercel.com/)
2. Registrarse con GitHub
3. Click "Add New Project"
4. Importar tu repositorio
5. Configurar:

**Framework Preset:** Vite

**Root Directory:** `frontend`

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

### Paso 3: Variables de Entorno en Vercel

En "Environment Variables":

```
VITE_API_URL=https://tu-backend.onrender.com
```

### Paso 4: Deploy

1. Click "Deploy"
2. Esperar a que se complete (2-5 min)
3. Vercel te dará una URL: `https://tu-portafolio.vercel.app`

### Paso 5: Actualizar CORS en Backend

Regresar a Render y actualizar la variable:

```
CORS_ORIGIN=https://tu-portafolio.vercel.app
```

Guardar y esperar a que redeploy automáticamente.

## Configuración de Dominio (Opcional)

### Dominio Personalizado en Vercel

1. Comprar dominio (Namecheap, Hostinger, etc.)
2. En Vercel: Settings → Domains
3. Agregar tu dominio: `tuportafolio.com`
4. Seguir instrucciones para configurar DNS

**Registros DNS requeridos:**

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Dominio Personalizado en Render

1. En Render: Settings → Custom Domains
2. Agregar subdominio: `api.tuportafolio.com`
3. Configurar DNS:

```
Type: CNAME
Name: api
Value: tu-backend.onrender.com
```

4. Actualizar CORS_ORIGIN: `https://tuportafolio.com`

## Variables de Entorno

### Resumen de Variables

**Backend (.env en Render):**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/db
CORS_ORIGIN=https://tu-portafolio.vercel.app
```

**Frontend (.env.production en Vercel):**
```env
VITE_API_URL=https://tu-backend.onrender.com
```

## CI/CD con GitHub

### Auto-Deploy en Cambios

Tanto Vercel como Render se auto-despliegan al hacer push a main:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Ambos servicios detectan el cambio y re-despliegan automáticamente.

### Branches de Preview

**Vercel:**
- Cada rama crea un preview deployment
- PRs tienen su propia URL de preview

**Render:**
- Solo main se despliega por defecto
- Configurar branch adicionales en settings si es necesario

## Troubleshooting

### Error: CORS Policy

**Problema:** Frontend no puede conectar con backend

**Solución:**
1. Verificar CORS_ORIGIN en backend Render
2. Debe coincidir exactamente con URL de Vercel
3. Incluir protocol: `https://` no `http://`

### Error: Database Connection

**Problema:** Backend no conecta a PostgreSQL

**Solución:**
1. Verificar DATABASE_URL en Render
2. Verificar que Railway PostgreSQL está activo
3. Comprobar límites de Railway ($5/mes)

### Error: Build Failed en Vercel

**Problema:** Build falla con error de dependencias

**Solución:**
```bash
# Limpiar node_modules y package-lock
cd frontend
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Error: 503 Backend Unavailable

**Problema:** Render free tier duerme después de 15 min

**Solución:**
- Es normal en plan gratuito
- Primera petición tarda 30-60 seg en "despertar"
- Considerar ping service: [UptimeRobot](https://uptimerobot.com/)

### Error: Environment Variables Not Working

**Problema:** Variables de entorno no se aplican

**Solución:**
1. Verificar nombres exactos (case-sensitive)
2. Re-desplegar manualmente después de cambios
3. En Vercel: Redeploy desde Dashboard
4. En Render: Manual Deploy desde Dashboard

## Monitoreo Post-Deployment

### Health Checks

Crear un simple script para monitorear:

```bash
# health-check.sh
curl https://tu-backend.onrender.com/api/health
curl https://tu-portafolio.vercel.app
```

### Logs

**Render:**
- Dashboard → Logs → Ver logs en tiempo real

**Vercel:**
- Deployment → Functions → Ver logs

**Railway:**
- Database → Logs → Ver queries

## Optimizaciones Post-Deploy

### 1. Cache en Frontend

Agregar service worker para cache:

```javascript
// En index.html o vite.config.js
// Configurar cache headers
```

### 2. Compresión

Vercel y Render aplican GZIP automáticamente.

### 3. CDN

Vercel usa CDN global automáticamente.

### 4. Database Pooling

Ya configurado en `backend/config/database.js`

## Costos Estimados

| Servicio | Plan Gratuito | Límites |
|----------|---------------|---------|
| Vercel | ✅ Gratis | 100 GB bandwidth/mes |
| Render | ✅ Gratis | 750 hrs/mes, sleep después de 15 min |
| Railway | ✅ $5 gratis | $5 crédito mensual |

**Total:** $0/mes (con límites) o $7-10/mes para planes básicos sin límites.

## Alternativas de Hosting

### Frontend
- **Netlify**: Similar a Vercel
- **GitHub Pages**: Solo sitios estáticos
- **Cloudflare Pages**: Gratis, muy rápido

### Backend
- **Railway**: $5/mes, no sleep
- **Fly.io**: Gratis con limitaciones
- **Heroku**: Ya no tiene plan gratuito

### Base de Datos
- **Supabase**: PostgreSQL gratis
- **PlanetScale**: MySQL gratis
- **MongoDB Atlas**: MongoDB gratis

## Checklist de Deployment

- [ ] Base de datos creada en Railway
- [ ] Scripts SQL ejecutados (schema + seed)
- [ ] Backend desplegado en Render
- [ ] Variables de entorno configuradas en Render
- [ ] Backend responde correctamente (health check)
- [ ] Frontend actualizado con API_URL
- [ ] Frontend desplegado en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] CORS configurado correctamente
- [ ] Dominio personalizado configurado (opcional)
- [ ] Auto-deploy configurado desde GitHub
- [ ] Logs verificados sin errores
- [ ] Todas las funcionalidades probadas en producción

---

**¡Felicidades! Tu portafolio está en línea 🎉**

Para soporte adicional, consulta:
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app/)
