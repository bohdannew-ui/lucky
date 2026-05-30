'use client'

export default function MapSection() {
  return (
    <section style={{ padding: '80px 0 0', background: '#fff' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
            <span className="chip-purple">Наш офис</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900,
            letterSpacing: '-0.03em', color: '#0f0a1e', lineHeight: 1.1,
          }}>
            Мы находимся во <span className="gradient-text">Вроцлаве</span>
          </h2>
          <p style={{ fontSize: 15, color: '#6b5f8a', marginTop: 12 }}>
            Принимаем онлайн — но всегда рады встрече лично
          </p>
        </div>

        {/* Map card */}
        <div style={{
          position: 'relative',
          borderRadius: 32,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(109,40,217,0.14), 0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid #ede9fe',
          height: 420,
        }}>

          {/* Map iframe */}
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=17.028%2C51.082%2C17.048%2C51.092&layer=mapnik&marker=51.087%2C17.038"
            style={{
              width: '100%', height: '100%',
              border: 'none', display: 'block',
              filter: 'saturate(0.85) hue-rotate(220deg) brightness(1.05)',
            }}
            title="Lucky Service Group — офис Вроцлав"
          />

          {/* Purple tint overlay (subtle) */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.06) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />

          {/* Bottom gradient fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
            background: 'linear-gradient(to top, rgba(15,10,30,0.55) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Address badge — bottom left */}
          <div style={{
            position: 'absolute', bottom: 24, left: 24,
            background: '#fff',
            borderRadius: 18,
            padding: '14px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            border: '1px solid #ede9fe',
            display: 'flex', alignItems: 'center', gap: 14,
            maxWidth: 320,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f0a1e', lineHeight: 1.3 }}>
                al. Karkonoska 45/510
              </div>
              <div style={{ fontSize: 12, color: '#6b5f8a', marginTop: 2 }}>
                53-015 Wrocław, Polska
              </div>
            </div>
          </div>

          {/* Hours badge — top right */}
          <div style={{
            position: 'absolute', top: 20, right: 20,
            background: '#fff',
            borderRadius: 14,
            padding: '10px 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            border: '1px solid #ede9fe',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 16 }}>🕐</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0f0a1e' }}>Пн–Пт: 9:00–18:00</div>
              <div style={{ fontSize: 10, color: '#9086aa' }}>Онлайн — круглосуточно</div>
            </div>
          </div>

          {/* Open in maps link */}
          <a
            href="https://maps.google.com/?q=al.+Karkonoska+45,+Wrocław"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute', bottom: 24, right: 24,
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff', fontWeight: 700, fontSize: 13,
              padding: '10px 18px', borderRadius: 100,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(109,40,217,0.4)',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Открыть в Google Maps
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          section[style*="padding: '80px"] { padding-top: 48px !important; }
        }
      `}</style>
    </section>
  )
}
