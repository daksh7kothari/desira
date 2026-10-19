import { projects, services } from '../data/index.js'


export default function getPage(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/studio') return { studio: true, title: 'Meet Sejal & the Studio — Desira', description: 'Meet Sejal, the founder of Desira, an independent graphic design studio for custom brand identities, posters, invitations and event graphics.', image: '/desira-logo.png' }
  if (path === '/contact') return { contact: true, title: 'Start a Design Project — Desira', description: 'Tell Desira about your brand, poster, invitation or event design project. Prepare a brief and start a conversation with Sejal.', image: '/desira-logo.png' }
  if (path === '/experiences') return { experience: 'gallery', title: 'Design Experiences — Desira', description: 'Explore original Desira artwork through an interactive showcase, invitation reveal, project story and design desk.', image: '/work/coastal-wedding.webp' }
  if (path === '/experiences/design-desk') return { experience: 'desk', title: 'The Design Desk — Desira', description: 'Explore Desira’s original invitation, print and illustration work from a different perspective on the interactive design desk.', image: '/work/print-design.webp' }
  const project = projects.find((item) => path === `/work/${item.slug}`)
  const service = services.find((item) => path === `/services/${item.slug}`)
  if (project) return { title: `${project.title} — Desira Design Studio`, description: project.description, image: project.image, project }
  if (service) return { title: `${service.title} — Desira Design Studio`, description: service.description, image: '/work/coastal-wedding.webp', service }
  if (path !== '/') return { title: 'Page not found — Desira', description: 'Explore original graphic design by Desira.', notFound: true }
  return { title: 'Desira — Custom Logos, Posters & Wedding Invitations', description: 'Thoughtfully made. Personally yours. Explore custom logos, brand identities, posters, wedding invitations and event graphics from Sejal’s graphic design studio, Desira.', image: '/work/coastal-wedding.webp' }
}
