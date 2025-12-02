# 🐙 Guía de GitHub

Instrucciones para subir tu portafolio a GitHub y mantenerlo actualizado.

## 📋 Prerrequisitos

1. **Cuenta de GitHub**
   - Crear en: https://github.com/signup
   
2. **Git instalado**
   - Verificar: `git --version`
   - Si no está instalado: https://git-scm.com/

3. **Configurar Git (primera vez)**
   ```powershell
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```

## 🚀 Subir Proyecto a GitHub

### Opción 1: Desde Línea de Comandos (Recomendado)

#### Paso 1: Crear Repositorio en GitHub

1. Ir a https://github.com/new
2. Configurar:
   - **Repository name:** `portafolio-juan-agudelo` o `portfolio-fullstack`
   - **Description:** "Portafolio web profesional fullstack con React, Node.js y PostgreSQL"
   - **Visibility:** Public (para que se pueda ver)
   - ❌ **NO** inicializar con README (ya tienes uno)
3. Click "Create repository"

#### Paso 2: Inicializar Git Local

Abrir terminal en la carpeta del proyecto:

```powershell
cd "c:\Users\juane\OneDrive\Escritorio\UV 5 sem\DES SOFT II\Plantillas\HOJA DE VIDA"

# Inicializar repositorio
git init

# Verificar que .gitignore existe
cat .gitignore

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Portafolio fullstack completo"
```

#### Paso 3: Conectar con GitHub

```powershell
# Conectar con tu repositorio remoto (cambiar URL)
git remote add origin https://github.com/TU_USUARIO/portafolio-juan-agudelo.git

# Verificar
git remote -v

# Subir código
git branch -M main
git push -u origin main
```

**Si pide usuario/contraseña:**
- Usuario: tu username de GitHub
- Contraseña: usar Personal Access Token (no tu contraseña)

### Opción 2: Desde VS Code

1. Abrir VS Code en el proyecto
2. Click en icono de "Source Control" (Ctrl + Shift + G)
3. Click "Initialize Repository"
4. Agregar mensaje de commit: "Initial commit"
5. Click en "Commit"
6. Click en "Publish Branch"
7. Seleccionar "Publish to GitHub public repository"
8. Seguir instrucciones

## 🔑 Configurar Personal Access Token (PAT)

Si GitHub pide contraseña al hacer push:

1. Ir a: https://github.com/settings/tokens
2. Click "Generate new token" → "Classic"
3. Configurar:
   - Note: "VS Code Git"
   - Expiration: 90 days
   - ✅ Select: `repo` (todos los sub-items)
4. Click "Generate token"
5. **⚠️ COPIAR TOKEN (solo se muestra una vez)**

**Usar token como contraseña:**
```powershell
# Al hacer push, poner:
Username: tu_usuario_github
Password: ghp_xxxxxxxxxxxxxxxxxxxxxxx (el token)
```

**Guardar credenciales:**
```powershell
git config --global credential.helper wincred
```

## 📝 Nombre Recomendado del Repositorio

Opciones profesionales:

1. `portafolio-juan-agudelo`
2. `portfolio-fullstack`
3. `juan-agudelo-portfolio`
4. `fullstack-portfolio-2024`
5. `developer-portfolio`

**Elegir uno descriptivo y profesional.**

## 📊 Después de Subir

Tu repositorio debe verse así:

```
https://github.com/TU_USUARIO/portafolio-juan-agudelo
│
├── README.md (con badges y descripción)
├── frontend/
├── backend/
├── database/
├── docs/
├── .gitignore
├── LICENSE
└── otros archivos...
```

## 🎨 Personalizar README en GitHub

GitHub mostrará automáticamente tu README.md principal con:
- Badges de tecnologías
- Descripción del proyecto
- Screenshots (puedes agregar)
- Instrucciones de instalación
- Links a deploy

## 📸 Agregar Screenshots (Opcional)

1. Crear carpeta `screenshots/` en la raíz
2. Agregar imágenes del proyecto
3. Actualizar README.md:

```markdown
## 📸 Screenshots

![Home](./screenshots/home.png)
![Projects](./screenshots/projects.png)
![Contact](./screenshots/contact.png)
```

## 🔄 Workflow de Trabajo con Git

### Hacer Cambios

```powershell
# Ver estado
git status

# Ver diferencias
git diff

# Agregar archivos modificados
git add .

# O agregar archivos específicos
git add frontend/src/components/Navbar.jsx

# Hacer commit
git commit -m "feat: agregar nueva funcionalidad"

# Subir cambios
git push
```

### Mensajes de Commit

Usar formato convencional:

```
feat: agregar componente de blog
fix: corregir error en formulario
docs: actualizar documentación de API
style: mejorar estilos del footer
refactor: refactorizar lógica de proyectos
test: agregar tests unitarios
chore: actualizar dependencias
```

### Branches (Opcional)

```powershell
# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commits
git add .
git commit -m "feat: agregar funcionalidad X"

# Subir rama
git push -u origin feature/nueva-funcionalidad

# Volver a main
git checkout main

# Fusionar rama (o hacer Pull Request en GitHub)
git merge feature/nueva-funcionalidad
```

## 🚀 Conectar con Vercel (Deployment)

Una vez en GitHub:

1. Ir a https://vercel.com
2. "Import Project"
3. Conectar con GitHub
4. Seleccionar tu repositorio
5. Configurar:
   - Framework: Vite
   - Root Directory: `frontend`
6. Deploy

**Auto-deploy:** Cada push a main despliega automáticamente.

## 🚀 Conectar con Render (Backend)

1. Ir a https://render.com
2. "New Web Service"
3. Conectar con GitHub
4. Seleccionar tu repositorio
5. Configurar:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
6. Deploy

## 📋 Checklist de GitHub

- [ ] Cuenta de GitHub creada
- [ ] Git configurado localmente
- [ ] Repositorio creado en GitHub
- [ ] .gitignore presente
- [ ] .env agregado a .gitignore (¡no subir credenciales!)
- [ ] Código subido a GitHub
- [ ] README.md visible en GitHub
- [ ] LICENSE presente
- [ ] Descripción del repo configurada
- [ ] Topics/tags agregados (react, nodejs, postgresql, portfolio)
- [ ] Repository settings → Pages deshabilitado (o configurado si usas)

## 🔒 Seguridad

### ⚠️ NUNCA subir a GitHub:

- ❌ `backend/.env` (credenciales)
- ❌ `node_modules/` (dependencias)
- ❌ Contraseñas o API keys
- ❌ Datos sensibles

### ✅ Verificar antes de commit:

```powershell
# Ver qué se va a subir
git status

# Ver contenido de archivos
git diff

# Si agregaste .env por error:
git rm --cached backend/.env
git commit -m "remove .env from tracking"
```

## 📊 GitHub Repository Settings

### About

Configurar en GitHub:

- **Description:** "Portafolio web profesional fullstack - React, Node.js, PostgreSQL, Tailwind CSS"
- **Website:** Tu URL de Vercel cuando despliegues
- **Topics:** `react` `nodejs` `postgresql` `express` `tailwindcss` `portfolio` `fullstack`

### README Badges

Ya incluidos en README.md:

```markdown
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
```

## 🔍 Hacer Público tu Perfil de GitHub

1. Ir a: https://github.com/settings/profile
2. Completar información:
   - Name: Juan Esteban Agudelo Carmona
   - Bio: "Estudiante de Desarrollo de Software | Fullstack Developer"
   - Location: Cali, Colombia
   - Website: Link a tu portafolio desplegado
3. Crear README de perfil (opcional):
   - Crear repo: `TU_USUARIO/TU_USUARIO`
   - Agregar README.md con tu presentación

## 📈 Stats y Actividad

GitHub mostrará automáticamente:
- Contribuciones (commits)
- Repositorios públicos
- Lenguajes usados
- Actividad

**Tip:** Mantén actividad constante para mostrar compromiso.

## 🤝 Colaboración

Para trabajar con otros:

1. Settings → Collaborators
2. Agregar usuarios
3. O usar Pull Requests

## 🌟 Buenas Prácticas

1. ✅ Commits frecuentes y descriptivos
2. ✅ README bien documentado
3. ✅ Código limpio y comentado
4. ✅ .gitignore configurado correctamente
5. ✅ Branches para features grandes
6. ✅ Pull Requests para revisión de código
7. ✅ Issues para bugs y mejoras

## 🔗 Links Útiles

- **GitHub Docs:** https://docs.github.com/
- **Git Cheat Sheet:** https://education.github.com/git-cheat-sheet-education.pdf
- **Markdown Guide:** https://www.markdownguide.org/
- **Shields.io** (badges): https://shields.io/

## 💡 Comandos Git Útiles

```powershell
# Estado del repositorio
git status

# Ver historial
git log --oneline

# Ver ramas
git branch -a

# Deshacer cambios (antes de commit)
git restore archivo.js

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Ver remotes
git remote -v

# Actualizar desde GitHub
git pull

# Clonar tu propio repo en otra computadora
git clone https://github.com/TU_USUARIO/portafolio-juan-agudelo.git
```

## 🆘 Solución de Problemas

### Error: "remote origin already exists"

```powershell
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/repo.git
```

### Error: "failed to push"

```powershell
# Primero traer cambios remotos
git pull origin main --rebase
git push
```

### Error: "Permission denied"

- Verificar Personal Access Token
- Verificar que el token tenga permisos `repo`

### Subí .env por error

```powershell
# Remover del tracking
git rm --cached backend/.env

# Commit
git commit -m "remove sensitive file"

# Push
git push

# Cambiar contraseñas expuestas inmediatamente
```

---

## ✅ Siguiente Paso: Deployment

Una vez en GitHub, continuar con [docs/DEPLOYMENT.md](./DEPLOYMENT.md) para desplegar en producción.

**¿Preguntas?** Contacta: juan.agudelo@correounivalle.edu.co
