import { nav } from './nav'
import { gitTheory, reactHooksPrinciple, browserPrinciple, httpFarce, zfTs, tsAxios, performanceSamples } from './sidebar'

export default {
  title: 'Web-Books',
  description: '一些前端知识.',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'logo.png' }]
  ],
  themeConfig: {
    siteTitle: 'Web-Books',
    logo: '/logo.png',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Fan'
    },
    nav: nav(),
    sidebar: {
      '/git-theory/': gitTheory(),
      '/react-hooks-principle/': reactHooksPrinciple(),
      '/browser-principle/': browserPrinciple(),
      '/http-farce/': httpFarce(),
      '/zf-ts/': zfTs(),
      '/ts-axios/': tsAxios(),
      '/performance-samples/': performanceSamples(),
    }
  }
}
