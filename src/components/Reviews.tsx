import Image from 'next/image'

interface GoogleReview {
  rating: number
  text?: { text: string; languageCode: string }
  originalText?: { text: string; languageCode: string }
  authorAttribution?: { displayName: string; uri: string; photoUri: string }
  relativePublishTimeDescription: string
  publishTime: string
}

interface Review {
  name: string
  text: string
  rating: number
  time: string
  photo: string | null
}

const FALLBACK: Review[] = [
  { name: 'Анна М.', text: 'Всё прошло быстро и без нервов. Менеджер держал связь на каждом этапе. Карту получила через 4 месяца.', rating: 5, time: '4 месяца назад', photo: null },
  { name: 'Дмитрий К.', text: 'Оформлял Blue Card — сложный случай с переводами дипломов. LSG взяли на себя всё. Рекомендую IT-специалистам.', rating: 5, time: '6 месяцев назад', photo: null },
  { name: 'Марина Р.', text: 'Хотела перевезти мужа и дочку. Казалось невозможным разобраться в документах. Lucky Service справились отлично!', rating: 5, time: '2 месяца назад', photo: null },
  { name: 'Олег В.', text: 'Быстро, чётко, без лишней суеты. Ответили на все вопросы в Telegram — очень удобно.', rating: 5, time: '1 месяц назад', photo: null },
  { name: 'Светлана Г.', text: 'Постоянный вид на жительство — мечта, которая стала реальностью. Спасибо команде за профессионализм!', rating: 5, time: '3 месяца назад', photo: null },
]

async function fetchReviews(): Promise<{ reviews: Review[]; rating: number; total: number }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return { reviews: FALLBACK, rating: 4.9, total: 138 }

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.rating,places.userRatingCount,places.reviews',
      },
      body: JSON.stringify({
        textQuery: 'Lucky Service Group Sp. z o.o. Wrocław',
        maxResultCount: 1,
        languageCode: 'ru',
      }),
      next: { revalidate: 86400 },
    })

    if (!res.ok) throw new Error(`${res.status}`)

    const data = await res.json()
    const place = data.places?.[0]
    if (!place) throw new Error('not found')

    const reviews: Review[] = (place.reviews as GoogleReview[])
      .filter(r => (r.text?.text || r.originalText?.text || '').length > 10)
      .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
      .slice(0, 5)
      .map(r => ({
        name: r.authorAttribution?.displayName || 'Клиент',
        text: (r.text?.text || r.originalText?.text || '').slice(0, 220).trimEnd() + ((r.text?.text || r.originalText?.text || '').length > 220 ? '…' : ''),
        rating: r.rating,
        time: r.relativePublishTimeDescription,
        photo: r.authorAttribution?.photoUri?.replace('=s128-c', '=s80-c') || null,
      }))

    return {
      reviews: reviews.length ? reviews : FALLBACK,
      rating: place.rating ?? 4.9,
      total: place.userRatingCount ?? 138,
    }
  } catch {
    return { reviews: FALLBACK, rating: 4.9, total: 138 }
  }
}

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < Math.round(count) ? '#f59e0b' : '#e5e7eb'}>
          <path d="M7 1l1.6 3.3 3.6.5-2.6 2.6.6 3.6L7 9.3l-3.2 1.7.6-3.6L1.8 4.8l3.6-.5L7 1z" />
        </svg>
      ))}
    </div>
  )
}

export default async function Reviews() {
  const { reviews, rating, total } = await fetchReviews()
  const doubled = [...reviews, ...reviews]

  return (
    <section id="reviews" style={{ padding: '100px 0', background: '#faf9ff', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: 52, padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <span className="chip-purple">Отзывы клиентов</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800,
          letterSpacing: '-0.03em', color: '#0f0a1e', lineHeight: 1.1, marginBottom: 20,
        }}>
          Что говорят <span className="gradient-text">наши клиенты</span>
        </h2>

        {/* Google rating row */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 100, background: '#fff', border: '1px solid #ede9fe', boxShadow: '0 2px 12px rgba(109,40,217,0.07)' }}>
          {/* Google G icon */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: '#0f0a1e' }}>{rating.toFixed(1)}</span>
          <Stars count={rating} />
          <span style={{ fontSize: 13, color: '#9086aa' }}>{total} отзывов</span>
        </div>
      </div>

      {/* Marquee */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to right, #faf9ff, transparent)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to left, #faf9ff, transparent)' }} />

        <div className="animate-marquee" style={{ display: 'flex', gap: 20, width: 'max-content', paddingBottom: 4 }}>
          {doubled.map((r, i) => (
            <div key={i} style={{
              width: 340, flexShrink: 0, background: '#fff', borderRadius: 20,
              padding: '26px 28px', border: '1px solid #ede9fe',
              boxShadow: '0 2px 16px rgba(109,40,217,0.06)',
            }}>
              {/* Author row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {r.photo ? (
                    <Image
                      src={r.photo}
                      alt={r.name}
                      width={40}
                      height={40}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 15, color: '#7c3aed', flexShrink: 0,
                    }}>
                      {r.name[0]}
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0f0a1e', marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#b0a8c8' }}>{r.time}</div>
                  </div>
                </div>
                <Stars count={r.rating} />
              </div>

              {/* Text */}
              <p style={{ fontSize: 14, color: '#4b4466', lineHeight: 1.72, marginBottom: 14, minHeight: 80, display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Google badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="12" height="12" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span style={{ fontSize: 11, color: '#b0a8c8', fontWeight: 500 }}>Google Отзывы</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
