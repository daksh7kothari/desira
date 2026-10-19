import React from 'react'
import './Pricing.css'

export default function Pricing() {
  const plans = [
    { name: 'Starter', price: '$9/mo', items: ['Basic features', 'Email support'] },
    { name: 'Pro', price: '$29/mo', items: ['Everything Starter has', 'Priority support'] },
    { name: 'Enterprise', price: 'Contact', items: ['Custom solutions', 'Dedicated support'] }
  ]

  return (
    <section className="pricing">
      <div className="container">
        <h2 className="section-title">Pricing</h2>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div className="plan" key={i}>
              <h3>{p.name}</h3>
              <div className="price">{p.price}</div>
              <ul>
                {p.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
              <button className="btn">Choose</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
