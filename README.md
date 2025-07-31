# Bazar Doña Marlene

Aplicación web para la gestión de inventario, ventas y clientes del Bazar Doña Marlene.

## Tecnologías

- Frontend: React, Vite, TailwindCSS
- Backend: Express.js, Node.js
- Base de datos: MongoDB Atlas

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- Cuenta en MongoDB Atlas

## Configuración

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Configura la conexión a MongoDB Atlas:

Edita el archivo `.env` en la raíz del proyecto y reemplaza la cadena de conexión con tu propia cadena de MongoDB Atlas:

```
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base_datos>?retryWrites=true&w=majority
PORT=3000
```

## Migración de datos

Si tienes datos existentes en los archivos JSON y deseas migrarlos a MongoDB Atlas, ejecuta:

```bash
npm run migrate
```

Esto migrará todos los datos de los archivos JSON en `src/data/` a las colecciones correspondientes en MongoDB Atlas.

## Ejecución

### Desarrollo

Para ejecutar la aplicación en modo desarrollo con recarga en caliente:

```bash
npm run dev:full
```

Esto iniciará tanto el servidor de desarrollo de Vite para el frontend como el servidor Express para el backend.

### Producción

Para construir la aplicación para producción y ejecutarla:

```bash
npm run build
npm run server
```

O simplemente:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Estructura del proyecto

- `/src`: Código fuente del frontend
  - `/components`: Componentes de React
  - `/pages`: Páginas de la aplicación
  - `/models`: Modelos de datos para MongoDB
  - `/config`: Configuración de la aplicación
  - `/utils`: Utilidades y funciones auxiliares
- `/public`: Archivos estáticos
- `server.js`: Servidor Express para el backend
- `migrate.js`: Script para migrar datos de JSON a MongoDB

## API Endpoints

### Productos
- `GET /api/productos`: Obtener todos los productos
- `GET /api/productos/:id`: Obtener un producto específico
- `POST /api/productos`: Crear o actualizar productos
- `PUT /api/productos/:id`: Actualizar un producto específico
- `DELETE /api/productos/:id`: Eliminar un producto

### Usuarios
- `GET /api/usuarios`: Obtener todos los usuarios
- `GET /api/usuarios/:id`: Obtener un usuario específico
- `POST /api/usuarios`: Crear o actualizar usuarios
- `POST /api/usuarios/add`: Registrar un nuevo usuario cliente

### Ventas
- `GET /api/ventas`: Obtener todas las ventas
- `GET /api/ventas/:id`: Obtener una venta específica
- `POST /api/ventas`: Crear o actualizar ventas
- `POST /api/ventas/add`: Registrar una nueva venta
- `PUT /api/ventas/:id/estado`: Actualizar el estado de una venta
- `GET /api/verificar-estado/:id`: Verificar el estado de una venta

### Inventario
- `GET /api/inventario`: Obtener todo el inventario
- `GET /api/inventario/:id`: Obtener un item específico del inventario
- `POST /api/inventario`: Crear o actualizar items de inventario

### Clientes
- `GET /api/clientes`: Obtener todos los clientes
- `GET /api/clientes/:id`: Obtener un cliente específico
- `POST /api/clientes`: Crear o actualizar clientes
