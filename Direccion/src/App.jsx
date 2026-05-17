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
        'Soy EquiLibra. Para empezar el diagnostico: ¿cuantos integrantes tiene tu grupo y que comportamientos concretos te hacen pensar en free-riding?'
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
    <main className="app">
      <section className="panel">
        <header className="header">
          <p className="eyebrow">Coach IA para trabajo en equipo</p>
          <h1>EquiLibra</h1>
          <p className="subtitle">
            Diagnostica free-riding con roles de Belbin y recibe planes de accion
            aplicables para tu equipo universitario.
          </p>
        </header>

        <div className="suggestions" aria-label="Preguntas sugeridas">
          {SUGGESTIONS.map((item) => (
            <button
              key={item}
              type="button"
              className="chip"
              onClick={() => sendMessage(item)}
              disabled={isLoading}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="chat" role="log" aria-live="polite">
          {messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={`bubble ${message.role}`}>
              <p>{message.content}</p>
            </article>
          ))}
        </div>

        <form className="composer" onSubmit={onSubmit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe tu caso: tamano del grupo, roles y comportamientos concretos..."
            rows={3}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Analizando...' : 'Enviar'}
          </button>
        </form>

        {error ? <p className="error">{error}</p> : null}
      </section>
    </main>
  )
}

export default App
