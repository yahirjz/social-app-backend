# Social App Backend API 🚀

Una API RESTful robusta y escalable construida para una red social moderna. 
Este backend maneja autenticación segura de usuarios, creación de publicaciones, relacionamiento a través de un sistema de seguidores (Follow/Unfollow) y la generación de un algoritmo de "Feed" que une los perfiles y sus asociaciones mediante consultas avanzadas. 

Todo el código está asegurado por una **Suite de Pruebas Automatizadas (TDD)**.

---

## 🛠 Tech Stack
- **Entorno & Servidor:** Node.js, Express.js
- **Base de Datos & ORM:** PostgreSQL (NeonDB serverless), Sequelize
- **Seguridad & Autenticación:** JSON Web Tokens (JWT), Bcrypt.js (Hasheo)
- **Testing:** Jest, SuperTest

---

## ✨ Features Principales

1. **Autenticación (Auth)**
   - Sistema de Registro de usuarios con contraseñas encriptadas.
   - Login seguro emitiendo JWT Bearer tokens con caducidad.
   - Modificación asegurada del perfil biográfico.
2. **Sistema de Publicaciones (Posts CRUD)**
   - Crear, consultar, modificar y eliminar posts.
   - Las operaciones están estrictamente limitadas al creador nativo de cada Post (usando el Payload del Token).
3. **Red Social (Follow System)**
   - Relaciones complejas "*Muchos a Muchos*" en Base de Datos (Followers Table).
   - Validaciones contra auto-seguimiento (`follower_id !== followed_id`).
4. **Feeds y Timeline**
   - **Global Feed:** Obtención general de publicaciones para descubrir la red.
   - **Personalized Feed:** Línea de tiempo que filtra y entrega las publicaciones de forma relacional utilizando cláusulas `.include()` y `where`.
5. **Testing Automatizado**
   - Configuración automatizada de entornos separados para desarrollo y `NODE_ENV=test`.
   - Cobertura total de Integración E2E sobre Rutas Protegidas en memoria local.

---

## 📖 Documentación de la API (Endpoints)

Todas las rutas requieren el Header: `Authorization: Bearer <token>` **(excepto Registro y Login)**.

### Auth & Usuarios
- `POST /auth/register` - Crea un usuario nuevo.
- `POST /auth/login` - Inicia sesión y devuelve el Token JWT.
- `PUT /user/profile` - Actualiza la biografía del perfil.

### Publicaciones (Posts)
- `POST /post` - Crea una nueva publicación de texto/imagen.
- `GET /post` - Obtiene las publicaciones exclusivas del usuario logueado.
- `PUT /post/:id` - Edita una publicación propia.
- `DELETE /post/:id` - Elimina una publicación propia.

### Seguidores
- `POST /follower/:id/follow` - Comienza a seguir al id del usuario solicitado.
- `DELETE /follower/:id/unfollow` - Deja de seguir al usuario.

### Muro (Feed)
- `GET /feed` - Recupera la lista interactiva de publicaciones con los metadatos completos de su creador (Username, foto de perfil, timestamps).

---

## ⚙️ Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/TUsuario/mi-repo-backend.git
cd mi-repo-backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz con tus variables:
```env
PORT=3000
DATABASE_URL=postgres://usuario:password@host-de-neon.tech/dbname?sslmode=require
JWT_SECRET=tu_secreto_super_seguro
```

4. Ejecuta el servidor en modo desarrollo:
```bash
npm run dev
```

---

## 🧪 Testing
Para arrancar los robots de Jest y comprobar la integridad e integración real con la Base de Datos:
```bash
npm test
```
*(El entorno configurará la variable automática `NODE_ENV=test` aislando las alteraciones de tablas HTTP).*
