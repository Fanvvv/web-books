export const nav = () => {
  return [
    { 
      text: 'TS',
      items: [
        { text: 'ts实现axios', link: '/ts-axios/chapter1.1'}
      ]
    },
    {
      text: '专栏',
      items: [
        { text: '浏览器工作原理与实践', link: '/browser-principle/lesson01' },
        { text: 'React Hooks核心原理与实战', link: '/react-hooks-principle/1' },
        { text: '趣谈网络协议', link: '/http-farce/01' },
      ]
    },
    {
      text: '小册',
      items: [
        { text: 'git原理', link: '/git-theory/vcs' },
      ]
    },
    {
      text: '珠峰',
      items: [
        { text: 'vue进阶', link: '/item-1' },
        { text: 'vue3', link: '/item-2' },
        { text: '深度学习TypeScript', link: '/zf-ts/1' }
      ]
    }
  ]
}