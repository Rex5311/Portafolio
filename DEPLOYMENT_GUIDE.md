# 🚀 Guía de Despliegue del Portafolio

Esta guía te llevará paso a paso por el proceso de desplegar tu portafolio fullstack en producción.

## 📋 Tabla de Contenidos

1. [Pre-requisitos](#pre-requisitos)
2. [Desplegar Base de Datos (Railway)](#desplegar-base-de-datos)
3. [Desplegar Backend (Render)](#desplegar-backend)
4. [Desplegar Frontend (Vercel)](#desplegar-frontend)
5. [Configuración Final](#configuración-final)

---

## Pre-requisitos

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta en [GitHub](https://github.com)
- ✅ Cuenta en [Railway](https://railway.app)
- ✅ Cuenta en [Render](https://render.com)
- ✅ Cuenta en [Vercel](https://vercel.com)
- ✅ Tu código subido a un repositorio de GitHub

---

## 1️⃣ Desplegar Base de Datos (Railway)

### Paso 1: Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app) e inicia sesión
2. Haz clic en "New Project"
3. Selecciona "Provision PostgreSQL"
4. Railway creará automáticamente una instancia de PostgreSQL

### Paso 2: Obtener Credenciales

1. Haz clic en tu base de datos PostgreSQL
2. Ve a la pestaña "Connect"
3. Copia la **Connection URL** (formato: `postgresql://usuario:contraseña@host:puerto/database`)
4. Guarda esta URL, la necesitarás para el backend

### Paso 3: Inicializar Base de Datos

**Opción A: Usando Railway CLI**

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Conectar a tu base de datos
railway connect

# Ejecutar script de schema
psql $DATABASE_URL -f backend/database/schema.sql

# Ejecutar script de seed (opcional)
psql $DATABASE_URL -f backend/database/seed.sql
```

**Opción B: Usando pgAdmin o DBeaver**

1. Abre pgAdmin o DBeaver
2. Crea una nueva conexión usando las credenciales de Railway
3. Ejecuta el contenido de `backend/database/schema.sql`
4. Ejecuta el contenido de `backend/database/seed.sql`

---

## 2️⃣ Desplegar Backend (Render)

### Paso 1: Preparar Repositorio

Asegúrate de que tu `backend/package.json` tenga estos scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "type": "module"
}
```

### Paso 2: Crear Web Service en Render

1. Ve a [render.com](https://render.com) e inicia sesión
2. Haz clic en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura el servicio:

   - **Name**: `portafolio-api`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Paso 3: Configurar Variables de Entorno

En la sección "Environment" de Render, agrega:

```
NODE_ENV=production
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/database
JWT_SECRET=tu_clave_secreta_muy_segura_aquí
CORS_ORIGIN=https://tu-dominio.vercel.app
PORT=10000
```

> 🔐 **Importante**: Genera un JWT_SECRET seguro:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### Paso 4: Desplegar

1. Haz clic en "Create Web Service"
2. Render comenzará a construir y desplegar tu backend
3. Espera a que el estado sea "Live"
4. Copia la URL de tu API (formato: `https://portafolio-api.onrender.com`)

---

## 3️⃣ Desplegar Frontend (Vercel)

### Paso 1: Preparar Frontend

Verifica que tengas el archivo `frontend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Paso 2: Desplegar en Vercel

**Opción A: Usando Vercel CLI (Recomendado)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Navegar al directorio frontend
cd frontend

# Desplegar
vercel

# Seguir las instrucciones:
# - Set up and deploy? Yes
# - Which scope? Tu cuenta
# - Link to existing project? No
# - What's your project's name? portafolio-juanagudelo
# - In which directory is your code located? ./
# - Want to override the settings? No
```

**Opción B: Usando Dashboard de Vercel**

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "Add New..." → "Project"
3. Importa tu repositorio de GitHub
4. Configura el proyecto:
   - **Project Name**: `portafolio-juanagudelo`
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Paso 3: Configurar Variables de Entorno

En "Settings" → "Environment Variables":

```
VITE_API_URL=https://portafolio-api.onrender.com/api
```

### Paso 4: Re-desplegar

1. Ve a "Deployments"
2. Haz clic en los tres puntos del último deployment
3. Selecciona "Redeploy"

---

## 4️⃣ Configuración Final

### Actualizar CORS en Backend

1. Ve a Render Dashboard
2. Selecciona tu backend service
3. Ve a "Environment"
4. Actualiza `CORS_ORIGIN` con tu URL de Vercel:
   ```
   CORS_ORIGIN=https://tu-dominio.vercel.app
   ```
5. Guarda cambios (esto re-desplegará automáticamente)

### Crear Usuario Admin

Necesitas crear un usuario administrador en tu base de datos:

```bash
# Conectar a Railway
railway connect

# O usar la Connection URL directamente
psql "postgresql://usuario:contraseña@host:puerto/database"
```

Ejecuta este SQL:

```sql
-- Hashear la contraseña (usa bcrypt en Node.js)
-- Ejemplo con bcrypt:
-- bcrypt.hash('tuContraseña', 10)

INSERT INTO usuarios (nombre, email, password, rol)
VALUES (
  'Juan Agudelo',
  'admin@juanagudelo.com',
  '$2b$10$...',  -- Contraseña hasheada
  'admin'
);
```

**Script para generar hash de contraseña:**

```javascript
// hashPassword.js
import bcrypt from 'bcrypt';

const password = 'tuContraseñaSegura';
bcrypt.hash(password, 10).then(hash => {
  console.log('Hash:', hash);
  console.log('\nEjecuta este SQL:');
  console.log(`INSERT INTO usuarios (nombre, email, password, rol)
VALUES ('Juan Agudelo', 'admin@juanagudelo.com', '${hash}', 'admin');`);
});
```

Ejecutar:
```bash
node hashPassword.js
```

### Verificar Funcionamiento

1. **Frontend**: Abre tu URL de Vercel
2. **Backend**: Prueba `https://tu-api.onrender.com/api/health`
3. **Admin Panel**: Ve a `/admin` y prueba iniciar sesión

---

## 🔧 Solución de Problemas

### Backend no se conecta a la base de datos

```bash
# Verificar DATABASE_URL
echo $DATABASE_URL

# Probar conexión
psql $DATABASE_URL -c "SELECT version();"
```

### Frontend no se comunica con Backend

1. Verifica que `VITE_API_URL` esté correctamente configurado
2. Revisa que `CORS_ORIGIN` en el backend incluya tu dominio de Vercel
3. Abre la consola del navegador para ver errores

### Error 401 en rutas protegidas

1. Verifica que el `JWT_SECRET` sea el mismo en todos los deploys
2. Asegúrate de que el token se esté enviando correctamente
3. Revisa que el middleware de autenticación esté aplicado

---

## 🎯 Checklist de Despliegue

- [ ] Base de datos desplegada en Railway
- [ ] Schema y seed ejecutados
- [ ] Backend desplegado en Render
- [ ] Variables de entorno configuradas
- [ ] Frontend desplegado en Vercel
- [ ] CORS configurado correctamente
- [ ] Usuario admin creado
- [ ] Pruebas de login funcionando
- [ ] API endpoints respondiendo
- [ ] Formulario de contacto funcionando

---

## 📝 URLs de Producción

Guarda estas URLs:

```
Frontend: https://tu-dominio.vercel.app
Backend: https://portafolio-api.onrender.com
Database: railway.app (dashboard)
```

---

## 🔄 Actualizaciones Futuras

Para actualizar tu sitio:

1. **Push a GitHub**: Los cambios se desplegarán automáticamente
2. **Vercel**: Deploy automático en cada push a `main`
3. **Render**: Deploy automático en cada push a `main`

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs en Render Dashboard
2. Revisa los logs en Vercel Dashboard
3. Verifica la consola del navegador
4. Revisa esta documentación nuevamente

---

¡Felicidades! 🎉 Tu portafolio está ahora en producción.
