'use client'

import { useEffect, useRef, useState } from 'react'

const pillars = [
  {
    stat: '98%',
    claim: 'положительных решений',
    detail: 'За 5 лет работы ни один клиент не был депортирован. Мы не берём кейсы, в которых не уверены.',
    icon: '🏆',
    accent: 'rgba(167,139,250,0.15)',
  },
  {
    stat: '0',
    claim: 'скрытых доплат',
    detail: 'Фиксированная цена прописана в договоре до начала работы и не меняется — никогда.',
    icon: '🔒',
    accent: 'rgba(52,211,153,0.1)',
  },
  {
    stat: '24ч',
    claim: 'максимум на ответ',
    detail: 'Личный менеджер закреплён за вами с первого дня. Ни одно письмо из воеводства не теряется.',
    icon: '⚡',
    accent: 'rgba(251,191,36,0.1)',
  },
]

const extras = [
  '✓ Работаем онлайн — без поездок в офис',
  '✓ Русский, польский, украинский',
  '✓ Все типы карт побыту и Blue Card',
  '✓ Анализ кейса бесплатно',
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Pillar({ p, index }: { p: typeof pillars[0]; index: number }) {
  const { ref, inView } = useInView()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.13}s, transform 0.6s cubic-bezier(0.34,1.1,0.64,1) ${index * 0.13}s`,
        background: hovered ? '#fff' : '#fff',
        border: `1px solid ${hovered ? '#c4b5fd' : '#ede9fe'}`,
        boxShadow: hovered
          ? '0 20px 60px rgba(109,40,217,0.13), 0 4px 16px rgba(0,0,0,0.05)'
          : '0 2px 16px rgba(109,40,217,0.06), 0 1px 4px rgba(0,0,0,0.03)',
        borderRadius: 24,
        padding: '40px 36px',
        transition2: 'background 0.3s, border 0.3s',
        cursor: 'default',
      } as React.CSSProperties}
    >
      {/* Accent glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 24,
        background: p.accent,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: 28, marginBottom: 20 }}>{p.icon}</div>

        <div style={{
          fontSize: 'clamp(56px, 6vw, 76px)', fontWeight: 900,
          letterSpacing: '-0.04em', lineHeight: 1,
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 10,
        }}>
          {p.stat}
        </div>

        <div style={{
          fontSize: 16, fontWeight: 700, color: '#0f0a1e',
          letterSpacing: '-0.01em', marginBottom: 14, textTransform: 'uppercase',
          fontSize2: 13, letterSpacing2: '0.06em',
        } as React.CSSProperties}>
          {p.claim}
        </div>

        <p style={{ fontSize: 14, color: '#6b5f8a', lineHeight: 1.7 }}>
          {p.detail}
        </p>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const { ref: headRef, inView: headVisible } = useInView(0.2)
  const { ref: extrasRef, inView: extrasVisible } = useInView(0.15)

  return (
    <section id="services" style={{
      padding: '100px 0',
      background: '#faf9ff',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background glows */}
      <div style={{
        position: 'absolute', top: -160, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(196,181,253,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center', marginBottom: 64,
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(28px)',
            transition: 'all 0.7s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 100,
              background: '#ede9fe', border: '1px solid #ddd6fe',
              color: '#6d28d9', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Наши гарантии
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 4.5vw, 52px)', fontWeight: 900,
            letterSpacing: '-0.035em', lineHeight: 1.1, marginBottom: 16,
            color: '#0f0a1e',
          }}>
            Легализация — это не лотерея.<br />
            Это система.
          </h2>
          <p style={{ color: '#6b5f8a', fontSize: 17, maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            500+ успешных дел за 5 лет. Системный подход и опыт — а не обещания.
          </p>
        </div>

        {/* Pillars */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20,
          marginBottom: 32,
        }}>
          {pillars.map((p, i) => (
            <div key={p.stat} style={{ position: 'relative' }}>
              <Pillar p={p} index={i} />
            </div>
          ))}
        </div>

        {/* Extras row */}
        <div
          ref={extrasRef}
          style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-start',
            padding: '28px 36px',
            background: '#fff',
            border: '1px solid #ede9fe',
            borderRadius: 20,
            opacity: extrasVisible ? 1 : 0,
            transform: extrasVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.3s',
          }}
        >
          {extras.map(e => (
            <div key={e} style={{
              fontSize: 14, fontWeight: 600, color: '#6b5f8a',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {e}
            </div>
          ))}
        </div>

      </div>
      <style>{`
        @media (max-width: 600px) {
          section[id="services"] { padding: 60px 0 !important; }
        }
      `}</style>
    </section>
  )
}
