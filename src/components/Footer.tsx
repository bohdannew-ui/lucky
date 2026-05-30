'use client'

export default function Footer() {
  return (
    <footer style={{ background: '#0f0a1e', padding: '64px 24px 36px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 13, color: '#fff',
                boxShadow: '0 4px 12px rgba(109,40,217,0.4)',
              }}>LSG</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Lucky Service Group</div>
                <div style={{ fontSize: 10, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Legalizacja Cudzoziemców</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
              Профессиональная помощь в легализации в Польше. Без скрытых доплат.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a78bfa', marginBottom: 20 }}>
              Услуги
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Карта Побыту от работы', 'Blue Card', 'Воссоединение с семьёй', 'Карта CUKR', 'Ответ на wezwanie'].map(s => (
                <a key={s} href="#pricing"
                  style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a78bfa', marginBottom: 20 }}>
              Контакты
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { text: '+48 575 234 180', href: 'tel:+48575234180' },
                { text: '+48 573 983 516', href: 'tel:+48573983516' },
                { text: 'biuro.lucky.service@gmail.com', href: 'mailto:biuro.lucky.service@gmail.com' },
              ].map(({ text, href }) => (
                <a key={text} href={href}
                  style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >{text}</a>
              ))}
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>
                al. Karkonoska 45/510<br />53-015 Wrocław
              </div>
            </div>
          </div>

          {/* Messengers */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a78bfa', marginBottom: 20 }}>
              Мессенджеры
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
              <a href="https://wa.me/48575234180" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderRadius: 12,
                  background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)',
                  color: '#4ade80', fontWeight: 600, fontSize: 14, textDecoration: 'none', transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}
              >💬 WhatsApp</a>
              <a href="https://t.me/luckyservicegroup" target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderRadius: 12,
                  background: 'rgba(41,182,246,0.1)', border: '1px solid rgba(41,182,246,0.2)',
                  color: '#38bdf8', fontWeight: 600, fontSize: 14, textDecoration: 'none', transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(41,182,246,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(41,182,246,0.1)'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.981l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.578z"/>
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Lucky Service Group. Все права защищены.
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            Вроцлав, Польша 🇵🇱
          </div>
        </div>
      </div>
    </footer>
  )
}
