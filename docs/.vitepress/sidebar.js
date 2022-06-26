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

export const jgTs = () => {
  return [
    {
      text: '深度学习TypeScript',
      collapsible: true,
      items: [
        { text: '1.环境配置和搭建', link: '/jg-ts/1' },
        { text: '2.基础类型', link: '/jg-ts/2' },
        { text: '3.类型推导', link: '/jg-ts/3' },
        { text: '4.函数类型', link: '/jg-ts/4' },
        { text: '5.类', link: '/jg-ts/5' },
        { text: '6.接口', link: '/jg-ts/6' },
        { text: '7.泛型', link: '/jg-ts/7' },
        { text: '8.兼容性', link: '/jg-ts/8' },
        { text: '9.类型保护', link: '/jg-ts/9' },
        { text: '10.类型推断', link: '/jg-ts/10' },
        { text: '11.交叉类型', link: '/jg-ts/11' },
        { text: '12.条件类型', link: '/jg-ts/12' },
        { text: '13.内置类型', link: '/jg-ts/13' },
        { text: '14.装包和拆包', link: '/jg-ts/14' },
        { text: '15.自定义类型', link: '/jg-ts/15' },
        { text: '16.unknown', link: '/jg-ts/16' },
        { text: '17.模块和命名空间', link: '/jg-ts/17' },
        { text: '18.类型声明', link: '/jg-ts/18' },
        { text: '19.扩展全局变量类型', link: '/jg-ts/19' },
      ]
    },
  ]
}

export const jgVueApply = () => {
  return [
    {
      text: '快速掌握vue',
      collapsible: true,
      items: [
        { text: '进阶Vue篇（一）', link: '/jg-vue-apply/note-1'},
        { text: '进阶Vue篇（二）', link: '/jg-vue-apply/note-2'},
        { text: '进阶Vue篇（三）', link: '/jg-vue-apply/note-3'},
        { text: '前端自动化测试（一）', link: '/jg-vue-apply/unit-1'},
        { text: '前端自动化测试（二）', link: '/jg-vue-apply/unit-2'},
        { text: '前端自动化测试（三）', link: '/jg-vue-apply/unit-3'},
        { text: 'Vue面试题', link: '/jg-vue-apply/interview-1'},
        { text: '2021 Vue面试题', link: '/jg-vue-apply/interview-2'},
        { text: '项目实战', link: '/jg-vue-apply/project-0'},
        { text: '项目实战（一）', link: '/jg-vue-apply/project-1'},
        { text: '项目实战（二）', link: '/jg-vue-apply/project-2'},
        { text: '从0搭建vue组件库', link: '/jg-vue-apply/vue-component-1'},
        { text: 'Vue3实现Tree组件', link: '/jg-vue-apply/vue-component-2'},
      ]
    }
  ]
}

export const tsAxios = () => {
  return [
    {
      text: 'TypeScript入门',
      collapsible: true,
      items: [
        { text: '初识TypeScript', link: '/ts-axios/chapter1.1' },
        { text: '安装 TypeScript', link: '/ts-axios/chapter1.2' },
        { text: '编写第一个 TypeScript 程序', link: '/ts-axios/chapter1.3' },
      ]
    },
    {
      text: '常用语法',
      collapsible: true,
      items: [
        { text: '基础类型', link: '/ts-axios/chapter2' },
        { text: '变量声明', link: '/ts-axios/chapter3' },
        { text: '接口', link: '/ts-axios/chapter4' },
        { text: '类', link: '/ts-axios/chapter5' },
        { text: '函数', link: '/ts-axios/chapter6' },
        { text: '泛型', link: '/ts-axios/chapter7' },
        { text: '类型推断', link: '/ts-axios/chapter8' },
        { text: '高级类型', link: '/ts-axios/chapter9' },
      ]
    },
    {
      text: 'ts-axios 项目初始化',
      collapsible: true,
      items: [
        { text: '需求分析', link: '/ts-axios/chapter11' },
        { text: '初始化项目', link: '/ts-axios/chapter11' },
        { text: '编写基础请求代码', link: '/ts-axios/chapter10' },
      ]
    },
    {
      text: 'ts-axios 基础功能实现',
      collapsible: true,
      items: [
        { text: '处理请求 url 参数', link: '/ts-axios/chapter13' },
        { text: '处理请求 body 数据', link: '/ts-axios/chapter14' },
        { text: '处理请求 header', link: '/ts-axios/chapter15' },
        { text: '获取响应数据', link: '/ts-axios/chapter16' },
        { text: '处理响应 header', link: '/ts-axios/chapter17' },
        { text: '处理响应 data', link: '/ts-axios/chapter18' },
      ]
    },
    {
      text: 'ts-axios 异常情况处理',
      collapsible: true,
      items: [
        { text: '错误处理', link: '/ts-axios/chapter19' },
        { text: '错误信息增强', link: '/ts-axios/chapter20' },
      ]
    },
    {
      text: 'ts-axios 接口扩展',
      collapsible: true,
      items: [
        { text: '扩展接口', link: '/ts-axios/chapter21' },
        { text: 'axios 函数重载', link: '/ts-axios/chapter22' },
        { text: '响应数据支持泛型', link: '/ts-axios/chapter23' },
      ]
    },
    {
      text: 'ts-axios 拦截器实现',
      collapsible: true,
      items: [
        { text: '拦截器设计与实现', link: '/ts-axios/chapter24' },
      ]
    },
    {
      text: 'ts-axios 配置化实现',
      collapsible: true,
      items: [
        { text: '合并配置的设计与实现', link: '/ts-axios/chapter25' },
        { text: '请求和响应配置化', link: '/ts-axios/chapter26' },
        { text: '扩展 axios.create 静态接口', link: '/ts-axios/chapter27' },
      ]
    },
    {
      text: 'ts-axios 取消功能实现',
      collapsible: true,
      items: [
        { text: '取消功能设计与实现', link: '/ts-axios/chapter28' },
      ]
    },
    {
      text: 'ts-axios 更多功能实现',
      collapsible: true,
      items: [
        { text: 'withCredentials', link: '/ts-axios/chapter29' },
        { text: 'XSRF 防御', link: '/ts-axios/chapter30' },
        { text: '上传和下载的进度监控', link: '/ts-axios/chapter31' },
        { text: 'HTTP 授权', link: '/ts-axios/chapter32' },
        { text: '自定义合法状态码', link: '/ts-axios/chapter33' },
        { text: '自定义参数序列化', link: '/ts-axios/chapter34' },
        { text: 'baseURL', link: '/ts-axios/chapter35' },
        { text: '静态方法扩展', link: '/ts-axios/chapter36' },
      ]
    },
    {
      text: 'ts-axios 单元测试', 
      collapsible: true,
      items: [
        { text: '前言', link: '/ts-axios/chapter37' },
        { text: 'Jest 安装和配置', link: '/ts-axios/chapter38' },
        { text: '辅助模块单元测试', link: '/ts-axios/chapter39' },
        { text: '请求模块单元测试', link: '/ts-axios/chapter40' },
        { text: 'headers 模块单元测试', link: '/ts-axios/chapter41' },
        { text: 'Axios 实例模块单元测试', link: '/ts-axios/chapter42' },
        { text: '拦截器模块单元测试', link: '/ts-axios/chapter43' },
        { text: 'mergeConfig 模块单元测试', link: '/ts-axios/chapter44' },
        { text: '请求取消模块单元测试', link: '/ts-axios/chapter45' },
        { text: '剩余模块单元测试', link: '/ts-axios/chapter46' },
      ]
    },
  ]
}

export const performanceSamples = () => {
  return [
    {
      text: '介绍',
      collapsible: true,
      items: [
        { text: '前端性能优化介绍', link: '/performance-samples/1' },
      ]
    },
    {
      text: 'Web 性能指标',
      collapsible: true,
      items: [
        { text: '性能指标', link: '/performance-samples/2' },
        { text: 'RAIL 性能模型', link: '/performance-samples/3' },
        { text: '基于用户体验的性能指标', link: '/performance-samples/4' },
        { text: 'Web Vitals', link: '/performance-samples/5' },
        { text: '其它性能指标', link: '/performance-samples/6' },
      ]
    },
    {
      text: 'Web 性能测试',
      collapsible: true,
      items: [
        { text: '性能测试', link: '/performance-samples/7' },
        { text: '使用灯塔 Lighthouse 测试性能', link: '/performance-samples/8' },
        { text: '使用 WebPageTest 测试性能', link: '/performance-samples/9' },
        { text: '使用 Chrome DevTools 测试性能', link: '/performance-samples/10' },
        { text: '性能测量 APIs', link: '/performance-samples/11' },
        { text: '性能监控', link: '/performance-samples/12' },
      ]
    },
    {
      text: '前端页面的生命周期',
      collapsible: true,
      items: [
        { text: '生命周期', link: '/performance-samples/13' },
      ]
    },
    {
      text: '请求和响应优化',
      collapsible: true,
      items: [
        { text: '请求和响应', link: '/performance-samples/14' },
        { text: 'DNS 解析', link: '/performance-samples/15' },
        { text: 'HTTP 长连接', link: '/performance-samples/16' },
        { text: 'HTTP 2', link: '/performance-samples/17' },
        { text: '避免重定向', link: '/performance-samples/18' },
        { text: '压缩传输的数据资源', link: '/performance-samples/19' },
        { text: 'HTTP 缓存', link: '/performance-samples/20' },
        { text: 'Service Worker 缓存', link: '/performance-samples/21' },
        { text: 'CDN 缓存', link: '/performance-samples/22' },
        { text: 'Push 缓存', link: '/performance-samples/23' },
        { text: '使用服务端渲染', link: '/performance-samples/24' },
      ]
    },
    {
      text: '渲染优化',
      collapsible: true,
      items: [
        { text: '渲染', link: '/performance-samples/25' },
        { text: '关键渲染路径优化', link: '/performance-samples/26' },
        { text: 'JavaScript 执行优化', link: '/performance-samples/27' },
        { text: '计算样式优化', link: '/performance-samples/28' },
        { text: '页面布局与重绘优化', link: '/performance-samples/29' },
        { text: '合成处理', link: '/performance-samples/30' },
        { text: '小结', link: '/performance-samples/31' },
      ]
    },
    {
      text: '资源加载优化',
      collapsible: true,
      items: [
        { text: '图片延迟加载', link: '/performance-samples/32' },
        { text: '视频加载', link: '/performance-samples/33' },
        { text: '路由懒加载', link: '/performance-samples/34' },
        { text: '资源优先级', link: '/performance-samples/35' },
        { text: '小结', link: '/performance-samples/36' },
      ]
    },
    {
      text: '图片优化',
      collapsible: true,
      items: [
        { text: '图片', link: '/performance-samples/37' },
        { text: '图片基础', link: '/performance-samples/38' },
        { text: '图像格式', link: '/performance-samples/39' },
        { text: '图像使用建议', link: '/performance-samples/40' },
        { text: '小结', link: '/performance-samples/41' },
      ]
    },
    {
      text: '参考链接',
      collapsible: true,
      items: [
        { text: '参考链接', link: '/performance-samples/42' },
      ]
    },
  ]
}
