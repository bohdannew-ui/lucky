'use client'

import { useEffect, useRef } from 'react'

const LAT = 51.087
const LNG = 17.038

function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // Dynamically import leaflet (client only)
    import('leaflet').then(L => {
      const lf = L.default || L

      // Fix marker icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (lf.Icon.Default.prototype as any)._getIconUrl
      lf.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = lf.map(containerRef.current!, {
        center: [LAT, LNG],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      lf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      // Custom purple marker
      const icon = lf.divIcon({
        html: `<div style="width:32px;height:40px;background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 4px 16px rgba(109,40,217,0.5)"></div>`,
        className: '',
        iconSize: [32, 40],
        iconAnchor: [16, 40],
      })

      lf.marker([LAT, LNG], { icon })
        .addTo(map)
        .bindPopup('<b>Lucky Service Group</b><br>al. Karkonoska 45/510')

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(mapRef.current as any).remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={containerRef}
        style={{
          width: '100%', height: '100%',
          filter: 'saturate(0.8) hue-rotate(210deg) brightness(1.05)',
        }}
      />
    </>
  )
}

export default function MapSection() {
  return (
    <section style={{ padding: '80px 0 60px', background: '#fff' }}>
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

          <LeafletMap />

          {/* Purple tint overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, transparent 50%)',
            pointerEvents: 'none', zIndex: 500,
          }} />

          {/* Bottom gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
            background: 'linear-gradient(to top, rgba(15,10,30,0.45) 0%, transparent 100%)',
            pointerEvents: 'none', zIndex: 500,
          }} />

          {/* Address badge */}
          <div style={{
            position: 'absolute', bottom: 20, left: 20, zIndex: 600,
            background: '#fff', borderRadius: 16, padding: '12px 18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #ede9fe',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f0a1e' }}>al. Karkonoska 45/510</div>
              <div style={{ fontSize: 12, color: '#6b5f8a', marginTop: 2 }}>53-015 Wrocław, Polska</div>
            </div>
          </div>

          {/* Hours badge */}
          <div style={{
            position: 'absolute', top: 16, right: 16, zIndex: 600,
            background: '#fff', borderRadius: 12, padding: '9px 14px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: '1px solid #ede9fe',
            display: 'flex', alignItems: 'center', gap: 7,
          }}>
            <span style={{ fontSize: 15 }}>🕐</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0f0a1e' }}>Пн–Пт: 9:00–18:00</div>
              <div style={{ fontSize: 10, color: '#9086aa' }}>Онлайн — круглосуточно</div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://maps.google.com/?q=al.+Karkonoska+45,+Wrocław"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              padding: '14px 32px', borderRadius: 100,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(109,40,217,0.35)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(109,40,217,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(109,40,217,0.35)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Открыть в Google Maps
          </a>
        </div>

      </div>
    </section>
  )
}
