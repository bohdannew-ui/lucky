'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    num: '01',
    title: 'Консультация',
    desc: 'Анализируем ваш кейс, определяем оптимальный тип разрешения. Бесплатно и ни к чему не обязывает.',
    time: '30 минут',
    chips: ['Бесплатно', 'Без обязательств', 'Онлайн'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Сбор документов',
    desc: 'Выдаём точный список под ваш кейс. Помогаем с переводами, апостилями и каждым шагом подготовки.',
    time: '1–2 недели',
    chips: ['Точный список', 'Переводы', 'Апостили'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Подача заявки',
    desc: 'Заполняем анкету, проверяем весь пакет и подаём онлайн или лично в воеводство.',
    time: '1 день',
    chips: ['Онлайн-подача', 'Проверка пакета', 'Запись в воеводство'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Решение',
    desc: 'Отслеживаем статус дела, отвечаем на запросы воеводства и сообщаем, когда карта готова.',
    time: '3–6 месяцев',
    chips: ['Контроль статуса', 'Ответы на wezwanie', 'Уведомление'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      display: 'flex', gap: 24, alignItems: 'flex-start',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
      transition: `opacity 0.55s ease ${index * 0.14}s, transform 0.55s ease ${index * 0.14}s`,
    }}>
      {/* Left: dot + line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          boxShadow: '0 0 0 6px #ede9fe, 0 4px 20px rgba(109,40,217,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
        }}>
          {step.icon}
        </div>
        {index < steps.length - 1 && (
          <div style={{ width: 2, flex: 1, minHeight: 40, background: 'linear-gradient(to bottom, #c4b5fd, #ede9fe)', marginTop: 4 }} />
        )}
      </div>

      {/* Right: content */}
      <div style={{ flex: 1, paddingBottom: index < steps.length - 1 ? 48 : 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          Шаг {step.num}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, color: '#0f0a1e', letterSpacing: '-0.025em', margin: 0 }}>
            {step.title}
          </h3>
          <span style={{
            fontSize: 12, fontWeight: 600, color: '#9086aa',
            background: '#f5f3ff', padding: '3px 12px', borderRadius: 100,
            border: '1px solid #ede9fe', whiteSpace: 'nowrap',
          }}>
            {step.time}
          </span>
        </div>
        <p style={{ fontSize: 15, color: '#6b5f8a', lineHeight: 1.7, marginBottom: 14, margin: '0 0 14px' }}>
          {step.desc}
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {step.chips.map(c => (
            <span key={c} style={{ fontSize: 13, fontWeight: 600, color: '#7c3aed', display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="6.5" r="6.5" fill="#ede9fe"/>
                <path d="M3.5 6.5l2 2 4-4" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" style={{ padding: '100px 0', background: '#faf9ff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <span className="chip-purple">Как мы работаем</span>
          </div>
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 900, letterSpacing: '-0.035em', color: '#0f0a1e', lineHeight: 1.08 }}>
            4 шага до <span className="gradient-text">карты побыту</span>
          </h2>
        </div>

        <div>
          {steps.map((step, i) => <StepCard key={step.num} step={step} index={i} />)}
        </div>

        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ color: '#9086aa', marginBottom: 24, fontSize: 15 }}>
            Среднее время решения: <strong style={{ color: '#0f0a1e' }}>3–6 месяцев</strong> от подачи заявки
          </p>
          <a href="#contact" className="btn-primary">Начать прямо сейчас →</a>
        </div>

      </div>
    </section>
  )
}
