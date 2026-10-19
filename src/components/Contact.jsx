import React from 'react'
import './Contact.css'

export default function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <h2 className="section-title">Get in touch</h2>
        <form className="contact-form" onSubmit={(e)=>e.preventDefault()}>
          <input placeholder="Your name" aria-label="Your name" />
          <input placeholder="Your email" aria-label="Your email" />
          <textarea placeholder="Message" rows={4} aria-label="Message" />
          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </section>
  )
}
