# 📋 Guía de Ejecución en Visual Studio Code

Esta guía te mostrará paso a paso cómo ejecutar el proyecto completo en Visual Studio Code.

## 📦 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js 18+**
   - Descargar de: https://nodejs.org/
   - Verificar: `node --version`

2. **PostgreSQL 15+**
   - Descargar de: https://www.postgresql.org/download/
   - Verificar: `psql --version`

3. **Git**
   - Descargar de: https://git-scm.com/
   - Verificar: `git --version`

4. **Visual Studio Code**
   - Descargar de: https://code.visualstudio.com/

## 🚀 Instalación Inicial

### 1. Clonar o Abrir el Proyecto

Si ya tienes el proyecto localmente:

```powershell
cd "c:\Users\juane\OneDrive\Escritorio\UV 5 sem\DES SOFT II\Plantillas\HOJA DE VIDA"
code .
```

### 2. Configurar Base de Datos

**Abrir PowerShell en VS Code (Ctrl + `)**

```powershell
# Conectar a PostgreSQL
psql -U postgres

# En el prompt de psql:
CREATE DATABASE portafolio_db;
\c portafolio_db
\i database/schema.sql
\i database/seed.sql
\q
```

**Alternativa con comandos directos:**

```powershell
psql -U postgres -c "CREATE DATABASE portafolio_db;"
psql -U postgres -d portafolio_db -f database/schema.sql
psql -U postgres -d portafolio_db -f database/seed.sql
```

### 3. Configurar Backend

**Terminal 1 - Backend:**

```powershell
cd backend

# Instalar dependencias
npm install

# Crear archivo .env (copiar desde .env.example)
Copy-Item .env.example .env

# Editar .env con tus credenciales
# Usar notepad o el editor de VS Code
notepad .env
```

**Contenido del archivo `.env`:**

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portafolio_db
DB_USER=postgres
DB_PASSWORD=TU_CONTRASEÑA_POSTGRESQL
CORS_ORIGIN=http://localhost:3000
```

### 4. Configurar Frontend

**Abrir nueva terminal (Ctrl + Shift + `)**

**Terminal 2 - Frontend:**

```powershell
cd frontend

# Instalar dependencias
npm install
```

## ▶️ Ejecutar el Proyecto

### Opción 1: Usando Dos Terminales (Recomendado)

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

Deberías ver:
```
🚀 Server running on port 5000
📍 Environment: development
🌐 API URL: http://localhost:5000
✅ Connected to PostgreSQL database
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

Deberías ver:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Opción 2: Usando Tasks de VS Code

Crear archivo `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "cd backend ; npm run dev",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^(.*)$",
          "file": 1
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "^.*starting.*$",
          "endsPattern": "^.*Server running.*$"
        }
      }
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "cd frontend ; npm run dev",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^(.*)$",
          "file": 1
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "^.*VITE.*$",
          "endsPattern": "^.*Local:.*$"
        }
      }
    },
    {
      "label": "Start All",
      "dependsOn": ["Start Backend", "Start Frontend"],
      "problemMatcher": []
    }
  ]
}
```

Luego ejecutar:
1. Presionar `Ctrl + Shift + P`
2. Escribir: "Tasks: Run Task"
3. Seleccionar: "Start All"

## 🌐 Acceder a la Aplicación

Una vez iniciado:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health:** http://localhost:5000/api/health

## 🔍 Verificar que Todo Funciona

### 1. Verificar Backend

Abrir en el navegador o usar curl:

```powershell
# Health check
curl http://localhost:5000/api/health

# Proyectos
curl http://localhost:5000/api/projects
```

### 2. Verificar Frontend

1. Abrir http://localhost:3000
2. Verificar que carga correctamente
3. Probar modo oscuro/claro
4. Navegar por secciones
5. Probar formulario de contacto

## 🛑 Detener el Proyecto

### Opción 1: Ctrl + C en cada terminal

### Opción 2: Cerrar todas las terminales
- Click derecho en el panel de terminal
- "Kill All Terminals"

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"

**Solución:**
1. Verificar que PostgreSQL está corriendo:
   ```powershell
   Get-Service postgresql*
   ```
2. Verificar credenciales en `.env`
3. Verificar que la base de datos existe:
   ```powershell
   psql -U postgres -l
   ```

### Error: "Port 5000 is already in use"

**Solución:**
```powershell
# Encontrar proceso usando el puerto
netstat -ano | findstr :5000

# Matar el proceso (reemplazar PID)
taskkill /PID <PID> /F

# O cambiar el puerto en backend/.env
# PORT=5001
```

### Error: "Port 3000 is already in use"

**Solución:**
```powershell
# Encontrar y matar proceso
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: npm install falla

**Solución:**
```powershell
# Limpiar cache
npm cache clean --force

# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Error: "Cannot find module"

**Solución:**
```powershell
# Reinstalar dependencias
cd backend
npm install

cd ../frontend
npm install
```

## 📝 Scripts Disponibles

### Backend (`backend/`)

```powershell
npm start        # Producción (node)
npm run dev      # Desarrollo (nodemon con auto-reload)
```

### Frontend (`frontend/`)

```powershell
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Ejecutar linter
```

## 🔄 Workflow de Desarrollo

1. **Iniciar el proyecto:**
   ```powershell
   # Terminal 1
   cd backend ; npm run dev
   
   # Terminal 2
   cd frontend ; npm run dev
   ```

2. **Hacer cambios:**
   - Editar archivos en VS Code
   - Los cambios se recargan automáticamente (hot reload)

3. **Ver logs:**
   - Backend: Ver logs en Terminal 1
   - Frontend: Ver en navegador (F12 → Console)

4. **Probar cambios:**
   - Frontend se actualiza automáticamente
   - Backend reinicia automáticamente (nodemon)

## 📊 Extensiones Recomendadas de VS Code

Instalar estas extensiones para mejor experiencia:

1. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`

2. **Tailwind CSS IntelliSense**
   - ID: `bradlc.vscode-tailwindcss`

3. **ESLint**
   - ID: `dbaeumer.vscode-eslint`

4. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`

5. **PostgreSQL**
   - ID: `ckolkman.vscode-postgres`

6. **Thunder Client** (alternativa a Postman)
   - ID: `rangav.vscode-thunder-client`

## 🎨 Configuración Recomendada de VS Code

Crear `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

## 📚 Recursos Adicionales

- [Documentación API](./docs/API.md)
- [Arquitectura](./docs/ARCHITECTURE.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [README Principal](./README.md)

## 💡 Tips

1. **Hot Reload no funciona:** Guardar archivo con `Ctrl + S`
2. **Ver todos los puertos:** `netstat -ano | findstr LISTENING`
3. **Limpiar consola:** `Clear-Host` o `cls`
4. **Terminal nueva rápida:** `Ctrl + Shift + ñ`
5. **Dividir terminal:** Click en icono de "Split Terminal"

## ✅ Checklist de Inicio

- [ ] PostgreSQL instalado y corriendo
- [ ] Node.js 18+ instalado
- [ ] Base de datos `portafolio_db` creada
- [ ] Scripts SQL ejecutados (schema + seed)
- [ ] Dependencias backend instaladas (`npm install`)
- [ ] Archivo `.env` configurado con credenciales
- [ ] Dependencias frontend instaladas (`npm install`)
- [ ] Backend corriendo en puerto 5000
- [ ] Frontend corriendo en puerto 3000
- [ ] API responde correctamente
- [ ] Frontend carga sin errores

---

**¿Problemas? Contacta:** juan.agudelo@correounivalle.edu.co
