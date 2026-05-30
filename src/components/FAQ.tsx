'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Сколько времени занимает получение карты побыту?',
    a: 'В среднем от 3 до 6 месяцев с момента подачи заявки — это зависит от воеводства и типа разрешения. Подготовка документов с нами занимает 1–2 недели. Мы сопровождаем вас до получения физической карты.',
  },
  {
    q: 'Нужно ли приезжать к вам в офис?',
    a: 'Нет. Всё взаимодействие — онлайн: консультация в Telegram или WhatsApp, документы передаёте фотографиями или сканами. В воеводство потребуется явиться лично только на биометрию — мы записываем вас заранее.',
  },
  {
    q: 'Что делать если пришло wezwanie (вызов из воеводства)?',
    a: 'Обращайтесь к нам немедленно — у вас есть ограниченный срок для ответа. Мы подготовим грамотный ответ, переведём и оформим нужные документы. Такие случаи мы решаем от 800 zł.',
  },
  {
    q: 'Гарантируете ли вы положительное решение?',
    a: '98% наших дел завершаются положительно. Мы заранее анализируем ваш кейс и берёмся только за те дела, в которых уверены. Если мы видим риски — честно предупреждаем ещё на консультации.',
  },
  {
    q: 'Что входит в стоимость услуги?',
    a: 'В стоимость входит: анализ кейса, подготовка всех документов, заполнение анкеты, подача заявки и сопровождение до получения карты. Государственные пошлины (opłaty urzędowe) оплачиваются отдельно — мы заранее называем точную сумму.',
  },
  {
    q: 'Работаете ли вы с гражданами всех стран?',
    a: 'Да. Мы работаем с гражданами Украины, Беларуси, Грузии, Казахстана, Узбекистана, Молдовы, Армении, Индии, Непала, Филиппин и других стран. Команда говорит на русском, украинском, польском и английском.',
  },
  {
    q: 'Можно ли начать процесс пока ещё действует виза или штамп?',
    a: 'Да — и нужно. Чем раньше вы подадите, тем лучше. Своевременная подача защищает ваше право на пребывание даже пока воеводство рассматривает заявку. Не ждите истечения срока.',
  },
  {
    q: 'Что если в процессе понадобятся дополнительные документы?',
    a: 'Мы сопровождаем дело до конца. Если воеводство запросит что-то дополнительно — поможем получить и оформить это без доплаты. Цена фиксируется в договоре и не меняется.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" style={{ padding: '100px 0', background: '#faf9ff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <span className="chip-purple">Частые вопросы</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 900,
            letterSpacing: '-0.035em', color: '#0f0a1e', lineHeight: 1.1, marginBottom: 14,
          }}>
            Отвечаем на главные <span className="gradient-text">вопросы</span>
          </h2>
          <p style={{ color: '#6b5f8a', fontSize: 16, lineHeight: 1.6 }}>
            Не нашли ответ — напишите нам, ответим в течение часа.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  border: `1px solid ${isOpen ? '#c4b5fd' : '#ede9fe'}`,
                  boxShadow: isOpen ? '0 8px 32px rgba(109,40,217,0.1)' : '0 1px 4px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%', padding: '22px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontSize: 16, fontWeight: 700, color: '#0f0a1e',
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: isOpen ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : '#f0ecff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s',
                  }}>
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      style={{ transition: 'transform 0.25s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      <path d="M7 2v10M2 7h10" stroke={isOpen ? '#fff' : '#7c3aed'} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </button>

                <div style={{
                  maxHeight: isOpen ? 300 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}>
                  <p style={{
                    padding: '0 24px 22px',
                    fontSize: 15, color: '#6b5f8a', lineHeight: 1.75, margin: 0,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{
          marginTop: 40, padding: '24px 32px', borderRadius: 18,
          background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
          border: '1px solid #ddd6fe',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f0a1e', marginBottom: 4 }}>
              Остался вопрос?
            </div>
            <div style={{ fontSize: 14, color: '#6b5f8a' }}>
              Напишите — ответим в течение 1 часа
            </div>
          </div>
          <a href="https://t.me/luckyservicegroup" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flexShrink: 0 }}>
            Написать в Telegram →
          </a>
        </div>

      </div>
    </section>
  )
}
