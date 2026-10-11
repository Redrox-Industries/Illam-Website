export const site = {
  name: '[Studio Name]',
  legalName: '[Business legal name]',
  description:
    'A placeholder interior-design studio creating considered residential and commercial spaces.',
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
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/process', label: 'Process' },
  { href: '/contact', label: 'Contact' },
] as const;
