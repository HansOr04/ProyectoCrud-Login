```markdown
# 🚀 Sistema de Autenticación y Gestión de Usuarios

Sistema full-stack de autenticación y CRUD de usuarios desarrollado con **Express.js**, **TypeScript**, **Next.js** y **Supabase**.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Autor](#autor)

---

## ✨ Características

- ✅ Registro e inicio de sesión de usuarios
- ✅ Autenticación JWT
- ✅ CRUD completo de usuarios
- ✅ Listado de todos los usuarios
- ✅ Actualización de email y contraseña
- ✅ Eliminación de usuarios
- ✅ Protección de rutas
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Arquitectura MVC en el backend
- ✅ Principios SOLID y Clean Code

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Express.js** - Framework web para Node.js
- **TypeScript** - Superset de JavaScript con tipado estático
- **Supabase** - Base de datos PostgreSQL
- **JWT** - JSON Web Tokens para autenticación
- **bcryptjs** - Encriptación de contraseñas

### Frontend
- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework CSS
- **React 19** - Librería de UI

---

## 📦 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Cuenta en Supabase

---

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/HansOr04/ProyectoCrud-Login.git
cd proyecto-crud
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuración

### Configuración de Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto
2. En el **SQL Editor**, ejecuta el siguiente script:

```sql
-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deshabilitar RLS
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Índices
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Variables de Entorno

#### Backend - `.env`

Crea el archivo `backend/.env` con el siguiente contenido:

```env
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://rwwvutqctjdlostqfahr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3d3Z1dHFjdGpkbG9zdHFmYWhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQzNiwiZXhwIjoyMDc1MjAyNDM2fQ.TvhyVichNoWahkiLNO05i11vXOji15AHoiaJGE0Gjws

# JWT Configuration
JWT_SECRET=PROYECTOCRUDAUTHHANSORTIZ
JWT_EXPIRES_IN=604800

# CORS
FRONTEND_URL=http://localhost:3000
```

#### Frontend - `.env.local`

Crea el archivo `frontend/.env.local` con el siguiente contenido:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📁 Estructura del Proyecto

```
proyecto-crud/
│
├── backend/
│   ├── src/
│   │   ├── config/           # Configuraciones (DB, JWT, Server)
│   │   ├── controllers/      # Controladores (Auth, Users)
│   │   ├── middlewares/      # Middlewares (Auth, Logger, ErrorHandler)
│   │   ├── models/           # Modelos y DTOs
│   │   ├── repositories/     # Capa de acceso a datos
│   │   ├── routes/           # Definición de rutas
│   │   ├── services/         # Lógica de negocio
│   │   ├── utils/            # Utilidades
│   │   ├── validators/       # Validaciones
│   │   └── server.ts         # Punto de entrada
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── app/
    │   ├── (auth)/           # Páginas de autenticación
    │   ├── dashboard/        # Dashboard
    │   ├── users/            # Gestión de usuarios
    │   └── layout.tsx
    ├── components/           # Componentes reutilizables
    ├── context/              # Context API (AuthContext)
    ├── hooks/                # Custom hooks
    ├── lib/                  # API client y utilidades
    ├── types/                # Tipos de TypeScript
    ├── constants/            # Constantes
    ├── .env.local
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Uso

### Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### Iniciar el Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 📡 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/me` | Usuario actual | Sí |

### Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Listar usuarios | Sí |
| GET | `/api/users/:id` | Obtener usuario | Sí |
| PUT | `/api/users/:id` | Actualizar usuario | Sí |
| DELETE | `/api/users/:id` | Eliminar usuario | Sí |

### Ejemplos de uso

#### Registro de usuario

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "123456"
}
```

#### Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "123456"
}
```

Respuesta:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "usuario@example.com",
    "created_at": "2025-10-05T03:10:11.34182+00:00",
    "updated_at": "2025-10-05T03:10:11.34182+00:00"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Listar usuarios (requiere autenticación)

```bash
GET http://localhost:5000/api/users
Authorization: Bearer {tu_token_aquí}
```

#### Actualizar usuario

```bash
PUT http://localhost:5000/api/users/{user_id}
Authorization: Bearer {tu_token_aquí}
Content-Type: application/json

{
  "email": "nuevoemail@example.com",
  "password": "nuevacontraseña"
}
```

#### Eliminar usuario

```bash
DELETE http://localhost:5000/api/users/{user_id}
Authorization: Bearer {tu_token_aquí}
```

---

## 🎨 Capturas de Pantalla

### Página Principal
Landing page con opciones de Login y Registro.

### Login
Formulario de inicio de sesión con validación.

### Dashboard
Panel principal con información del usuario y acciones rápidas.

### Gestión de Usuarios
Lista completa de usuarios con opciones de editar y eliminar.

---

## 📝 Características Técnicas

### Backend

#### Arquitectura MVC
- **Models**: Definición de datos y DTOs
- **Views**: Respuestas JSON
- **Controllers**: Manejo de requests HTTP

#### Principios SOLID
- **Single Responsibility**: Cada clase tiene una única responsabilidad
- **Open/Closed**: Abierto para extensión, cerrado para modificación
- **Liskov Substitution**: Las clases derivadas pueden sustituir a sus clases base
- **Interface Segregation**: Interfaces específicas por cliente
- **Dependency Inversion**: Dependencia de abstracciones, no de concreciones

#### Capas
```
Controller → Service → Repository → Database
```

### Frontend

#### Arquitectura
- **App Router**: Sistema de enrutamiento de Next.js 15
- **Context API**: Manejo de estado global de autenticación
- **Custom Hooks**: Lógica reutilizable
- **API Client**: Cliente centralizado para peticiones HTTP

#### Componentes
- Componentes funcionales con hooks
- Props tipadas con TypeScript
- Separación de responsabilidades

---

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt (10 salt rounds)
- Tokens JWT con expiración configurable
- Validación de datos en frontend y backend
- Protección de rutas en frontend
- Middleware de autenticación en backend
- Variables de entorno para datos sensibles

---

## 🧪 Testing

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

---

## 📚 Recursos Adicionales

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🐛 Problemas Conocidos

- El token JWT expira después de 7 días por defecto
- No hay paginación en la lista de usuarios
- No hay funcionalidad de recuperación de contraseña

---

## 🚧 Próximas Mejoras

- [ ] Paginación en lista de usuarios
- [ ] Búsqueda y filtros
- [ ] Recuperación de contraseña
- [ ] Refresh tokens
- [ ] Roles y permisos
- [ ] Testing unitario y de integración
- [ ] Docker para deployment
- [ ] CI/CD pipeline

---

## 👨‍💻 Autor

**Hans Ortiz**

- Email: hansalazar04@gmail.com
- GitHub: [@HansOr04](https://github.com/HansOr04)

---

## Licencia

Este proyecto es para uso educativo.

---


