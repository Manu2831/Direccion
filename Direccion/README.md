# BlackSay Web

Aplicacion web de coaching academico para equipos universitarios.  
BlackSay ayuda a diagnosticar y corregir problemas de trabajo en equipo con enfoque en:

- Roles de Belbin.
- Free-riding (aporte inequitativo en grupos).
- Conversaciones dificiles entre companeros.

## Funcionalidades principales

- Chat IA especializado en equipos academicos.
- Diagnostico guiado con preguntas concretas cuando falta contexto.
- Analisis de roles Belbin presentes, ausentes o mal distribuidos.
- Clasificacion del tipo de free-riding detectado.
- Retroalimentacion directa y constructiva (que se hizo bien y que se hizo mal).
- Planes de accion practicos (2-3 acciones aplicables, no consejos vagos).
- Seguimiento posterior para ajustar estrategias.
- Modo simulacion para practicar conversaciones con un companero que pone excusas.
- Respuestas adaptativas:
  - Mensajes sociales cortos (hola, gracias, ok) -> respuesta breve.
  - Casos reales de equipo -> protocolo completo de intervencion.
- Sugerencias de preguntas predefinidas en la interfaz para iniciar rapido.
- Manejo de errores en frontend y backend (fallas de red, API key faltante, metodos no permitidos, etc.).

## Criterios de la IA (prompts del sistema)

La IA esta configurada para:

- Priorizar Belbin y literatura sobre free-riding.
- Evitar respuestas genericas.
- Entregar recomendaciones accionables.
- Mantener tono profesional-formativo (exigente y empatico).
- Estructurar respuestas de casos en 6 bloques:
  - DIAGNOSTICO
  - ANALISIS BELBIN
  - DIAGNOSTICO DE FREE-RIDING
  - RETROALIMENTACION
  - PLAN DE ACCION
  - SEGUIMIENTO

## Stack tecnico

- Frontend: React + Vite.
- Backend local: servidor Node (`local-api.mjs`) con endpoint `/api/chat`.
- Backend deploy: Netlify Function (`functions/chat.js`).
- Modelo de IA: Google Gemini (`gemini-2.5-flash`).

## Estructura del proyecto

```text
Direccion/
  src/                  # UI React
  functions/chat.js     # Funcion serverless para Netlify
  local-api.mjs         # API local para desarrollo
  netlify.toml          # Redirecciones y config de Netlify
  .env.example          # Variables de entorno de ejemplo
```

## Desarrollo local

Desde `Direccion/`:

```bash
npm install
```

Inicia la API local:

```bash
npm run dev:api
```

En otra terminal, inicia el frontend:

```bash
npm run dev
```

## Variables de entorno

Crea `.env` a partir de `.env.example`:

```env
GEMINI_API_KEY=tu_api_key
API_PORT=8791
```

- `GEMINI_API_KEY`: clave de Google AI Studio / Gemini.
- `API_PORT`: puerto de la API local (por defecto `8791`).

## Deploy en Netlify

Si esta app vive en una subcarpeta del repositorio, usa:

- Base directory: `Direccion`
- Build command: `npm run build`
- Publish directory: `dist`

Variable de entorno en Netlify:

- `GEMINI_API_KEY` = tu API key real.

La ruta del frontend `/api/chat` se redirige a `/.netlify/functions/chat` mediante `netlify.toml`.
