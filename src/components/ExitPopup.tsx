'use client'

import { useEffect, useState } from 'react'

export default function ExitPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (dismissed) return
    let triggered = false

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) {
        triggered = true
        setVisible(true)
      }
    }
    const timer = setTimeout(() => {
      if (!triggered && !dismissed) { triggered = true; setVisible(true) }
    }, 35000)

    document.addEventListener('mouseleave', onMouseLeave)
    return () => { document.removeEventListener('mouseleave', onMouseLeave); clearTimeout(timer) }
  }, [dismissed])

  const close = () => { setVisible(false); setDismissed(true) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise(r => setTimeout(r, 800))
    setSent(true)
    setTimeout(close, 2500)
  }

  if (!visible) return null

  return (
    <div className="popup-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}
      onClick={e => { if (e.target === e.currentTarget) close() }}
    >
      <div className="animate-pop-in" style={{
        maxWidth: 500, width: '100%', borderRadius: 28,
        background: '#fff', padding: '44px 40px',
        boxShadow: '0 32px 100px rgba(0,0,0,0.25), 0 8px 30px rgba(109,40,217,0.15)',
        border: '1px solid #ede9fe', position: 'relative',
      }}>
        {/* Close */}
        <button onClick={close} style={{
          position: 'absolute', top: 16, right: 16,
          background: '#f5f3ff', border: '1px solid #ede9fe',
          width: 32, height: 32, borderRadius: '50%',
          color: '#7c3aed', cursor: 'pointer', fontSize: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#ede9fe'}
          onMouseLeave={e => e.currentTarget.style.background = '#f5f3ff'}
        >✕</button>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0f0a1e', marginBottom: 10 }}>Спасибо!</h3>
            <p style={{ color: '#6b5f8a' }}>Свяжемся с вами в течение 1 часа.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>⏳</div>
              <span className="chip-purple" style={{ marginBottom: 14, display: 'inline-block' }}>Подождите!</span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f0a1e', letterSpacing: '-0.025em', lineHeight: 1.2, marginTop: 12, marginBottom: 12 }}>
                Получите бесплатную<br />
                <span className="gradient-text">консультацию прямо сейчас</span>
              </h2>
              <p style={{ color: '#6b5f8a', fontSize: 15, lineHeight: 1.6 }}>
                Наш специалист свяжется в течение 1 часа и ответит на все вопросы по легализации.
              </p>
            </div>

            {/* Offer */}
            <div style={{
              background: '#f5f3ff', border: '1px solid #ede9fe', borderRadius: 14,
              padding: '14px 18px', marginBottom: 24,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 22 }}>🎁</span>
              <span style={{ fontSize: 14, color: '#4b4466', lineHeight: 1.5 }}>
                Бонус: <strong style={{ color: '#7c3aed' }}>анализ вашего кейса бесплатно</strong> при записи через этот экран
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input type="text" required placeholder="Ваше имя"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="input-field" />
              <input type="tel" required placeholder="Телефон / WhatsApp"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="input-field" />
              <button type="submit" className="btn-primary" style={{ padding: '14px', borderRadius: 12, marginTop: 4 }}>
                Получить консультацию бесплатно →
              </button>
              <button type="button" onClick={close} style={{
                background: 'none', border: 'none', color: '#b0a8c8',
                fontSize: 13, cursor: 'pointer', padding: '4px',
              }}>
                Нет, спасибо — уйду без консультации
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
