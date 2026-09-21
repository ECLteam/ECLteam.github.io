import type { ThemeSidebarMulti } from 'vuepress-theme-plume'

const sidebar: ThemeSidebarMulti = {
  '/en/guide/': [
    {
      text: 'Getting Started',
      icon: 'material-symbols:rocket-launch-outline',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/en/guide/introduction/', icon: 'material-symbols:info-outline' },
      ],
    },
    {
      text: 'Policies and Terms',
      icon: 'material-symbols:gavel-outline',
      collapsed: false,
      items: [
        { text: 'User Agreement', link: '/en/guide/user-agreement/', icon: 'material-symbols:description-outline' },
      ],
    },
  ],
  '/en/development/': [
    { text: 'Develop ECL', link: '/en/development/', icon: 'material-symbols:code' },
    {
      text: 'Getting Started',
      icon: 'material-symbols:terminal',
      collapsed: false,
      items: [
        { text: 'Set Up the Environment', link: '/en/development/setup/environment/', icon: 'material-symbols:settings-outline' },
        { text: 'Build from Source', link: '/en/development/setup/build-from-source/', icon: 'material-symbols:build-outline' },
      ],
    },
  ],
  '/en/tutorials/': [
    { text: 'Technical Tutorials', link: '/en/tutorials/', icon: 'material-symbols:school-outline' },
    {
      text: 'Minecraft Launcher Fundamentals',
      icon: 'material-symbols:videogame-asset-outline',
      collapsed: false,
      items: [
        { text: 'Introduction', link: '/en/tutorials/minecraft-launcher/', icon: 'material-symbols:info-outline' },
        { text: 'Version Manifest Files', link: '/en/tutorials/minecraft-launcher/fundamentals/version-manifest/', icon: 'material-symbols:account-tree-outline' },
        { text: 'Build the Launch Command', link: '/en/tutorials/minecraft-launcher/fundamentals/launch-command/', icon: 'material-symbols:terminal' },
      ],
    },
  ],
}

export default sidebar
