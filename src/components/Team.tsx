'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const team = [
  {
    name: 'Александр',
    role: 'CEO · Co-owner',
    exp: '8+ лет',
    desc: 'Эксперт по легализации и трудоустройству иностранных граждан в Польше. HR Business Partner.',
    photo: '/team_p3.jpg',
    initials: null,
    color: null,
    linkedin: null,
    tag: 'Founder',
  },
  {
    name: 'Максим',
    role: 'CEO · Co-owner',
    exp: '6+ лет',
    desc: 'Эксперт по легализации и адаптации иностранных граждан. HR Manager, координация дел.',
    photo: '/team_p2.jpg',
    initials: null,
    color: null,
    linkedin: null,
    tag: 'Founder',
  },
  {
    name: 'Ната',
    role: 'HR & Creative Manager',
    exp: '2+ года',
    desc: 'Контент-стратегия, фото/видео продакшн, пиар компании. Опыт в медиаиндустрии Киева.',
    photo: '/team_p4.jpg',
    initials: null,
    color: null,
    linkedin: null,
    tag: 'Creative',
  },
  {
    name: 'Алексей',
    role: 'Client Support',
    exp: '3+ года',
    desc: 'Координация взаимодействия клиентов с легализационными структурами и поддержка подачи документов.',
    photo: '/team_p1.jpg',
    initials: null,
    color: null,
    linkedin: null,
    tag: 'Support',
  },
]

const tagColors: Record<string, { bg: string; color: string }> = {
  Founder: { bg: '#fef3c7', color: '#d97706' },
  Creative: { bg: '#fce7f3', color: '#be185d' },
  Support: { bg: '#dbeafe', color: '#1d4ed8' },
}

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

function MemberCard({ member, index }: { member: typeof team[0]; index: number }) {
  const { ref, inView } = useInView()
  const [hovered, setHovered] = useState(false)
  const tc = tagColors[member.tag]

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.34,1.2,0.64,1) ${index * 0.12}s`,
        cursor: 'default',
        height: '100%',
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff', borderRadius: 24,
          height: '100%',
          border: '1px solid',
          borderColor: hovered ? '#c4b5fd' : '#ede9fe',
          boxShadow: hovered
            ? '0 24px 60px rgba(109,40,217,0.15), 0 4px 16px rgba(0,0,0,0.06)'
            : '0 2px 16px rgba(109,40,217,0.06), 0 1px 4px rgba(0,0,0,0.04)',
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Photo area */}
        <div style={{
          position: 'relative', height: 280, overflow: 'hidden',
          background: member.photo ? '#f0ecff' : member.color!,
        }}>
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 56, fontWeight: 800, color: 'rgba(255,255,255,0.9)',
              letterSpacing: '-0.03em',
            }}>
              {member.initials}
            </div>
          )}

          {/* Gradient overlay bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)',
          }} />

          {/* Experience badge */}
          <div style={{
            position: 'absolute', top: 14, right: 14,
            padding: '4px 12px', borderRadius: 100,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            fontSize: 12, fontWeight: 700, color: '#7c3aed',
            border: '1px solid rgba(124,58,237,0.15)',
          }}>
            {member.exp}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '22px 24px 28px' }}>
          <h3 style={{
            fontSize: 22, fontWeight: 800, color: '#0f0a1e',
            letterSpacing: '-0.025em', marginBottom: 4,
          }}>
            {member.name}
          </h3>
          <div style={{
            fontSize: 12, fontWeight: 600, color: '#7c3aed',
            textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14,
          }}>
            {member.role}
          </div>
          <p style={{
            fontSize: 14, color: '#6b5f8a', lineHeight: 1.7,
            transition: 'color 0.2s',
          }}>
            {member.desc}
          </p>

          {/* Hover — contact hint */}
          <div style={{
            marginTop: 18, paddingTop: 16, borderTop: '1px solid #f0ecff',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 0.3s ease',
          }}>
            <span style={{ fontSize: 12, color: '#b0a8c8' }}>Связаться</span>
            <a href="#contact" style={{
              fontSize: 13, fontWeight: 600, color: '#7c3aed', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              Написать →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Team() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTitleVisible(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="team" style={{ padding: '100px 0', background: '#faf9ff', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,181,253,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, right: -60, width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center', marginBottom: 64,
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <span className="chip-purple">Наша команда</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800,
            letterSpacing: '-0.035em', color: '#0f0a1e', lineHeight: 1.08, marginBottom: 16,
          }}>
            Люди, которым<br />
            вы <span className="gradient-text">доверяете своё дело</span>
          </h2>
          <p style={{ color: '#6b5f8a', fontSize: 17, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            За каждым клиентом стоит живой специалист — не бот и не колл-центр.
            Мы отвечаем за каждый кейс лично.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 36 }}>
            {[
              { num: '4', label: 'специалиста' },
              { num: '5 лет', label: 'на рынке' },
              { num: '3', label: 'языка общения' },
            ].map(({ num, label }) => (
              <div key={label} style={{
                padding: '12px 16px', background: '#fff', borderRadius: 16,
                border: '1px solid #ede9fe',
                boxShadow: '0 2px 12px rgba(109,40,217,0.06)',
                textAlign: 'center', flex: 1,
              }}>
                <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em' }} className="number-gradient">{num}</div>
                <div style={{ fontSize: 12, color: '#9086aa', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
        }}>
          {team.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Bottom — "We're hiring" */}
        <div style={{
          marginTop: 48, borderRadius: 20, padding: '28px 36px',
          background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
          border: '1px solid #ddd6fe',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20, flexDirection: 'row',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, boxShadow: '0 4px 14px rgba(109,40,217,0.3)',
            }}>🤝</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f0a1e', marginBottom: 4 }}>
                Работаем на русском, польском, украинском и английском
              </div>
              <div style={{ fontSize: 14, color: '#6b5f8a' }}>
                Объясним каждый шаг понятным языком — без юридического жаргона
              </div>
            </div>
          </div>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0, width: '100%', maxWidth: 260 }}>
            Написать нам →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          #team .btn-primary { max-width: 100% !important; text-align: center; }
        }
      `}</style>
    </section>
  )
}
