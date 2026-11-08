export const SITE = {
  title: 'Hilko',
  description:
    'Notes, projects and a book on algebraic curves. Software, mathematics and the occasional attempt to change the world.',
  url: 'https://hilkoc.github.io',
  author: 'Hilko',
  github: 'https://github.com/hilkoc',
  donate: 'https://buymeacoffee.com/hilko',
  lang: 'en-GB',
};

export const NAV = [
  { href: '/blog/', label: 'Blog' },
  { href: '/projects/', label: 'Projects' },
  { href: '/book/', label: 'Book' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

/* Web3Forms access key. Public by design: it only lets a browser post to one inbox,
   and the delivery address is never in the page source. Same key as change-the-world. */
export const WEB3FORMS_KEY = 'bbf45009-3b5d-4858-a29a-59f87ad3f4be';
export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/* GoatCounter site code: the MYCODE in MYCODE.goatcounter.com. It counts per path, so
   this site and the project sites on the same domain keep separate numbers. */
export const GOAT_CODE = 'hilkoc';
