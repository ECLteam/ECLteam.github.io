import { defineClientConfig } from 'vuepress/client'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
//import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
//import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
//import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'

import '@/theme/styles/custom.css'
import '@/theme/styles/index.css'

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    app.component('RepoCard', RepoCard)
    //app.component('NpmBadge', NpmBadge)
    //app.component('NpmBadgeGroup', NpmBadgeGroup)
    //app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)

  },
  setup() {
    if (typeof window !== 'undefined') {
      console.log('客户端环境初始化')
    }
  },
  layouts: {
    Layout: h(Layout, null, {
      // 将 PageContextMenu 添加到 doc-title-after 插槽，即文章标题的右侧
      'doc-title-after': () => h(PageContextMenu),
    }),
  },
  rootComponents: [
  ],
})
