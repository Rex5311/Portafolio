# ⚡ Inicio Rápido (Quick Start)

Guía ultrarrápida para ejecutar el proyecto en 5 minutos.

## 🎯 Requisitos

✅ Node.js 18+  
✅ PostgreSQL 15+  
✅ Git  

## 🚀 3 Pasos para Ejecutar

### 1️⃣ Base de Datos (1 minuto)

```powershell
# Crear BD y ejecutar scripts
psql -U postgres -c "CREATE DATABASE portafolio_db;"
psql -U postgres -d portafolio_db -f database/schema.sql
psql -U postgres -d portafolio_db -f database/seed.sql
```

### 2️⃣ Backend (2 minutos)

```powershell
cd backend
npm install
Copy-Item .env.example .env
# Editar .env con tu contraseña de PostgreSQL
npm run dev
```

### 3️⃣ Frontend (2 minutos)

**Nueva terminal:**

```powershell
cd frontend
npm install
npm run dev
```

## 🌐 ¡Listo!

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## 🐛 ¿Problemas?

Ver [docs/VSCODE_GUIDE.md](./docs/VSCODE_GUIDE.md) para soluciones detalladas.

## 📝 Archivo .env Backend

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

## 📚 Más Información

- [README Completo](./README.md)
- [Guía VS Code](./docs/VSCODE_GUIDE.md)
- [API Docs](./docs/API.md)
- [Deployment](./docs/DEPLOYMENT.md)

---

**¿Primera vez?** Lee el [README completo](./README.md) para entender el proyecto.
