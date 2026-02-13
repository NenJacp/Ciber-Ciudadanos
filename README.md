# Proyecto Ciber-Ciudadanos

Este proyecto consiste en un Front-End (Vue.js), un Back-End (Node.js/Express) y una base de datos gestionada con Docker Compose(no es necesario el docker ya que tiene un fallback para usar un JSON).

## Tabla de Contenidos
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Primeros Pasos](#primeros-pasos)
  - [1. Configuración del Back-End](#1-configuración-del-back-end)
  - [2. Configuración del Front-End](#2-configuración-del-front-end)
  - [3. Configuración de la Base de Datos (con Docker)](#3-configuración-de-la-base-de-datos-con-docker)
  - [4. Ejecutar las Aplicaciones](#4-ejecutar-las-aplicaciones)
- [Alternativa de Base de Datos (Sin Docker)](#alternativa-de-base-de-datos-sin-docker)

## Estructura del Proyecto
- `Front-End/`: Contiene la aplicación cliente Vue.js.
- `Back-End/`: Contiene el servidor Node.js/Express.
- `DB/`: Contiene la configuración de Docker Compose para la base de datos.

## Requisitos Previos
- Node.js (v20 o superior recomendado)
- pnpm (Gestor de paquetes: `npm install -g pnpm`)
- Docker & Docker Compose (si se ejecuta la base de datos con Docker)

## Primeros Pasos

### 1. Configuración del Back-End

Navega al directorio `Back-End` e instala las dependencias:
```bash
cd Back-End
pnpm install
```

### 2. Configuración del Front-End

Navega al directorio `Front-End` e instala las dependencias:
```bash
cd Front-End
pnpm install
```

### 3. Configuración de la Base de Datos (con Docker)

Navega al directorio `DB` e inicia la base de datos:
```bash
cd DB
docker-compose up -d
```
Esto iniciara una base de datos PostgreSQL accesible desde el backend.

### 4. Ejecutar las Aplicaciones

**Iniciar el Back-End:**
Navega al directorio `Back-End` y ejecuta el servidor:
```bash
cd Back-End
pnpm start
```

**Iniciar el Front-End:**
Navega al directorio `Front-End` y ejecuta el servidor de desarrollo:
```bash
cd Front-End
pnpm dev
```
La aplicación front-end estará disponible en `http://localhost:5173`.

## Alternativa de Base de Datos (Sin Docker)

Si no tienes Docker instalado o prefieres no usarlo, el backend está configurado para usar automáticamente un archivo JSON local (`Back-End/data/users.json`) como su base de datos.

**Para usar la alternativa JSON:**
1. Asegúrate de NO haber iniciado la base de datos de Docker (es decir, no ejecutes `docker-compose up -d`).
2. Simplemente inicia el Back-End como se describe en [4. Ejecutar las Aplicaciones](#4-ejecutar-las-aplicaciones) (ej. `cd Back-End && pnpm start`).
3. El backend detectará que no puede conectarse a PostgreSQL y usará `Back-End/data/users.json` para almacenar usuarios. Cualquier registro de nuevos usuarios se guardará en este archivo.

*Nota: La alternativa JSON es solo para propósitos de demostración y pruebas. No proporciona todas las funciones ni la robustez de una base de datos relacional como PostgreSQL.*
