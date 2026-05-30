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
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '52px 16px 16px',
    }}
      onClick={e => { if (e.target === e.currentTarget) close() }}
    >
      {/* Close button — OUTSIDE popup card, always visible */}
      <button onClick={close} style={{
        position: 'fixed', top: 16, right: 16,
        background: '#fff', border: '1px solid #ede9fe',
        width: 40, height: 40, borderRadius: '50%',
        color: '#7c3aed', cursor: 'pointer', fontSize: 18,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        zIndex: 1001,
      }}>✕</button>

      <div className="animate-pop-in" style={{
        maxWidth: 460, width: '100%', borderRadius: 24,
        background: '#fff', padding: '28px 24px 20px',
        boxShadow: '0 32px 100px rgba(0,0,0,0.25), 0 8px 30px rgba(109,40,217,0.15)',
        border: '1px solid #ede9fe', position: 'relative',
      }}>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0f0a1e', marginBottom: 10 }}>Спасибо!</h3>
            <p style={{ color: '#6b5f8a' }}>Свяжемся с вами в течение 1 часа.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span className="chip-purple" style={{ marginBottom: 10, display: 'inline-block' }}>Подождите!</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f0a1e', letterSpacing: '-0.025em', lineHeight: 1.2, marginTop: 8, marginBottom: 8 }}>
                Получите бесплатную{' '}
                <span className="gradient-text">консультацию</span>
              </h2>
              <p style={{ color: '#6b5f8a', fontSize: 13, lineHeight: 1.5 }}>
                Свяжемся в течение 1 часа и ответим на все вопросы.
              </p>
            </div>

            {/* Offer */}
            <div style={{
              background: '#f5f3ff', border: '1px solid #ede9fe', borderRadius: 12,
              padding: '10px 14px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🎁</span>
              <span style={{ fontSize: 13, color: '#4b4466', lineHeight: 1.4 }}>
                <strong style={{ color: '#7c3aed' }}>Анализ кейса бесплатно</strong> при записи через этот экран
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="text" required placeholder="Ваше имя"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="input-field" style={{ padding: '11px 14px' }} />
              <input type="tel" required placeholder="Телефон / WhatsApp"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="input-field" style={{ padding: '11px 14px' }} />
              <button type="submit" className="btn-primary" style={{ padding: '13px', borderRadius: 12, marginTop: 2, fontSize: 14 }}>
                Получить консультацию бесплатно →
              </button>
              <button type="button" onClick={close} style={{
                background: 'none', border: 'none', color: '#b0a8c8',
                fontSize: 12, cursor: 'pointer', padding: '2px',
              }}>
                Нет, спасибо
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
