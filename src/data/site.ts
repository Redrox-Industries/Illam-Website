export const site = {
  name: 'Illam',
  parentCompany: 'Redrox Industries',
  parentUrl: 'https://redroxindustries.com/',
  legalName: '[Business legal name]',
  description:
    'Illam is an interior design concept by Redrox Industries. Business details and real projects are pending approval.',
  email: '[Email address]',
  phone: '[Phone number]',
  location: '[Studio location]',
  availability: '[Service areas]',
  social: {
    instagram: '',
    linkedin: '',
  },
} as const;

export const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact Us' },
] as const;

export const services = [
  {
    number: '01',
    title: 'Residential interiors',
    description:
      'A placeholder for homes shaped around daily routines, comfort, and personal taste.',
  },
  {
    number: '02',
    title: 'Commercial interiors',
    description:
      'A placeholder for work and customer spaces with clear purpose and character.',
  },
  {
    number: '03',
    title: 'Spatial planning',
    description:
      'A placeholder for layout studies, circulation, and the way each space is used.',
  },
  {
    number: '04',
    title: 'Renovation',
    description:
      'A placeholder for rethinking an existing space and its practical needs.',
  },
  {
    number: '05',
    title: 'Styling',
    description:
      'A placeholder for finishes, furniture, lighting, and the final layer of detail.',
  },
  {
    number: '06',
    title: 'Project coordination',
    description:
      'A placeholder for aligning decisions and the people involved in a project.',
  },
] as const;

export const sampleProjects = [
  {
    number: '01',
    title: 'The Courtyard Residence',
    category: 'Residential',
    description:
      'Fictional sample: a quiet home organised around light and a central courtyard.',
    image: '/images/sample-residential.webp',
    imageAlt:
      'Fictional residential interior concept with a curved sofa and leafy courtyard',
  },
  {
    number: '02',
    title: 'The Workshop',
    category: 'Commercial',
    description:
      'Fictional sample: a flexible workplace with warm, practical shared areas.',
    image: '/images/sample-commercial.webp',
    imageAlt:
      'Fictional commercial interior concept with a long timber worktable',
  },
  {
    number: '03',
    title: 'The Guest House',
    category: 'Hospitality',
    description:
      'Fictional sample: a small retreat centred on rest, texture, and easy movement.',
    image: '/images/sample-hospitality.webp',
    imageAlt:
      'Fictional guesthouse lounge concept with woven seating and a garden view',
  },
] as const;
