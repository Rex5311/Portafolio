# ⚡ Comandos Rápidos - Portafolio Fullstack

Copia y pega estos comandos para poner en marcha tu portafolio rápidamente.

---

## 🚀 Setup Inicial (Primeria Vez)

### 1. Instalar Dependencias

```powershell
# Backend
cd backend
npm install

# Frontend
cd ..\frontend
npm install
cd ..
```

---

### 2. Crear Base de Datos PostgreSQL

```powershell
# Iniciar psql
psql -U postgres

# Dentro de psql:
CREATE DATABASE portafolio_db;
\q
```

---

### 3. Ejecutar Scripts SQL

```powershell
# Schema (estructura)
cd backend\database
psql -U postgres -d portafolio_db -f schema.sql

# Seed (datos de ejemplo)
psql -U postgres -d portafolio_db -f seed.sql
cd ..\..
```

---

### 4. Generar JWT Secret

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Copia el resultado y úsalo en el paso 5**

---

### 5. Crear archivo .env en Backend

```powershell
# En: backend/.env
```

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portafolio_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña_postgres
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=pega_aquí_el_secret_del_paso_4
```

---

### 6. Crear archivo .env en Frontend

```powershell
# En: frontend/.env
```

```env
VITE_API_URL=http://localhost:5000
```

---

### 7. Crear Usuario Admin

```powershell
cd backend
node scripts/hashPassword.js
```

**Ingresa tu contraseña deseada, copia el SQL generado y ejecuta:**

```powershell
psql -U postgres -d portafolio_db
# Pega el SQL que te dio el script
# \q para salir
```

---

## ▶️ Ejecutar Aplicación (Cada Vez)

### Opción 1: Dos Terminales

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### Opción 2: Un Solo Comando (requiere setup extra)

```powershell
# Instalar concurrently globalmente (solo una vez)
npm install -g concurrently

# Crear package.json en raíz con este contenido:
# {
#   "scripts": {
#     "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""
#   }
# }

# Luego ejecutar:
npm run dev
```

---

## 🌐 URLs de Acceso

Después de ejecutar:

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

---

## 🔐 Credenciales de Admin

Después de crear el usuario admin:

```
URL: http://localhost:3000/admin
Email: admin@juanagudelo.com
Password: (la que configuraste en el paso 7)
```

---

## 🧪 Probar API con curl

### Health Check
```powershell
curl http://localhost:5000/api/health
```

### Obtener Proyectos
```powershell
curl http://localhost:5000/api/projects
```

### Login Admin
```powershell
curl -X POST http://localhost:5000/api/admin/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@juanagudelo.com\",\"password\":\"tu_password\"}'
```

---

## 🛠️ Comandos Útiles de PostgreSQL

### Conectar a base de datos
```powershell
psql -U postgres -d portafolio_db
```

### Ver tablas
```sql
\dt
```

### Ver usuarios
```sql
SELECT * FROM usuarios;
```

### Ver proyectos
```sql
SELECT id, title, category FROM projects;
```

### Ver mensajes
```sql
SELECT id, name, email, status FROM messages;
```

### Salir de psql
```sql
\q
```

---

## 🔄 Reset Base de Datos (Si algo sale mal)

```powershell
# Eliminar y recrear base de datos
psql -U postgres
DROP DATABASE IF EXISTS portafolio_db;
CREATE DATABASE portafolio_db;
\q

# Volver a ejecutar scripts
cd backend\database
psql -U postgres -d portafolio_db -f schema.sql
psql -U postgres -d portafolio_db -f seed.sql
cd ..\..

# Crear usuario admin de nuevo
cd backend
node scripts/hashPassword.js
# Ejecutar el SQL generado
```

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module 'bcrypt'"

```powershell
cd backend
npm install bcrypt jsonwebtoken
```

### Error: "ECONNREFUSED ::1:5432"

```powershell
# Verificar que PostgreSQL está corriendo
# En Windows: Services -> PostgreSQL
# O ejecutar:
pg_ctl status
```

### Error: "password authentication failed"

```powershell
# Verificar credenciales en backend/.env
# DB_USER y DB_PASSWORD deben coincidir con PostgreSQL
```

### Error: "Port 3000 is already in use"

```powershell
# Cambiar puerto en frontend:
# vite.config.js -> server: { port: 3001 }
```

### Error: "Port 5000 is already in use"

```powershell
# Cambiar puerto en backend/.env:
# PORT=5001
```

---

## 📦 Instalar Dependencias Faltantes

### Si falta bcrypt o jsonwebtoken

```powershell
cd backend
npm install bcrypt@^5.1.1 jsonwebtoken@^9.0.2
```

### Si falta axios en frontend

```powershell
cd frontend
npm install axios@^1.6.2
```

---

## 🧹 Limpiar Instalación

```powershell
# Backend
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

# Frontend
cd ..\frontend
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
cd ..
```

---

## 🔒 Cambiar Contraseña de Admin

```powershell
# Generar nuevo hash
cd backend
node scripts/hashPassword.js
# Ingresa nueva contraseña

# Ejecutar SQL de actualización:
psql -U postgres -d portafolio_db
UPDATE usuarios 
SET password = 'pega_nuevo_hash_aquí' 
WHERE email = 'admin@juanagudelo.com';
\q
```

---

## 📊 Ver Estado de la Aplicación

### Backend
```powershell
# Ver si está corriendo
netstat -ano | findstr :5000
```

### Frontend
```powershell
# Ver si está corriendo
netstat -ano | findstr :3000
```

---

## 🚀 Build para Producción

### Frontend
```powershell
cd frontend
npm run build
# Genera carpeta dist/
```

### Backend
```powershell
cd backend
npm start
# Usa producción, no desarrollo
```

---

## 📝 Git - Comandos Básicos

### Inicializar repositorio
```powershell
git init
git add .
git commit -m "Initial commit - Portafolio fullstack completo"
```

### Conectar a GitHub
```powershell
git remote add origin https://github.com/tu-usuario/tu-repo.git
git branch -M main
git push -u origin main
```

### Actualizar código
```powershell
git add .
git commit -m "Descripción de cambios"
git push
```

---

## 🎯 Verificación Rápida (Checklist)

Ejecuta estos comandos para verificar que todo funciona:

```powershell
# 1. Backend corriendo
curl http://localhost:5000/api/health

# 2. Frontend corriendo (abrir en navegador)
start http://localhost:3000

# 3. Admin panel (abrir en navegador)
start http://localhost:3000/admin

# 4. Base de datos tiene datos
psql -U postgres -d portafolio_db -c "SELECT COUNT(*) FROM projects;"
```

Si todos funcionan: **¡Estás listo! ✅**

---

## 📞 Ayuda Rápida

- **No inicia backend**: Verifica PostgreSQL esté corriendo
- **No inicia frontend**: Verifica puerto 3000 esté libre
- **Error de conexión DB**: Verifica credenciales en .env
- **Login no funciona**: Verifica usuario admin existe en DB
- **Token inválido**: Verifica JWT_SECRET sea el mismo en .env

---

**Guarda este archivo para referencia rápida! 📌**
