'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>

        {/* Full-width CTA block */}
        <div style={{
          borderRadius: 32, overflow: 'hidden',
          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
          padding: '60px clamp(28px, 6vw, 80px)',
          boxShadow: '0 24px 80px rgba(109,40,217,0.3)',
          position: 'relative', marginBottom: 40,
        }}>
          {/* Decorative */}
          <div style={{ position: 'absolute', top: -100, right: -60, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, left: '20%', width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            {/* Left text */}
            <div>
              <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', marginBottom: 20 }}>
                Связаться с нами
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
                Начните путь<br />к легализации<br />сегодня
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 32 }}>
                Оставьте контакт — свяжемся в течение 1 часа и ответим на все вопросы.
              </p>

              {/* Contact items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: '📞', text: '+48 575 234 180 / +48 573 983 516' },
                  { icon: '📧', text: 'biuro.lucky.service@gmail.com' },
                  { icon: '📍', text: 'al. Karkonoska 45/510, 53-015 Wrocław' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Messenger buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <a href="https://wa.me/48575234180" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '11px 20px', borderRadius: 100,
                  background: '#25D366', color: '#fff', fontWeight: 600, fontSize: 14,
                  textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  💬 WhatsApp
                </a>
                <a href="https://t.me/luckyservicegroup" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '11px 20px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600, fontSize: 14,
                  textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  ✈️ Telegram
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <div style={{ background: '#fff', borderRadius: 24, padding: '36px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f0a1e', marginBottom: 10 }}>Заявка отправлена!</h3>
                  <p style={{ color: '#6b5f8a', fontSize: 15 }}>Свяжемся с вами в течение 1 часа в рабочее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f0a1e', marginBottom: 4 }}>Оставить заявку</h3>
                  <p style={{ fontSize: 13, color: '#9086aa', marginBottom: 8 }}>Бесплатная консультация — ни к чему не обязывает</p>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b5f8a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ваше имя</label>
                    <input type="text" required placeholder="Иван Иванов" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="input-field" />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b5f8a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Телефон / WhatsApp</label>
                    <input type="tel" required placeholder="+48 000 000 000" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="input-field" />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b5f8a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Интересующая услуга</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      className="input-field" style={{ cursor: 'pointer', background: '#faf9ff' }}>
                      <option value="" disabled>Выберите тип документа...</option>
                      <option value="work">Карта Побыту от работы</option>
                      <option value="extension">Продолжение дела</option>
                      <option value="business">Карта Побыту от бизнеса</option>
                      <option value="permanent">Карта Сталый Побыт</option>
                      <option value="resident">Карта Резидента</option>
                      <option value="blue">Blue Card</option>
                      <option value="family">Воссоединение с семьёй</option>
                      <option value="cukr">Карта CUKR</option>
                      <option value="wezwanie">Ответ на wezwanie</option>
                      <option value="other">Другое / не знаю</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b5f8a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Кратко о ситуации</label>
                    <textarea rows={3} placeholder="Расскажите о своей ситуации..." value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="input-field" style={{ resize: 'none' }} />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary"
                    style={{ padding: '14px', borderRadius: 12, marginTop: 4, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                    {loading ? 'Отправка...' : 'Отправить заявку →'}
                  </button>
                  <p style={{ fontSize: 12, color: '#b0a8c8', textAlign: 'center' }}>
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div > div { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #contact { padding: 48px 0 !important; overflow-x: hidden; }
          #contact > div { padding: 0 16px !important; }
          #contact > div > div { padding: 28px 20px !important; width: 100% !important; box-sizing: border-box !important; }
        }
      `}</style>
    </section>
  )
}
