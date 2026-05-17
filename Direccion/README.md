# EquiLibra Web (React + Vite + Gemini + Netlify)

App web para coaching de trabajo en equipo (Belbin + free-riding) con frontend React y backend serverless en Netlify.

## Desarrollo local (sin Netlify)

Usa dos terminales dentro de `Direccion/`:

```bash
npm install
npm run dev:api
npm run dev
```

## Variables de entorno

Crea `.env` a partir de `.env.example`:

```env
GEMINI_API_KEY=tu_api_key
API_PORT=8791
```

## Deploy en Netlify

Si tu repo contiene esta app dentro de una subcarpeta, en Netlify configura:

- Base directory: `Direccion`
- Build command: `npm run build`
- Publish directory: `dist`

Variables de entorno en Netlify:

- `GEMINI_API_KEY` = tu API key real

La ruta frontend `/api/chat` se redirige a `/.netlify/functions/chat` por `netlify.toml`.