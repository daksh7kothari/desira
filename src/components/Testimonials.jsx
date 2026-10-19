import React from 'react'
import './Testimonials.css'

export default function Testimonials() {
  const items = [
    { name: 'A. User', quote: 'Fantastic service — helped our conversion rates.' },
    { name: 'B. Client', quote: 'Clear UX and fast support whenever we needed it.' },
    { name: 'C. Partner', quote: 'Reliable and professional delivery.' }
  ]

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What people say</h2>
        <div className="testimonials-grid">
          {items.map((t, i) => (
            <blockquote key={i} className="testimonial">
              <p>“{t.quote}”</p>
              <footer>- {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
