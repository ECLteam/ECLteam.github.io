import type { ThemeSidebarMulti } from 'vuepress-theme-plume'

const sidebar: ThemeSidebarMulti = {
  '/start/': [
    { 
      text: '介绍', 
      link: '/start/intro', 
      icon: 'streamline-ultimate-color:copy-paste-1'
    },
    {
      text: '使用',
      link: '/start/use',
      //icon: 'streamline-ultimate-color:rocket-1'
    }
  ]
  
}

export default sidebar