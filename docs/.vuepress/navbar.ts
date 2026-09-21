/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
  { text: '使用', link: '/guide/introduction/', activeMatch: '^/guide/', icon: 'material-symbols:rocket-launch-outline' },
  { text: '开发', link: '/development/', activeMatch: '^/development/', icon: 'material-symbols:code' },
  {
    text: '其他',
    icon: 'material-symbols:library-books-outline',
    items: [
      { text: '技术教程', link: '/tutorials/', icon: 'material-symbols:school-outline' },
    ],
  },
])
