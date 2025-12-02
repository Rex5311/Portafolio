# 🔒 Guía de Seguridad del Portafolio

## 🛡️ Medidas de Seguridad Implementadas

### 1. Autenticación JWT

- **Token expiration**: 24 horas
- **Algoritmo**: HS256
- **Secret key**: Variable de entorno (`JWT_SECRET`)

### 2. Protección de Rutas

Las siguientes rutas requieren autenticación:

```
POST   /api/projects        (Crear proyecto)
PUT    /api/projects/:id    (Actualizar proyecto)
DELETE /api/projects/:id    (Eliminar proyecto)
PUT    /api/contact/:id     (Actualizar estado de mensaje)
DELETE /api/contact/:id     (Eliminar mensaje)
```

### 3. Seguridad de Contraseñas

- **Hashing**: bcrypt con 10 rounds
- **Mínimo**: 6 caracteres (recomendado: 12+)
- **Storage**: Solo hash en base de datos

### 4. Headers de Seguridad (Helmet)

```javascript
helmet() // Configuración por defecto:
// - X-DNS-Prefetch-Control
// - X-Frame-Options
// - Strict-Transport-Security
// - X-Download-Options
// - X-Content-Type-Options
// - X-XSS-Protection
```

### 5. CORS

```javascript
cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
})
```

### 6. Validación de Datos

- **express-validator** en todas las rutas POST/PUT
- Sanitización de inputs
- Validación de tipos de datos

---

## 🔐 Configuración de Producción

### Variables de Entorno Críticas

```bash
# Backend (.env)
NODE_ENV=production
JWT_SECRET=<genera_un_secreto_seguro>
DATABASE_URL=postgresql://...
CORS_ORIGIN=https://tu-dominio.vercel.app
```

### Generar JWT_SECRET Seguro

```bash
# Opción 1: OpenSSL
openssl rand -base64 32

# Opción 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Opción 3: PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

---

## 👤 Gestión de Usuarios Admin

### Crear Usuario Admin

1. **Generar hash de contraseña**:

```bash
cd backend
node scripts/hashPassword.js
```

2. **Insertar en base de datos**:

```sql
INSERT INTO usuarios (nombre, email, password, rol)
VALUES (
  'Juan Esteban Agudelo Carmona',
  'admin@juanagudelo.com',
  '$2b$10$...tu_hash_aquí...',
  'admin'
);
```

### Cambiar Contraseña

```bash
# Generar nuevo hash
node scripts/hashPassword.js

# Actualizar en base de datos
UPDATE usuarios 
SET password = '$2b$10$...nuevo_hash...'
WHERE email = 'admin@juanagudelo.com';
```

---

## 🚨 Mejores Prácticas

### ✅ DO (Hacer)

- ✅ Usar variables de entorno para secretos
- ✅ Mantener JWT_SECRET privado y único
- ✅ Usar HTTPS en producción
- ✅ Actualizar dependencias regularmente
- ✅ Validar todos los inputs del usuario
- ✅ Implementar rate limiting (próxima versión)
- ✅ Revisar logs regularmente

### ❌ DON'T (No Hacer)

- ❌ Nunca commiteares .env al repositorio
- ❌ No uses contraseñas simples
- ❌ No expongas información sensible en errores
- ❌ No uses HTTP en producción
- ❌ No compartas el JWT_SECRET
- ❌ No almacenes contraseñas en texto plano

---

## 🔍 Monitoreo y Logs

### Backend Logs

El backend usa `morgan` para logging HTTP:

```
GET /api/projects 200 45ms
POST /api/admin/login 401 120ms
```

### Render Logs

```bash
# Ver logs en tiempo real
render logs

# O desde dashboard: Logs → Live logs
```

---

## 🛠️ Auditoría de Seguridad

### Revisar Dependencias

```bash
# Backend
cd backend
npm audit

# Frontend
cd frontend
npm audit
```

### Actualizar Dependencias Vulnerables

```bash
npm audit fix
```

---

## 📊 Checklist de Seguridad

- [ ] JWT_SECRET generado aleatoriamente
- [ ] Variables de entorno configuradas
- [ ] CORS configurado correctamente
- [ ] Contraseñas hasheadas con bcrypt
- [ ] HTTPS habilitado en producción
- [ ] Helmet middleware activo
- [ ] Validación de inputs implementada
- [ ] Logs de seguridad revisados
- [ ] Audit de npm ejecutado
- [ ] Credenciales de DB protegidas

---

## 🆘 Respuesta a Incidentes

### Si el JWT_SECRET se compromete:

1. **Inmediato**:
   ```bash
   # Generar nuevo secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Actualizar en Render**:
   - Settings → Environment
   - Actualizar `JWT_SECRET`
   - Save (auto-redeploy)

3. **Notificar**:
   - Todos los tokens existentes serán invalidados
   - Los usuarios deberán re-autenticarse

### Si detectas acceso no autorizado:

1. Cambiar contraseña de admin inmediatamente
2. Revisar logs de acceso en Render
3. Verificar cambios en base de datos
4. Actualizar JWT_SECRET
5. Auditar código por vulnerabilidades

---

## 📚 Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

---

**Última actualización**: Diciembre 2024
