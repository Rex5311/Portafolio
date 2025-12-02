# Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! 

## Cómo Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado
2. Abre un Issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Tu entorno (OS, navegador, versión de Node)

### Sugerir Mejoras

1. Abre un Issue describiendo:
   - La mejora propuesta
   - Por qué sería útil
   - Ejemplos de uso

### Pull Requests

1. Fork el repositorio
2. Crea una rama desde `main`:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios
4. Commitea con mensajes descriptivos:
   ```bash
   git commit -m "feat: agregar funcionalidad X"
   ```
5. Push a tu fork:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
6. Abre un Pull Request

## Convenciones de Código

### JavaScript/React

- Usar ESLint configurado
- Componentes funcionales con hooks
- Nombres en PascalCase para componentes
- Nombres en camelCase para funciones y variables

### Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin afectar código)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Mantenimiento

### SQL

- Nombres de tablas en minúsculas
- Usar snake_case
- Comentarios descriptivos

## Estructura de Branches

- `main` - Producción
- `develop` - Desarrollo
- `feature/*` - Nuevas funcionalidades
- `fix/*` - Correcciones
- `docs/*` - Documentación

## Testing

Antes de hacer PR:

```bash
# Frontend
cd frontend
npm run lint
npm test

# Backend
cd backend
npm test
```

## Código de Conducta

- Sé respetuoso
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto

## ¿Preguntas?

Contacta a: juan.agudelo@correounivalle.edu.co
