# Mantina

Plataforma de campus para una escuela de aviación.

- `mantina_front/` – app web para alumnos (React 16 + Create React App)
- `mantina_backoffice/` – administración de PDFs y alumnos (React 16 + Create React App)
- `mantina_back/` – API (Node/Express + MySQL)

## Requisitos

- Node.js `20.17.0` (fijado en el `.nvmrc` de cada app: `nvm use`)
- MySQL accesible con las credenciales que configures en `mantina_back/.env`

## Cómo levantar cada app

### mantina_back (API)

```
cd mantina_back
npm install
cp .env.example .env   # completar con las credenciales reales
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
