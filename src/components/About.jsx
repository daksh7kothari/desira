import React from 'react'
import './About.css'

export default function About() {
  return (
    <section className="about">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div className="about-grid">
          <p>
            We are a team dedicated to building delightful experiences on the web. Our focus
            is on clear design, reliable engineering, and measurable results.
          </p>
          <div>
            <h3>Our Mission</h3>
            <p>Deliver great products that help people and businesses succeed online.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
