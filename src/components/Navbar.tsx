'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #ede9fe' : 'none',
        boxShadow: scrolled ? '0 1px 20px rgba(109,40,217,0.06)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 13, color: '#fff', letterSpacing: '-0.03em',
            boxShadow: '0 4px 12px rgba(109,40,217,0.35)',
          }}>LSG</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#0f0a1e', lineHeight: 1.1 }}>Lucky Service</div>
            <div style={{ fontSize: 10, color: '#7c3aed', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Group · Wrocław</div>
          </div>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
          {[
            { label: 'Услуги', href: '#services' },
            { label: 'Как работаем', href: '#process' },
            { label: 'Цены', href: '#pricing' },
            { label: 'Отзывы', href: '#reviews' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              style={{ color: '#4b4466', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#7c3aed')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4b4466')}
            >{item.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
          <a href="tel:+48575234180" style={{ fontSize: 14, fontWeight: 600, color: '#7c3aed', textDecoration: 'none' }}>
            +48 575 234 180
          </a>
          <a href="#contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>
            Консультация
          </a>
        </div>

        {/* Burger */}
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="burger-btn"
          aria-label="Меню"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2, borderRadius: 2,
                background: '#0f0a1e', transition: 'all 0.3s',
                transform: menuOpen ? (i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)') : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #ede9fe', padding: '16px 24px 24px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
          {[
            { label: 'Услуги', href: '#services' },
            { label: 'Как работаем', href: '#process' },
            { label: 'Цены', href: '#pricing' },
            { label: 'Отзывы', href: '#reviews' },
            { label: 'Контакты', href: '#contact' },
          ].map(item => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '13px 0', color: '#0f0a1e', fontSize: 16, fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid #f3f0ff' }}>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ display: 'block', marginTop: 20, textAlign: 'center' }}>
            Бесплатная консультация
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
