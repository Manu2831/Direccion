import { useState } from 'react'
import './App.css'

const SUGGESTIONS = [
  'En mi equipo de 5, dos personas casi no aportan. ¿Como lo abordo?',
  'Quiero practicar la conversacion con un companero que siempre pone excusas.',
  '¿Como detectar roles de Belbin mal distribuidos en un trabajo final?'
]

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Soy BlackSay. Para empezar el diagnostico: ¿cuantos integrantes tiene tu grupo y que comportamientos concretos te hacen pensar en free-riding?'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const sendMessage = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const nextMessages = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages })
      })

      const raw = await response.text()
      let parsed = null
      try {
        parsed = raw ? JSON.parse(raw) : null
      } catch {
        parsed = null
      }

      if (!response.ok) {
        const detailed = parsed?.error || raw || `HTTP ${response.status}`
        throw new Error(detailed)
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: parsed?.reply || 'Sin respuesta.' }])
    } catch (err) {
      setError(err.message || 'Error inesperado.')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    await sendMessage(input)
  }

  return (
    <main className="page-shell">
      <aside className="sidebar">
        <header className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">
            B
          </span>
          <h1 className="brand-name">Blacksay</h1>
          <p className="brand-copy">
            Asistente academico para convertir equipos desordenados en grupos con metas claras, responsabilidad
            visible y conversaciones dificiles superadas.
          </p>
        </header>

        <div className="status-strip">
          <span className="status-pill">
            <span className="status-dot" />
            Sesion activa
          </span>
        </div>

        <section className="insight-box" aria-label="Preguntas sugeridas">
          <p className="box-kicker">Metodo de trabajo</p>
          <p>Analizo casos con roles de Belbin con evidencias de hechos para responder con diagnostico, rutas practicas y conversaciones concretas.</p>
          <div className="method-list">
            {SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                className="chip-btn"
                onClick={() => sendMessage(item)}
                disabled={isLoading}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <footer className="creator-block">
          <strong>Creador</strong>
          Juan Manuel, Kevin, Robert y Dixon. Estudiantes
          de Ingenieria de Sistemas.
        </footer>
      </aside>

      <section className="chat-panel">
        <header className="topbar">
          <div className="topbar-title">
            <h1>Coach de equipos y habilidades directivas</h1>
            <p>Diagnostico Belbin, manejo de free-riding y practica de conversaciones dificiles.</p>
          </div>
          <div className="topbar-actions">
            <button type="button" className="ghost-btn">
              Nueva sesion
            </button>
            <button type="button" className="ghost-btn">
              Exportar
            </button>
          </div>
        </header>

        <div className="chat-stage">
        <div id="chat" role="log" aria-live="polite">
          {messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={`msg-row ${message.role === 'assistant' ? 'bot' : 'user'}`}>
              <span className="message-label">{message.role === 'assistant' ? 'Blacksay' : 'Tu'}</span>
              <div className={`bubble ${message.role === 'assistant' ? 'bot' : 'user'}`}>
                <p>{message.content}</p>
              </div>
            </article>
          ))}
        </div>
        </div>

        <div className="composer-zone">
          <form className="input-shell" onSubmit={onSubmit}>
            <textarea
              id="inp"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Describe la situacion de tu equipo..."
              rows={1}
              disabled={isLoading}
            />
            <button id="send-btn" type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? '...' : '>'}
            </button>
          </form>
          <p className="input-hint">Enter para enviar - Shift+Enter para nueva linea</p>
        </div>

        {error ? <p className="error">{error}</p> : null}
      </section>
    </main>
  )
}

export default App

