# 🚀 GUÍA DE DEPLOYMENT EN RENDER CON SUPABASE

## 📋 REQUISITOS PREVIOS

- ✅ Cuenta en Render.com
- ✅ Cuenta en Supabase con proyecto creado
- ✅ Repositorio en GitHub actualizado

---

## 🔧 CONFIGURACIÓN EN RENDER

### **1. CREAR STATIC SITE**

1. Ve a https://dashboard.render.com
2. Clic en **"New +"** → **"Static Site"**
3. Conecta tu repositorio de GitHub: `Rex5311/Portafolio`

### **2. CONFIGURACIÓN EXACTA**

```
Name: portafolio-frontend
Branch: main
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

### **3. VARIABLES DE ENTORNO EN RENDER**

Agrega estas variables en **Environment**:

```
VITE_SUPABASE_URL
Valor: https://hsxqkllexhcjimpxdkrn.supabase.co

VITE_SUPABASE_ANON_KEY
Valor: sb_publishable_EvNDjr954NUEbKsEkf6SbQ_m-Wgsno6
```

⚠️ **IMPORTANTE**: La `ANON_KEY` es segura para usar en el frontend. Es la clave pública de Supabase.

---

## 🗄️ CONFIGURACIÓN EN SUPABASE

### **1. CREAR TABLAS NECESARIAS**

Ejecuta estos comandos en el **SQL Editor** de Supabase:

```sql
-- Tabla: projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('fullstack', 'frontend', 'backend')),
  github VARCHAR(255),
  demo VARCHAR(255),
  image VARCHAR(255),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: messages (formulario de contacto)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies: Lectura pública para projects
CREATE POLICY "Anyone can read projects"
  ON projects FOR SELECT
  USING (active = true);

-- Policies: Solo autenticados pueden insertar mensajes
CREATE POLICY "Anyone can send messages"
  ON messages FOR INSERT
  WITH CHECK (true);

-- Policies: Solo autenticados pueden ver/editar mensajes
CREATE POLICY "Authenticated users can read messages"
  ON messages FOR SELECT
  USING (auth.role() = 'authenticated');
```

### **2. CONFIGURAR AUTENTICACIÓN**

En Supabase Dashboard:

1. Ve a **Authentication** → **Providers**
2. Habilita **Email** provider
3. Deshabilita **Confirm email** (para testing rápido)
4. Crea tu usuario admin:
   - Ve a **Authentication** → **Users**
   - Clic **Add user** → **Create new user**
   - Email: `admin@juanagudelo.com`
   - Password: `tu_password_segura`

---

## ✅ VERIFICACIÓN POST-DEPLOYMENT

### **1. Verifica que el sitio carga**

```
https://portafolio-frontend.onrender.com
```

### **2. Verifica la conexión a Supabase**

Abre la consola del navegador (F12) y ejecuta:

```javascript
console.log(import.meta.env.VITE_SUPABASE_URL);
```

Debe mostrar tu URL de Supabase.

### **3. Verifica que los proyectos cargan**

Si insertaste proyectos de prueba, deberían aparecer en la página.

### **4. Verifica el formulario de contacto**

Envía un mensaje de prueba y verifica que llegue a la tabla `messages` en Supabase.

---

## 🔐 SEGURIDAD EN PRODUCCIÓN

### ✅ BUENAS PRÁCTICAS IMPLEMENTADAS:

1. **Variables de entorno**: No están en el código
2. **ANON KEY pública**: Segura para usar en frontend
3. **Row Level Security (RLS)**: Protege las tablas
4. **Authentication**: Solo usuarios autenticados pueden administrar
5. **Gitignore correcto**: `.env` no se sube a GitHub

### ⚠️ LO QUE NUNCA DEBES HACER:

- ❌ No subas la `SERVICE_ROLE_KEY` al frontend
- ❌ No deshabilites RLS en producción
- ❌ No expongas credenciales en el código
- ❌ No uses la misma contraseña para todos los ambientes

---

## 🐛 TROUBLESHOOTING

### Error: "Missing Supabase environment variables"

- Verifica que las variables estén en Render
- Verifica que comiencen con `VITE_`
- Haz un **Manual Deploy** después de agregar variables

### Error: "Could not connect to Supabase"

- Verifica la URL de Supabase
- Verifica que el proyecto de Supabase esté activo
- Revisa la consola del navegador para más detalles

### Error: "Row Level Security policy violation"

- Revisa las policies en Supabase
- Asegúrate de que RLS esté habilitado
- Verifica que los permisos sean correctos

---

## 📊 COMANDOS ÚTILES

### Desarrollo local:

```bash
cd frontend
npm install
npm run dev
```

### Build local (para testing):

```bash
npm run build
npm run preview
```

### Verificar variables de entorno:

```bash
# En local
cat .env

# Ver qué usa Vite
echo $VITE_SUPABASE_URL
```

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Agregar más proyectos en Supabase
2. ✅ Personalizar el diseño
3. ✅ Configurar dominio personalizado en Render
4. ✅ Agregar Google Analytics
5. ✅ Configurar email notifications para mensajes

---

**✨ Tu portafolio está listo para producción con Supabase + Render ✨**
