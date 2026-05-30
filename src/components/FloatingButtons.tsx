'use client'

import { useState, useEffect } from 'react'

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 24, zIndex: 900, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
      {expanded && (
        <>
          <a href="https://wa.me/48575234180" target="_blank" rel="noopener noreferrer"
            className="animate-slide-in-right"
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '11px 20px', borderRadius: 100,
              background: '#25D366', color: '#fff', fontWeight: 600, fontSize: 14,
              textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.862L.057 23.7a.75.75 0 0 0 .916.916l5.838-1.478A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.524-5.228-1.435l-.374-.225-3.878.981.998-3.793-.244-.389A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp
          </a>
          <a href="https://t.me/luckyservicegroup" target="_blank" rel="noopener noreferrer"
            className="animate-slide-in-right"
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '11px 20px', borderRadius: 100,
              background: '#29B6F6', color: '#fff', fontWeight: 600, fontSize: 14,
              textDecoration: 'none', boxShadow: '0 4px 20px rgba(41,182,246,0.4)',
              animationDelay: '0.06s',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.981l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.578z"/>
            </svg>
            Telegram
          </a>
        </>
      )}

      {/* Toggle */}
      <button onClick={() => setExpanded(!expanded)} style={{
        width: 54, height: 54, borderRadius: '50%',
        background: expanded ? '#fff' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        border: expanded ? '1.5px solid #ede9fe' : 'none',
        color: expanded ? '#7c3aed' : '#fff', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: expanded ? '0 2px 16px rgba(0,0,0,0.1)' : '0 4px 24px rgba(109,40,217,0.45)',
        fontSize: 22, transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)',
      }} aria-label="Написать нам">
        {expanded ? '✕' : '💬'}
      </button>

      {!expanded && (
        <div style={{
          position: 'absolute', right: 64, bottom: 12,
          background: '#fff', border: '1px solid #ede9fe',
          borderRadius: 10, padding: '6px 12px',
          fontSize: 13, fontWeight: 600, color: '#7c3aed',
          whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          pointerEvents: 'none',
        }}>
          Написать нам
        </div>
      )}
    </div>
  )
}
