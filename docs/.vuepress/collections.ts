/**
 * 每个内容域独立作为一个 doc collection。页面的 permalink 必须保持在
 * 对应的 linkPrefix 下，否则主题不会加载相应的侧边栏。
 */
import { defineCollection, defineCollections } from 'vuepress-theme-plume'

const guide = defineCollection({
  type: 'doc',
  dir: '/guide/',
  linkPrefix: '/guide',
  title: '使用',
})

const development = defineCollection({
  type: 'doc',
  dir: '/development/',
  linkPrefix: '/development',
  title: '开发',
})

const tutorials = defineCollection({
  type: 'doc',
  dir: '/tutorials/',
  linkPrefix: '/tutorials',
  title: '技术教程',
})

const englishGuide = defineCollection({
  type: 'doc',
  dir: '/en/guide/',
  linkPrefix: '/en/guide',
  title: 'Use ECL',
})

const englishDevelopment = defineCollection({
  type: 'doc',
  dir: '/en/development/',
  linkPrefix: '/en/development',
  title: 'Develop ECL',
})

const englishTutorials = defineCollection({
  type: 'doc',
  dir: '/en/tutorials/',
  linkPrefix: '/en/tutorials',
  title: 'Technical Tutorials',
})

export const chineseCollections = defineCollections([guide, development, tutorials])

export const englishCollections = defineCollections([
  englishGuide,
  englishDevelopment,
  englishTutorials,
])

export default chineseCollections
