# 📸 Instrucciones para Agregar Imágenes

## Ubicación de las imágenes
Coloca tus imágenes en: `frontend/public/images/`

## Imágenes necesarias:

### 1. Foto Personal
- **Nombre del archivo**: `profile.jpg`
- **Ubicación**: `frontend/public/images/profile.jpg`
- **Formato recomendado**: JPG o PNG
- **Tamaño recomendado**: 800x800 píxeles (cuadrada)
- **Peso máximo**: 500 KB

### 2. Certificado AWS
- **Nombre del archivo**: `cert-aws.jpg`
- **Ubicación**: `frontend/public/images/cert-aws.jpg`
- **Formato recomendado**: JPG o PNG
- **Tamaño recomendado**: 1200x800 píxeles
- **Peso máximo**: 1 MB

### 3. Certificado Dev Senior
- **Nombre del archivo**: `cert-devsenior.jpg`
- **Ubicación**: `frontend/public/images/cert-devsenior.jpg`
- **Formato recomendado**: JPG o PNG
- **Tamaño recomendado**: 1200x800 píxeles
- **Peso máximo**: 1 MB

## Cómo agregar las imágenes:

### Opción 1: Copiar manualmente
1. Abre la carpeta: `frontend/public/images/`
2. Copia tus imágenes con los nombres exactos mencionados arriba
3. Refresca el navegador (F5)

### Opción 2: Usar comandos
```powershell
# Desde la raíz del proyecto
cd frontend/public/images

# Copia tus archivos aquí con los nombres correctos:
# - profile.jpg
# - cert-aws.jpg
# - cert-devsenior.jpg
```

## Notas importantes:

✅ **Los nombres de archivo deben ser exactos** (con minúsculas y guiones)
✅ Si no agregas las imágenes, se mostrará un placeholder automático
✅ Puedes usar formatos: .jpg, .jpeg, .png, .webp
✅ Para mejor rendimiento, optimiza las imágenes antes de subirlas

## Optimizar imágenes (opcional):

Puedes usar herramientas online como:
- https://tinypng.com/ (compresión sin pérdida de calidad)
- https://squoosh.app/ (herramienta de Google)

## Editar certificaciones:

Si necesitas agregar más certificados o editar la información, modifica:
`frontend/src/components/Certifications.jsx`

En la línea 10-25 encontrarás el array de certificaciones.
