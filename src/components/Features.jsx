import React from 'react'
import './Features.css'

export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Our Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Fast</h3>
            <p>Optimized for speed and performance so your visitors get what they need quickly.</p>
          </div>
          <div className="feature">
            <h3>Responsive</h3>
            <p>Looks great on phones, tablets, and desktop screens with a fluid layout.</p>
          </div>
          <div className="feature">
            <h3>Secure</h3>
            <p>Built with security best-practices to protect your users and data.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
