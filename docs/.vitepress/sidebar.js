export const gitTheory = () => {
  return [
    {
      text: '版本管理',
      collapsible: true,
      items: [
        { text: '什么是版本控制系统（VCS）', link: '/git-theory/vcs' },
        { text: '什么是分布式版本控制系统（DVCS)', link: '/git-theory/dvcs' },
      ]
    },
    {
      text: '上手',
      collapsible: true,
      items: [
        { text: '上手1：新公司用 Git 管理代码，怎么快速上手？', link: '/git-theory/1' },
        { text: '上手2：团队工作的基本工作模型', link: '/git-theory/2' },
      ]
    },
    {
      text: '进阶',
      collapsible: true,
      items: [
        { text: '进阶1：HEAD、master 与 branch', link: '/git-theory/3' },
        { text: '进阶2：push 的本质', link: '/git-theory/4' },
        { text: '进阶3：merge：合并 commits', link: '/git-theory/5' },
        { text: '进阶4：Feature Branching：最流行的工作流', link: '/git-theory/6' },
        { text: '进阶5：关于 add', link: '/git-theory/7' },
        { text: '进阶6：看看我都改了什么', link: '/git-theory/8' },
      ]
    },
    {
      text: '高级',
      collapsible: true,
      items: [
        { text: '高级1：不喜欢 merge 的分叉？用 rebase 吧', link: '/git-theory/9' },
        { text: '高级2：刚刚提交的代码，发现写错了怎么办？', link: '/git-theory/10' },
        { text: '高级3：写错的不是最新的提交，而是倒数第二个？', link: '/git-theory/11' },
        { text: '高级4：比错还错，想直接丢弃刚写的提交？', link: '/git-theory/12' },
        { text: '高级5：想丢弃的也不是最新的提交？', link: '/git-theory/13' },
        { text: '高级6：代码已经 push 上去了才发现写错？', link: '/git-theory/14' },
        { text: '高级7：reset 的本质——不止可以撤销提交', link: '/git-theory/15' },
        { text: '高级8：checkout 的本质', link: '/git-theory/16' },
        { text: '高级9：紧急情况：「立即给我打个包，现在马上！」', link: '/git-theory/17' },
        { text: '高级10：branch 删过了才想起来有用？', link: '/git-theory/18' },
      ]
    },
    {
      text: '总结',
      collapsible: true,
      items: [
        { text: '额外说点：.gitignore——排除不想被管理的文件和目录', link: '/git-theory/gitignore' },
        { text: '总结', link: '/git-theory/总结' },
      ]
    },
  ]
}

export const reactHooksPrinciple = () => {
  return [
    {
      text: '开篇词',
      collapsible: true,
      items: [
        { text: '全面拥抱Hooks，掌握最新React开发方式', link: '/react-hooks-principle/1' }
      ]
    },
    {
      text: '基础篇',
      collapsible: true,
      items: [
        { text: '认识React：如何创建你的第一个React应用？', link: '/react-hooks-principle/2' },
        { text: '理解 Hooks：React 为什么要发明 Hooks？', link: '/react-hooks-principle/3' },
        { text: '内置 Hooks（1）：如何保存组件状态和使用生命周期？', link: '/react-hooks-principle/4' },
        { text: '内置 Hooks（2）：为什么要避免重复定义回调函数？', link: '/react-hooks-principle/5' },
        { text: '进一步认识 Hooks ：如何正确理解函数组件的生命周期？', link: '/react-hooks-principle/6' },
        { text: '自定义Hooks ：四个典型的使用场景', link: '/react-hooks-principle/7' },
        { text: '全局状态管理：如何在函数组件中使用 Redux？', link: '/react-hooks-principle/8' },
      ]
    },
    {
      text: '实战篇',
      collapsible: true,
      items: [
        { text: '复杂状态处理：如何保证状态一致性？', link: '/react-hooks-principle/9' },
        { text: '异步处理：如何向服务器端发送请求？', link: '/react-hooks-principle/10' },
        { text: '函数组件设计模式：如何应对复杂条件渲染场景？', link: '/react-hooks-principle/11' },
        { text: '事件处理：如何创建自定义事件？', link: '/react-hooks-principle/12' },
        { text: '项目结构：为什么要按领域组织文件夹结构？', link: '/react-hooks-principle/13' },
        { text: 'Form：Hooks 给 Form 处理带来了哪些新变化？', link: '/react-hooks-principle/14' },
        { text: '使用浮动层：如何展示对话框，并给对话框传递参数？', link: '/react-hooks-principle/15' },
        { text: '路由管理：为什么每一个前端应用都需要使用路由机制？', link: '/react-hooks-principle/16' },
        { text: '按需加载：如何提升应用打开速度？', link: '/react-hooks-principle/17' },
        { text: '答疑01：如何转换应用React Hooks 的思路？', link: '/react-hooks-principle/18' },
      ]
    },
    {
      text: '扩展篇',
      collapsible: true,
      items: [
        { text: '打包部署：你的应用是如何上线的？', link: '/react-hooks-principle/19' },
        { text: '单元测试：自定义Hooks应该如何进行单元测试？', link: '/react-hooks-principle/20' },
        { text: '第三方工具库：最常用的第三方工具库有哪些？', link: '/react-hooks-principle/21' },
        { text: 'React 的未来：什么是服务器端组件？', link: '/react-hooks-principle/22' },
        { text: '答疑02', link: '/react-hooks-principle/23' },
      ]
    },
  ]
}

export const browserPrinciple = () => {
  return [
    {
      text: '宏观视角上的浏览器',
      collapsible: true,
      items: [
        { text: 'Chrome架构：仅仅打开了1个页面，为什么有4个进程', link: '/browser-principle/lesson01' },
        { text: 'TCP协议：如何保证页面文件能被完整送达浏览器', link: '/browser-principle/lesson02' },
        { text: 'HTTP请求流程：为什么很多站点第二次打开速度会很快', link: '/browser-principle/lesson03' },
        { text: '导航流程：从输入URL到页面展示这中间发生了什么', link: '/browser-principle/lesson04' },
        { text: '渲染流程（上）：HTML、CSS和JavaScript是如何变成页面的', link: '/browser-principle/lesson05' },
        { text: '渲染流程（下）：HTML、CSS和JavaScript是如何变成页面的', link: '/browser-principle/lesson06' },
      ]
    },
    {
      text: '浏览器中的JavaScript执行机制',
      collapsible: true,
      items: [
        { text: '变量提升：JavaScript代码是按顺序执行的吗', link: '/browser-principle/lesson07' },
        { text: '调用栈：为什么JavaScript代码会出现栈溢出', link: '/browser-principle/lesson08' },
        { text: '块级作用域：var缺陷以及为什么要引入let和const', link: '/browser-principle/lesson09' },
        { text: '作用域链和闭包：代码中出现相同的变量，JavaScript引擎如何选择', link: '/browser-principle/lesson10' },
        { text: 'this：从JavaScript执行上下文视角讲this', link: '/browser-principle/lesson11' },
      ]
    },
    {
      text: 'V8工作原理',
      collapsible: true,
      items: [
        { text: '栈空间和堆空间：数据是如何存储的', link: '/browser-principle/lesson12' },
        { text: '垃圾回收：垃圾数据如何自动回收', link: '/browser-principle/lesson13' },
        { text: '编译器和解析器：V8如何执行一段JavaScript代码的', link: '/browser-principle/lesson14' },
      ]
    },
    {
      text: '浏览器中的页面循环系统',
      collapsible: true,
      items: [
        { text: '消息队列和事件循环：页面是怎么活起来的', link: '/browser-principle/lesson15' },
        { text: 'Webapi：setTimeout是怎么实现的', link: '/browser-principle/lesson16' },
        { text: 'Webapi：XMLHttpRequest是怎么实现的', link: '/browser-principle/lesson17' },
        { text: '宏任务和微任务：不是所有的任务都是一个待遇', link: '/browser-principle/lesson18' },
        { text: '使用Promise告别回调函数', link: '/browser-principle/lesson19' },
        { text: 'async await使用同步方式写异步代码', link: '/browser-principle/lesson20' },
      ]
    },
    {
      text: '浏览器中的页面',
      collapsible: true,
      items: [
        { text: '页面性能分析：利用chrome做web性能分析', link: '/browser-principle/lesson21' },
        { text: 'DOM树：JavaScript是如何影响DOM树构建的', link: '/browser-principle/lesson22' },
        { text: '渲染流水线：CSS如何影响首次加载时的白屏时间？', link: '/browser-principle/lesson23' },
        { text: '分层和合成机制：为什么css动画比JavaScript高效', link: '/browser-principle/lesson24' },
        { text: '页面性能：如何系统优化页面', link: '/browser-principle/lesson25' },
        { text: '虚拟DOM：虚拟DOM和实际DOM有何不同', link: '/browser-principle/lesson26' },
        { text: 'PWA：解决了web应用哪些问题', link: '/browser-principle/lesson27' },
        { text: 'webComponent：像搭积木一样构建web应用', link: '/browser-principle/lesson28' },
      ]
    },
    {
      text: '浏览器中的网络',
      collapsible: true,
      items: [
        { text: 'HTTP1：HTTP性能优化', link: '/browser-principle/lesson29' },
        { text: 'HTTP2：如何提升网络速度', link: '/browser-principle/lesson30' },
        { text: 'HTTP3：甩掉TCP、TCL包袱 构建高效网络', link: '/browser-principle/lesson31' },
        { text: '同源策略：为什么XMLHttpRequst不能跨域请求资源', link: '/browser-principle/lesson32' },
        { text: '跨站脚本攻击XSS：为什么cookie中有httpOnly属性', link: '/browser-principle/lesson33' },
        { text: 'CSRF攻击：陌生链接不要随便点', link: '/browser-principle/lesson34' },
        { text: '沙盒：页面和系统之间的隔离墙', link: '/browser-principle/lesson35' },
        { text: 'HTTPS：让数据传输更安全', link: '/browser-principle/lesson36' },
      ]
    }
  ]
}

export const httpFarce = () => {
  return [
    {
      text: '开篇词',
      collapsible: true,
      items: [
        { text: '想成为技术牛人？先搞定网络协议！', link: '/http-farce/01' },
      ]
    },
    {
      text: '第一模块 通信协议综述',
      collapsible: true,
      items: [
        { text: '为什么要学习网络协议？', link: '/http-farce/02' },
        { text: '为什么要学习网络协议？', link: '/http-farce/03' },
        { text: '为什么要学习网络协议？', link: '/http-farce/04' },
        { text: '为什么要学习网络协议？', link: '/http-farce/05' },
      ]
    },
  ]
}

export const zfTs = () => {
  return [
    {
      text: '深度学习TypeScript',
      collapsible: true,
      items: [
        { text: '1.环境配置和搭建', link: '/zf-ts/1' },
        { text: '2.基础类型', link: '/zf-ts/2' },
        { text: '3.类型推导', link: '/zf-ts/3' },
        { text: '4.函数类型', link: '/zf-ts/4' },
        { text: '5.类', link: '/zf-ts/5' },
        { text: '6.接口', link: '/zf-ts/6' },
        { text: '7.泛型', link: '/zf-ts/7' },
        { text: '8.兼容性', link: '/zf-ts/8' },
        { text: '9.类型保护', link: '/zf-ts/9' },
        { text: '10.类型推断', link: '/zf-ts/10' },
        { text: '11.交叉类型', link: '/zf-ts/11' },
        { text: '12.条件类型', link: '/zf-ts/12' },
        { text: '13.内置类型', link: '/zf-ts/13' },
        { text: '14.装包和拆包', link: '/zf-ts/14' },
        { text: '15.自定义类型', link: '/zf-ts/15' },
        { text: '16.unknown', link: '/zf-ts/16' },
        { text: '17.模块和命名空间', link: '/zf-ts/17' },
        { text: '18.类型声明', link: '/zf-ts/18' },
        { text: '19.扩展全局变量类型', link: '/zf-ts/19' },
      ]
    },
  ]
}
