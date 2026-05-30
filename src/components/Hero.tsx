'use client'

import { useState, useEffect } from 'react'

const ALL_FEED = [
  { country: 'ua', name: 'Оксана М.',   service: 'Карта побыту · работа',   status: 'Одобрено', color: '#16a34a', bg: '#dcfce7' },
  { country: 'by', name: 'Дмитрий С.',  service: 'Blue Card EU',             status: 'Получена', color: '#16a34a', bg: '#dcfce7' },
  { country: 'np', name: 'Raj B.',       service: 'Wezwanie · ответ',        status: 'Решено',   color: '#7c3aed', bg: '#ede9fe' },
  { country: 'ua', name: 'Андрій Л.',   service: 'Воссоединение семьи',      status: 'Подано',   color: '#0369a1', bg: '#e0f2fe' },
  { country: 'md', name: 'Ион П.',       service: 'Карта CUKR',              status: 'Одобрено', color: '#16a34a', bg: '#dcfce7' },
  { country: 'ge', name: 'Нино Г.',     service: 'Карта побыту · работа',   status: 'Одобрено', color: '#16a34a', bg: '#dcfce7' },
  { country: 'kz', name: 'Алия Н.',     service: 'Сталый побыт',            status: 'Одобрено', color: '#16a34a', bg: '#dcfce7' },
  { country: 'uz', name: 'Дилноза К.',  service: 'Карта побыту · работа',   status: 'Одобрено', color: '#16a34a', bg: '#dcfce7' },
  { country: 'az', name: 'Эмиль Р.',    service: 'Blue Card EU',             status: 'Подано',   color: '#0369a1', bg: '#e0f2fe' },
  { country: 'am', name: 'Артур М.',    service: 'Воссоединение семьи',      status: 'Получена', color: '#16a34a', bg: '#dcfce7' },
  { country: 'in', name: 'Arjun P.',    service: 'Blue Card EU',             status: 'Одобрено', color: '#16a34a', bg: '#dcfce7' },
  { country: 'ph', name: 'Maria S.',    service: 'Карта побыту · работа',   status: 'Подано',   color: '#0369a1', bg: '#e0f2fe' },
  { country: 'vn', name: 'Linh T.',     service: 'Wezwanie · ответ',        status: 'Решено',   color: '#7c3aed', bg: '#ede9fe' },
  { country: 'ua', name: 'Катерина В.', service: 'Карта CUKR',              status: 'Одобрено', color: '#16a34a', bg: '#dcfce7' },
  { country: 'by', name: 'Алина С.',    service: 'Воссоединение семьи',      status: 'Подано',   color: '#0369a1', bg: '#e0f2fe' },
]

type FeedItem = typeof ALL_FEED[0] & { id: number; isNew: boolean }

const TIMES = ['только что', '2 мин назад', '18 мин назад', '45 мин назад', '2 ч назад']

export default function Hero() {
  const [items, setItems] = useState<FeedItem[]>(() =>
    ALL_FEED.slice(0, 5).map((f, i) => ({ ...f, id: i, isNew: false }))
  )
  const [cursor, setCursor] = useState(5)

  useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => {
        const next = ALL_FEED[cursor % ALL_FEED.length]
        const newItem: FeedItem = { ...next, id: Date.now(), isNew: true }
        return [newItem, ...prev.slice(0, 4)]
      })
      setCursor(c => c + 1)
    }, 8000)
    return () => clearInterval(t)
  }, [cursor])

  return (
    <section id="hero" style={{ position: 'relative', overflow: 'hidden', paddingTop: 68 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #faf8ff 0%, #ede9ff 35%, #fdf9ff 65%, #fff 100%)',
      }} />
      <div className="dots-bg" style={{ position: 'absolute', inset: 0, opacity: 0.45 }} />
      <div style={{
        position: 'absolute', top: -180, right: -120, width: 640, height: 640, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80, width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,181,253,0.13) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '72px 24px 96px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '56% 44%', gap: 48, alignItems: 'start' }}>

          {/* ── LEFT ── */}
          <div>

            {/* H1 */}
            <h1
              className="animate-fade-in-up"
              style={{
                fontSize: 'clamp(42px, 5.4vw, 68px)', fontWeight: 900,
                lineHeight: 1.06, letterSpacing: '-0.04em',
                color: '#0f0a1e', marginBottom: 22,
                opacity: 0, animationDelay: '0.12s', animationFillMode: 'forwards',
              }}
            >
              Боитесь потерять<br />
              право на жизнь<br />
              <span className="gradient-text">в Польше?</span>
            </h1>

            {/* Subhead */}
            <p
              className="animate-fade-in-up"
              style={{
                fontSize: 17, color: '#6b5f8a', lineHeight: 1.7,
                marginBottom: 28, maxWidth: 460,
                opacity: 0, animationDelay: '0.22s', animationFillMode: 'forwards',
              }}
            >
              Wezwanie, горящие сроки, отказ по документам —<br />
              решаем любую ситуацию <strong style={{ color: '#0f0a1e' }}>быстро и без депортаций</strong>.
            </p>

            {/* Promise row */}
            <div
              className="animate-fade-in-up hero-checks"
              style={{
                display: 'flex', gap: 24, marginBottom: 36, flexWrap: 'wrap',
                opacity: 0, animationDelay: '0.3s', animationFillMode: 'forwards',
              }}
            >
              {['Без очередей', 'Без отказов', 'Без риска депортации'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#0f0a1e' }}>
                  <span style={{ color: '#22c55e', fontSize: 17, lineHeight: 1 }}>✓</span>
                  {t}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="animate-fade-in-up hero-btns"
              style={{
                display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14,
                opacity: 0, animationDelay: '0.38s', animationFillMode: 'forwards',
              }}
            >
              <a
                href="https://t.me/luckyservicegroup"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  gap: 8, padding: '14px 28px', borderRadius: 100,
                  background: '#29B6F6', color: '#fff', fontWeight: 700, fontSize: 15,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(41,182,246,0.45)',
                  transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(41,182,246,0.55)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(41,182,246,0.45)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.981l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.578z"/>
                </svg>
                Написать в Telegram
              </a>
              <a href="#contact" className="btn-secondary">
                Консультация →
              </a>
            </div>

            <div
              className="animate-fade-in-up"
              style={{
                fontSize: 13, color: '#9086aa', display: 'flex', alignItems: 'center', gap: 6,
                opacity: 0, animationDelay: '0.44s', animationFillMode: 'forwards',
              }}
            >
              <span style={{ color: '#f59e0b' }}>⚡</span>
              Ответим в течение 1 часа
            </div>

            {/* Stats */}
            <div
              className="animate-fade-in-up hero-stats"
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '8px 36px', marginTop: 48,
                opacity: 0, animationDelay: '0.52s', animationFillMode: 'forwards',
              }}
            >
              {[
                { num: '500+', label: 'успешных дел' },
                { num: '0', label: 'депортаций' },
                { num: '98%', label: 'положительных решений' },
                { num: '5 лет', label: 'на рынке' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }} className="number-gradient">{num}</div>
                  <div style={{ fontSize: 12, color: '#9086aa', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — live results feed ── */}
          <div
            className="animate-fade-in-up"
            style={{ opacity: 0, animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div style={{ position: 'relative' }}>

              {/* Feed card */}
              <div style={{
                background: '#fff', borderRadius: 28,
                border: '1px solid #ede9fe',
                boxShadow: '0 28px 80px rgba(109,40,217,0.11), 0 4px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden',
              }}>

                {/* Card header */}
                <div style={{
                  padding: '18px 24px', borderBottom: '1px solid #f0ecff',
                  background: 'linear-gradient(135deg, #faf8ff 0%, #f4f0ff 100%)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f0a1e' }}>
                    Последние результаты
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#16a34a' }}>
                    <span style={{
                      width: 7, height: 7, borderRadius: '50%', background: '#22c55e',
                      display: 'inline-block', animation: 'pulse-ring 2s infinite',
                    }} />
                    В прямом эфире
                  </div>
                </div>

                {/* Feed items */}
                <div style={{ overflow: 'hidden' }}>
                  {items.map((item, i) => (
                    <div key={item.id} style={{
                      animation: item.isNew ? 'feedSlideIn 0.4s cubic-bezier(0.34,1.2,0.64,1)' : 'none',
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '13px 24px',
                      background: i === 0 ? 'rgba(220,252,231,0.4)' : 'transparent',
                      borderBottom: i < items.length - 1 ? '1px solid #f5f3ff' : 'none',
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://flagcdn.com/w40/${item.country}.png`} alt={item.country} width={28} height={21} style={{ borderRadius: 4, flexShrink: 0, objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0f0a1e', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: 12, color: '#6b5f8a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.service}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{
                          fontSize: 11, fontWeight: 700,
                          color: item.color,
                          padding: '3px 9px', borderRadius: 100, marginBottom: 3,
                          background: item.bg,
                        }}>
                          {item.status}
                        </div>
                        <div style={{ fontSize: 11, color: '#9086aa' }}>{TIMES[i] ?? TIMES[4]}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA inside card */}
                <div style={{ padding: '16px 24px', background: '#faf8ff', borderTop: '1px solid #f0ecff' }}>
                  <a href="#contact" style={{
                    display: 'block', textAlign: 'center', padding: '13px 20px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                    color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(109,40,217,0.32)',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 7px 22px rgba(109,40,217,0.42)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(109,40,217,0.32)' }}
                  >
                    Хочу такой же результат →
                  </a>
                </div>
              </div>

              {/* Floating badge — top right */}
              <div style={{
                position: 'absolute', top: -18, right: -18,
                background: '#fff', borderRadius: 14, padding: '10px 16px',
                boxShadow: '0 8px 32px rgba(109,40,217,0.18)', border: '1px solid #ede9fe',
                display: 'flex', alignItems: 'center', gap: 8,
              }} className="animate-float">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 21h8M12 17v4M7 4H4a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V6a2 2 0 0 0-2-2h-3"/>
                    <rect x="7" y="2" width="10" height="12" rx="2"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0f0a1e' }}>0 депортаций</div>
                  <div style={{ fontSize: 11, color: '#9086aa' }}>за 5 лет работы</div>
                </div>
              </div>

              {/* Floating badge — bottom left */}
              <div style={{
                position: 'absolute', bottom: -16, left: -16,
                background: '#fff', borderRadius: 14, padding: '10px 16px',
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)', border: '1px solid #e9d5ff',
                display: 'flex', alignItems: 'center', gap: 8,
                animationDelay: '1.2s',
              }} className="animate-float">
                <div style={{ width: 28, height: 28, borderRadius: 7, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#d97706"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#0f0a1e' }}>98% одобрений</div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
        background: 'linear-gradient(to bottom, transparent, #fff)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes feedSlideIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          #hero > div > div { grid-template-columns: 1fr !important; }
          #hero > div > div > div:last-child { display: none; }
        }
        @media (max-width: 600px) {
          .hero-btns { flex-wrap: wrap !important; }
          .hero-checks { flex-direction: column !important; gap: 8px !important; }
          .hero-stats { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  )
}
