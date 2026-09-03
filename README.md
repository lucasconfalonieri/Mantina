# Mantina

Plataforma de campus para una escuela de aviación.

- `mantina_front/` – app web para alumnos (React 16 + Create React App)
- `mantina_backoffice/` – administración de PDFs y alumnos (React 16 + Create React App)
- `mantina_back/` – API (Node/Express + MySQL)

## Requisitos

- Node.js `20.17.0` (fijado en el `.nvmrc` de cada app: `nvm use`)
- Docker (para la base de datos de desarrollo local, ver abajo)

## Base de datos local (desarrollo)

El backend en producción corre contra MariaDB en el hosting, pero para desarrollo local no conviene apuntar ahí directo (no siempre es alcanzable desde una red hogareña, y evita tocar datos reales de alumnos sin querer). `mantina_back/docker-compose.yml` levanta una MariaDB 10.11 local (misma versión que producción) en el puerto **3307** del host (no 3306, para no chocar con otros MySQL/MariaDB que ya tengas corriendo, ej. Laragon/XAMPP).

```
cd mantina_back
docker compose up -d
```

Si tenés un dump de la base (`.sql`, nunca se commitea — ver `.gitignore`), colocalo en `mantina_back/` y agregalo como volumen en `docker-compose.yml` bajo `/docker-entrypoint-initdb.d/` antes del primer `up` — se importa solo la primera vez que se crea el volumen. `mantina_back/.env` ya viene apuntando a esta base local (`DB_HOST=127.0.0.1`, `DB_PORT=3307`).

## Cómo levantar cada app

### mantina_back (API)

```
cd mantina_back
npm install
cp .env.example .env   # completar con las credenciales reales (o las de la DB local de arriba)
npm run dev             # http://localhost:9080
```

### mantina_front (alumnos)

```
cd mantina_front
npm install
cp .env.example .env.development   # apuntar REACT_APP_API_URL a la API local
npm start                           # http://localhost:3000
```

### mantina_backoffice (administración)

```
cd mantina_backoffice
npm install
cp .env.example .env.development   # apuntar REACT_APP_API_URL a la API local
npm start                           # http://localhost:3001
```

`mantina_front` y `mantina_backoffice` corren sobre Create React App 3, que necesita el flag `--openssl-legacy-provider` para funcionar con Node 17+; ya está resuelto vía `cross-env` en los scripts `start`/`build`/`test` de sus `package.json`, no requiere nada manual.
