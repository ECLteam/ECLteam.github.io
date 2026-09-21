import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: 'Home', link: '/en/', icon: 'material-symbols:home-outline' },
  { text: 'Use', link: '/en/guide/introduction/', activeMatch: '^/en/guide/', icon: 'material-symbols:rocket-launch-outline' },
  { text: 'Develop', link: '/en/development/', activeMatch: '^/en/development/', icon: 'material-symbols:code' },
  {
    text: 'Other',
    icon: 'material-symbols:library-books-outline',
    items: [
      { text: 'Technical Tutorials', link: '/en/tutorials/', icon: 'material-symbols:school-outline' },
    ],
  },
])
