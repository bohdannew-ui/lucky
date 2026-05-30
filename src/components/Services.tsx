'use client'

import { useState } from 'react'

const services = [
  { id: '01', name: 'Карта Побыту от работы', price: 1700, icon: '💼', featured: true,
    features: ['Анализ вашего кейса', 'Помощь в оформлении документов', 'Заполнение анкеты', 'Сопровождение до пластика'], badge: 'Популярное' },
  { id: '02', name: 'Карта Побыту от бизнеса', price: 1900, icon: '🏢',
    features: ['Для владельцев ИП и ООО', 'Анализ документов компании'] },
  { id: '03', name: 'Blue Card', price: 2200, icon: '💎',
    features: ['Для высококвалифицированных', 'Работа по всему ЕС'] },
  { id: '04', name: 'Карта Сталый Побыт', price: 2000, icon: '🏠',
    features: ['Постоянный вид на жительство', 'Полный пакет документов'] },
  { id: '05', name: 'Карта Резидента', price: 2000, icon: '🌍',
    features: ['Долгосрочное проживание ЕС', 'Оценка условий и подача'] },
  { id: '06', name: 'Воссоединение с семьёй', price: 1600, icon: '👨‍👩‍👧',
    features: ['Супруг(а) и дети', 'Полный анализ ситуации'] },
  { id: '07', name: 'Карта CUKR', price: 1400, icon: '🇺🇦',
    features: ['Для граждан Украины', 'Упрощённая процедура'] },
  { id: '08', name: 'Продолжение поданного дела', price: 1600, icon: '🔄',
    features: ['Проверка статуса', 'Подготовка недостающих документов'] },
  { id: '09', name: 'Ответ на wezwanie', price: 800, icon: '📋',
    features: ['Подготовка ответа на запрос', 'Контроль сроков'] },
]

export default function Services() {
  const featured = services[0]
  const rest = services.slice(1)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="pricing" style={{ padding: '100px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <span className="chip-purple">Прайс-лист 2026</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900,
            letterSpacing: '-0.035em', color: '#0f0a1e', marginBottom: 14, lineHeight: 1.08,
          }}>
            Услуги и <span className="gradient-text">стоимость</span>
          </h2>
          <p style={{ color: '#6b5f8a', fontSize: 17, maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
            Фиксированные цены без скрытых доплат.<br />Государственные пошлины оплачиваются отдельно.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 }}>

          {/* Featured card */}
          <div style={{
            borderRadius: 28,
            background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
            padding: '40px 40px',
            boxShadow: '0 24px 80px rgba(109,40,217,0.28)',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div style={{ position: 'absolute', top: -70, right: -70, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -50, left: '25%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: 28 }}>{featured.icon}</span>
                <span style={{
                  padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.28)',
                }}>{featured.badge}</span>
              </div>

              <h3 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {featured.name}
              </h3>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {featured.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.82)', fontSize: 14 }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="price-cta-row" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Стоимость</div>
                <div className="price-number" style={{ fontSize: 56, fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  {featured.price.toLocaleString()}<span style={{ fontSize: 22, fontWeight: 700 }}> zł</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>+ opłaty urzędowe</div>
              </div>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '13px 24px', borderRadius: 100,
                background: '#fff', color: '#7c3aed',
                fontWeight: 700, fontSize: 14, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.22)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)' }}
              >
                Подать заявку →
              </a>
            </div>
          </div>

          {/* Right: services list */}
          <div style={{
            borderRadius: 28, overflow: 'hidden',
            border: '1px solid #ede9fe',
            background: '#fff',
          }}>
            {rest.map((s, i) => {
              const isHovered = hoveredId === s.id
              return (
                <a
                  key={s.id}
                  href="#contact"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={() => setHoveredId(s.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 24px',
                    borderBottom: i < rest.length - 1 ? '1px solid #f5f2ff' : 'none',
                    borderLeft: `3px solid ${isHovered ? '#7c3aed' : 'transparent'}`,
                    background: isHovered ? '#faf8ff' : '#fff',
                    transition: 'all 0.22s ease',
                    cursor: 'pointer',
                  }}>
                    {/* Icon */}
                    <div style={{
                      width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                      background: isHovered ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, transition: 'all 0.22s',
                    }}>
                      {s.icon}
                    </div>

                    {/* Name + hint */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 14, fontWeight: 700,
                        color: isHovered ? '#7c3aed' : '#0f0a1e',
                        marginBottom: 2, transition: 'color 0.2s',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {s.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#b0a8c8' }}>
                        {s.features[0]}
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}>
                        {s.price.toLocaleString()} zł
                      </div>
                    </div>

                    {/* Arrow */}
                    <div style={{
                      width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                      background: isHovered ? '#7c3aed' : '#f0ecff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.22s',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke={isHovered ? '#fff' : '#7c3aed'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Referral banner */}
        <div style={{
          borderRadius: 20, padding: '24px 32px',
          background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
          border: '1px solid #ddd6fe',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
              boxShadow: '0 4px 16px rgba(109,40,217,0.3)',
            }}>🎁</div>
            <div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7c3aed', fontWeight: 700, marginBottom: 4 }}>
                Реферальная система · Polecenie
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#0f0a1e' }}>Приведи друга — получи бонус или скидку</div>
              <div style={{ fontSize: 13, color: '#6b5f8a', marginTop: 2 }}>Действует на любую услугу из прайс-листа</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }} className="gradient-text">−300 zł</div>
            <div style={{ fontSize: 12, color: '#9086aa', marginTop: 2 }}>ваш бонус</div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          section > div > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .price-cta-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .price-number { font-size: 44px !important; }
        }
      `}</style>
    </section>
  )
}
