'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

const COUNTRIES = [
  'Украина', 'Беларусь', 'Грузия', 'Молдова', 'Казахстан',
  'Узбекистан', 'Азербайджан', 'Армения', 'Россия', 'Индия',
  'Вьетнам', 'Филиппины', 'Непал', 'Другая',
]

const COUNTRY_CODES: Record<string, string> = {
  'Украина': 'UKR', 'Беларусь': 'BLR', 'Грузия': 'GEO', 'Молдова': 'MDA',
  'Казахстан': 'KAZ', 'Узбекистан': 'UZB', 'Азербайджан': 'AZE', 'Армения': 'ARM',
  'Россия': 'RUS', 'Индия': 'IND', 'Вьетнам': 'VNM', 'Филиппины': 'PHL',
  'Непал': 'NPL', 'Другая': 'XXX',
}

function EagleIcon() {
  return (
    <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
      <path d="M16 2C16 2 10 4 8 8C6 12 8 14 8 14C8 14 4 14 3 16C2 18 4 20 4 20C4 20 2 22 3 24C4 26 7 26 7 26C7 26 6 29 8 31C10 33 16 34 16 34C16 34 22 33 24 31C26 29 25 26 25 26C25 26 28 26 29 24C30 22 28 20 28 20C28 20 30 18 29 16C28 14 24 14 24 14C24 14 26 12 24 8C22 4 16 2 16 2Z" fill="white" opacity="0.9"/>
      <circle cx="13" cy="12" r="1.5" fill="#c8102e"/>
      <circle cx="19" cy="12" r="1.5" fill="#c8102e"/>
      <path d="M13 22H19" stroke="#c8102e" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

export default function KartaGenerator() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('Украина')
  const [flipped, setFlipped] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState({ x: -8, y: 15 })
  const [autoRotate, setAutoRotate] = useState(true)
  const dragStart = useRef({ x: 0, y: 0, rx: 0, ry: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const autoAngle = useRef(0)

  const displayName = name.trim() || 'ВАШЕ ИМЯ'
  const code = COUNTRY_CODES[country] || 'XXX'
  const today = new Date()
  const expiry = new Date(today.getFullYear() + 3, today.getMonth(), today.getDate())
  const expiryStr = expiry.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '.')
  const issueStr = today.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '.')
  const docNum = 'PL' + Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6) + code.slice(0, 2)

  // Auto float animation
  useEffect(() => {
    if (!autoRotate || isDragging) return
    const tick = () => {
      autoAngle.current += 0.4
      const x = -8 + Math.sin(autoAngle.current * 0.012) * 6
      const y = 15 + Math.sin(autoAngle.current * 0.008) * 12
      setRotation({ x, y })
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [autoRotate, isDragging])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    dragStart.current = { x: e.clientX, y: e.clientY, rx: rotation.x, ry: rotation.y }
  }, [rotation])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setRotation({
      x: Math.max(-35, Math.min(35, dragStart.current.rx - dy * 0.4)),
      y: dragStart.current.ry + dx * 0.4,
    })
  }, [isDragging])

  const onMouseUp = useCallback(() => {
    setIsDragging(false)
    setTimeout(() => setAutoRotate(true), 2000)
  }, [])

  // Touch support
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    setIsDragging(true)
    setAutoRotate(false)
    dragStart.current = { x: t.clientX, y: t.clientY, rx: rotation.x, ry: rotation.y }
  }, [rotation])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    const t = e.touches[0]
    const dx = t.clientX - dragStart.current.x
    const dy = t.clientY - dragStart.current.y
    setRotation({
      x: Math.max(-35, Math.min(35, dragStart.current.rx - dy * 0.4)),
      y: dragStart.current.ry + dx * 0.4,
    })
  }, [isDragging])

  const cardTransform = `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(160deg, #0f0a1e 0%, #1a1040 50%, #0f0a1e 100%)', position: 'relative', overflow: 'hidden' }}>

      {/* Background stars */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(40)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 23 + 7) % 100}%`,
            animation: `twinkle ${2 + (i % 3)}s ease-in-out ${i * 0.2}s infinite alternate`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 100, background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)', marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', display: 'inline-block', animation: 'pulse-ring 2s infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Интерактивный генератор</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
            Как будет выглядеть<br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ваша карта побыту
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Введите данные — карта обновится в реальном времени</p>
        </div>

        <div className="karta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* Left — 3D card */}
          <div className="karta-card-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <div className="karta-scale-wrap">
            <div
              ref={cardRef}
              style={{ cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', touchAction: 'none' }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
            >
              <div style={{
                width: 340, height: 214,
                position: 'relative',
                transform: cardTransform,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.1s ease',
                filter: 'drop-shadow(0 40px 60px rgba(124,58,237,0.5))',
              }}>

                {/* ── FRONT SIDE ── */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 16,
                  backfaceVisibility: 'hidden',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #003189 0%, #0050c8 40%, #0066ff 70%, #1a7aff 100%)',
                }}>
                  {/* Holographic overlay */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: 16,
                    background: `linear-gradient(${rotation.y * 2}deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.0) 60%, rgba(160,120,255,0.08) 80%, rgba(255,255,255,0.0) 100%)`,
                    pointerEvents: 'none', zIndex: 10,
                    transition: 'background 0.1s',
                  }} />
                  {/* Subtle pattern */}
                  <div style={{
                    position: 'absolute', inset: 0, opacity: 0.06,
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(255,255,255,0.5) 8px, rgba(255,255,255,0.5) 9px)',
                  }} />
                  {/* Red stripe top */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#c8102e' }} />

                  {/* Top row */}
                  <div style={{ padding: '14px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', fontWeight: 600 }}>RZECZPOSPOLITA POLSKA</div>
                      <div style={{ fontSize: 11, color: '#fff', fontWeight: 800, letterSpacing: '0.08em', marginTop: 1 }}>KARTA POBYTU</div>
                      <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>RESIDENCE PERMIT</div>
                    </div>
                    <EagleIcon />
                  </div>

                  {/* Body */}
                  <div style={{ padding: '8px 16px', display: 'flex', gap: 12 }}>
                    {/* Photo */}
                    <div style={{
                      width: 64, height: 80, borderRadius: 6, flexShrink: 0,
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                      overflow: 'hidden',
                    }}>
                      <svg width="40" height="52" viewBox="0 0 40 52" fill="none">
                        <circle cx="20" cy="16" r="12" fill="rgba(255,255,255,0.4)"/>
                        <path d="M2 52C2 38 38 38 38 52" fill="rgba(255,255,255,0.4)"/>
                      </svg>
                    </div>

                    {/* Fields */}
                    <div style={{ flex: 1 }}>
                      {[
                        { label: 'Nazwisko / Surname', value: displayName.split(' ').slice(-1)[0]?.toUpperCase() || displayName.toUpperCase(), big: true },
                        { label: 'Imię / Given name', value: displayName.split(' ').slice(0, -1).join(' ').toUpperCase() || displayName.toUpperCase() },
                        { label: 'Narodowość / Nationality', value: country.toUpperCase() },
                        { label: 'Ważny do / Valid until', value: expiryStr },
                      ].map(f => (
                        <div key={f.label} style={{ marginBottom: 5 }}>
                          <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.label}</div>
                          <div style={{
                            fontSize: f.big ? 10 : 9, fontWeight: f.big ? 700 : 600,
                            color: '#fff', letterSpacing: '0.04em',
                            maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>{f.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom MRZ-style */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(0,0,0,0.3)', padding: '5px 12px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', fontFamily: 'monospace' }}>
                      {`${docNum}POL${code}<<<<<<<<<<<<<<<<`}
                    </div>
                    <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', fontFamily: 'monospace' }}>
                      {`${displayName.replace(/\s/g, '<').toUpperCase().slice(0, 20).padEnd(20, '<')}<<POL`}
                    </div>
                  </div>

                  {/* Chip */}
                  <div style={{
                    position: 'absolute', bottom: 30, right: 16,
                    width: 28, height: 22, borderRadius: 4,
                    background: 'linear-gradient(135deg, #d4af37, #f5d96b, #d4af37)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}>
                    <div style={{ position: 'absolute', inset: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.2)' }} />
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,0.15)' }} />
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.15)' }} />
                  </div>
                </div>

                {/* ── BACK SIDE ── */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 16,
                  backfaceVisibility: 'hidden',
                  transform: flipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #002070 0%, #003189 100%)',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#c8102e' }} />
                  <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 36, background: '#111' }} />

                  {/* Signature strip */}
                  <div style={{ position: 'absolute', top: 58, left: 16, right: 16, height: 24, background: 'rgba(255,255,255,0.9)', borderRadius: 3, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                    <div style={{ fontSize: 9, color: '#666', fontStyle: 'italic' }}>{name || 'Podpis / Signature'}</div>
                  </div>

                  {/* Info fields */}
                  <div style={{ position: 'absolute', top: 94, left: 16, right: 16 }}>
                    {[
                      ['Data wydania / Issue date', issueStr],
                      ['Nr dokumentu / Doc. number', docNum],
                      ['Organ wydający / Authority', 'ŚLĄSKI UW KATOWICE'],
                    ].map(([l, v]) => (
                      <div key={l} style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>{l}</div>
                        <div style={{ fontSize: 7.5, color: '#fff', fontWeight: 600, letterSpacing: '0.04em' }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Barcode */}
                  <div style={{ position: 'absolute', bottom: 24, right: 16, display: 'flex', gap: 1 }}>
                    {[3,1,2,3,1,2,1,3,2,1,3,1,2,3,1].map((w, i) => (
                      <div key={i} style={{ width: w, height: 28, background: i % 2 === 0 ? '#fff' : 'transparent' }} />
                    ))}
                  </div>

                  {/* EU flag */}
                  <div style={{ position: 'absolute', bottom: 18, left: 16, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <div style={{ width: 20, height: 14, background: '#003399', borderRadius: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                      {[...Array(12)].map((_, i) => (
                        <div key={i} style={{ width: 2, height: 2, borderRadius: '50%', background: '#fc0', margin: 1 }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>UNIA EUROPEJSKA</div>
                  </div>
                </div>

              </div>
            </div>

            </div>{/* /karta-scale-wrap */}

            {/* Controls */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button
                onClick={() => setFlipped(f => !f)}
                style={{
                  padding: '10px 22px', borderRadius: 100,
                  background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.5)',
                  color: '#a78bfa', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.4)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.25)'}
              >
                ↩ Перевернуть
              </button>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                Тяни мышью / пальцем
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 24, padding: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Персонализируй карту</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Данные обновляются в реальном времени</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Ваше имя и фамилия
                  </label>
                  <input
                    type="text"
                    placeholder="Например: Иван Петров"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={30}
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit',
                      transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.7)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                    Гражданство
                  </label>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: 12,
                      background: '#1a1040', border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Preview info */}
                <div style={{ background: 'rgba(124,58,237,0.15)', borderRadius: 12, padding: '16px', border: '1px solid rgba(124,58,237,0.3)' }}>
                  <div style={{ fontSize: 11, color: '#a78bfa', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Параметры карты
                  </div>
                  {[
                    ['Тип', 'Карта Побыту · Работа'],
                    ['Срок действия', '3 года'],
                    ['Дата выдачи', issueStr],
                    ['Действует до', expiryStr],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{l}</span>
                      <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>

                <a href="#contact" style={{
                  display: 'block', textAlign: 'center', padding: '14px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  boxShadow: '0 4px 24px rgba(124,58,237,0.5)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.6)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.5)' }}
                >
                  Хочу такую карту — консультация →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(1); }
          to   { opacity: 0.8; transform: scale(1.4); }
        }
        .karta-scale-wrap {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 760px) {
          .karta-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .karta-card-col { order: 1; }
          .karta-grid > div:last-child { order: 2; }
          .karta-scale-wrap {
            transform: scale(0.82);
            transform-origin: center top;
            margin-bottom: -24px;
          }
        }
        @media (max-width: 400px) {
          .karta-scale-wrap {
            transform: scale(0.72);
            margin-bottom: -40px;
          }
        }
      `}</style>
    </section>
  )
}
