import projects from './projects.json' with { type: 'json' }
import services from './services.json' with { type: 'json' }
import experienceLinks from './experiences.json' with { type: 'json' }
import site from './site.json' with { type: 'json' }

export { projects, services, experienceLinks, site }
export const siteUrl = site.siteUrl.replace(/\/+$/, '')
export const instagram = site.contact.instagram.url
