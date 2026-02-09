# Configuración de Variables de Entorno

Este proyecto utiliza variables de entorno para configurar diferentes aspectos de la aplicación.

## Archivos de Configuración

- **`.env.example`**: Template con todas las variables necesarias para desarrollo
- **`.env.local`**: Tu archivo de configuración local (no se sube a Git)
- **`.env.production`**: Referencia de variables para producción (las variables reales se configuran en Vercel)

## Configuración Inicial

### 1. Crear archivo de desarrollo

```bash
# Copiar el template
cp .env.example .env.local
```

### 2. Configurar Google reCAPTCHA v3

1. Ve a [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Crea un nuevo sitio:
   - **Tipo**: reCAPTCHA v3
   - **Dominios**: 
     - Para desarrollo: `localhost`
     - Para producción: tu dominio real (ej: `tuapp.vercel.app`)
3. Copia el **Site Key** y pégalo en `.env.local`:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_clave_aqui
   ```

### 3. Configurar URL del API

Edita `.env.local`:

```env
# Desarrollo (Spring Boot local)
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Variables de Entorno Requeridas

### `NEXT_PUBLIC_API_URL`
- **Descripción**: URL base del API backend de Spring Boot
- **Desarrollo**: `http://localhost:8080/api`
- **Producción**: Se configura en Vercel Dashboard (ej: `https://api-topsell.onrender.com/api`)

### `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Descripción**: Clave pública de Google reCAPTCHA v3
- **Requerido para**: Formulario de contacto
- **Obtener en**: https://www.google.com/recaptcha/admin

## Deployment en Vercel

### Configurar Variables de Entorno en Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto → **Settings** → **Environment Variables**
3. Agrega las siguientes variables:

   | Variable | Valor | Environments |
   |----------|-------|--------------|
   | `NEXT_PUBLIC_API_URL` | URL de tu API backend en producción | Production |
   | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Site Key de producción | Production |

4. Haz un nuevo deploy o redeploy para aplicar los cambios

### Ejemplo de configuración:

```
Variable: NEXT_PUBLIC_API_URL
Value: https://api-topsell.onrender.com/api
Environments: ✅ Production

Variable: NEXT_PUBLIC_RECAPTCHA_SITE_KEY  
Value: 6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Environments: ✅ Production
```

## Notas Importantes

- ⚠️ **Nunca** subas archivos `.env.local` al repositorio
- ✅ El archivo `.env.example` **sí** debe subirse como referencia
- ✅ El archivo `.env.production` **sí** se sube (solo contiene documentación, no valores reales)
- 🔒 Las claves sensibles se configuran directamente en Vercel Dashboard
- 🔄 Reinicia el servidor de desarrollo después de cambiar variables de entorno locales

## Verificar Configuración

```bash
# Asegúrate de que el archivo .env.local existe
ls .env.local

# Reinicia el servidor de desarrollo
npm run dev
```

## Solución de Problemas

### reCAPTCHA no funciona
- Verifica que la clave corresponda al dominio correcto (localhost vs producción)
- Asegúrate de haber elegido reCAPTCHA v3 (no v2)
- En producción, verifica que tu dominio esté en la lista de dominios permitidos

### API no responde
- **Desarrollo**: Verifica que el backend Spring Boot esté corriendo en el puerto 8080
- **Producción**: Confirma que `NEXT_PUBLIC_API_URL` esté correctamente configurada en Vercel
- Revisa que no haya problemas de CORS en el backend

### Variables no se aplican en Vercel
- Después de agregar/modificar variables en Vercel, debes hacer un **Redeploy**
- Las variables de entorno se inyectan en tiempo de build, no en runtime
