# EquiLibra Web (React + Vite + Netlify)

Web sencilla para un coach IA de management de equipos (Belbin + free-riding) usando Gemini.

## Desarrollo local

```bash
npm install
npm run dev
```

## Variables de entorno

Crea `.env` localmente a partir de `.env.example` si vas a usar Netlify Dev.

```env
GEMINI_API_KEY=tu_api_key
```

## Deploy en Netlify

1. Sube este proyecto a tu repo.
2. En Netlify: `Build command` = `npm run build`, `Publish directory` = `dist`.
3. Agrega variable de entorno: `GEMINI_API_KEY`.
4. Deploy.

La ruta frontend `/api/chat` ya redirige a `/.netlify/functions/chat` por `netlify.toml`.