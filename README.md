# Patitas Felices - Gestión Veterinaria

Este es el Trabajo Práctico Final de Backend para la veterinaria "Patitas Felices". El sistema permite gestionar dueños, mascotas, veterinarios e historiales clínicos de manera segura.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, TypeScript.
- **Base de Datos**: MongoDB con Mongoose.
- **Seguridad**: JWT (JSON Web Tokens) y bcrypt para hashing de contraseñas.
- **Frontend**: HTML5, CSS3 (Vanilla) y JavaScript (Vanilla) ubicado en `/public`.
- **Arquitectura**: MVC (Model-View-Controller).

## Requisitos Previos

- Node.js instalado.
- MongoDB corriendo localmente o una URI de MongoDB Atlas.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   Crea un archivo `.env` basado en `.env.example`.

## Ejecución

- Modo Desarrollo: `npm run dev`
- Construcción para Producción: `npm run build`
- Iniciar Producción: `npm run start`

## Estructura del Proyecto

- `src/controllers`: Lógica de los endpoints.
- `src/models`: Esquemas de Mongoose.
- `src/routes`: Definición de rutas de la API.
- `src/middlewares`: Protección de rutas y otras utilidades.
- `public/`: Frontend desacoplado servido por Express.

## Endpoints Principales

### Autenticación
- `POST /api/auth/registrar`: Registro de nuevos usuarios.
- `POST /api/auth/login`: Inicio de sesión y obtención de token.

### Mascotas (Protegido con JWT)
- `GET /api/mascotas`: Obtener todas las mascotas.
- `POST /api/mascotas`: Crear una nueva mascota.
- `PUT /api/mascotas/:id`: Actualizar datos de una mascota.
- `DELETE /api/mascotas/:id`: Eliminar una mascota.

## Autor
**Milton Montiel**
