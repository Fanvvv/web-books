# 项目实战 （一）

## 一.环境搭建

这里我先简单介绍下 `Vue-Cli`各个版本之间的不同。目前我们使用的是`Vue-cli4`版本,

`cli2`和`cli3`的区别很容易看出。整个构建目录的变化及`webpack`的升级，提升了构建项目速度也提供了`vue ui`等，这里主要对比下 `cli3`和`cli4`的区别:

[CHANGELOG](https://github.com/vuejs/vue-cli/blob/dev/CHANGELOG.md)

- `css`预处理器默认`sass`选项改为`dart sass`
- 更新项目中的版本 （`copy-webpack-plugin v5`、`webpack-chain v5`、`css-loader to v2`、`core-js v3` 、`ESLint v5`、`workbox v4`、`nightwatch v1`、`jest v24`...）
- 一些细节更新

> 总结一下主要就是很多依赖的模块都发生了重大的变化。

### 1.初始化

**安装最新的`Vue-cli4`**

```bash
$ npm install @vue/cli -g
```

**通过`vue ui`创建项目**

```bash
$ vue ui
```

> 添加`vuex`、添加`vue-router`、添加dart sass

**添加插件`element-ui`**:`vue-cli-plugin-element` (import on demand)

**添加依赖 `axios`**

**启动任务！！！**

### 2.配置目录

```bash
src
    │  App.vue     # 根组件
    │  main.js     # 入口文件
    ├─api          # 存放接口
    ├─assets       # 存放资源
    ├─components   # 组件
    ├─plugins      # 生成的插件
    ├─config       # 存放配置文件
    ├─router       # 存放路由配置
    ├─store        # 存放vuex配置
    ├─utils        # 存放工具方法
    └─views        # 存放Vue页面
```

## 二.路由系统配置

通过`require.context`实现路由模块拆分

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routes = [];
const files = require.context('./', true, /\.router.js$/);
files.keys().forEach(key => {
  routes.push(...files(key).default)
});
const router = new VueRouter({
  mode: 'history',
  routes
});
export default router;
```

> 通过`require.context`动态导入路由模块，实现路由的模块化,这样我们可以对路由进行分类了 (这里不建议根据页面自动生成路由，这样项目整个太不灵活了)

**`index.router.js`**

```js
export default [{
    path: '/',
    component: () => import(/*webpackChunkName:'home'*/'@/views/Home.vue')
}, {
    path: '*',
    component: () => import(/*webpackChunkName:'404'*/'@/views/404.vue')
}]
```

**`user.router.js`**

```js
export default [{
        path: '/login',
        name: 'login',
        component: () => import( /*webpackChunkName:'login'*/ '@/views/user/Login.vue')
    },
    {
        path: '/reg',
        name: 'reg',
        component: () => import( /*webpackChunkName:'reg'*/ '@/views/user/Reg.vue')
    }
]
```

## 三. 布局绘制

通过布局组件进行布局

```html
<el-container>
	<el-header>头</el-header>
    <el-main>
    	<router-view></router-view>
    </el-main>
	<el-footer>尾</el-footer>
</el-container>

<style lang="scss">
* {margin: 0;padding: 0;}
img{max-width: 100%;}
.el-header,.el-footer{background: #333;color:#fff}
.el-main{ min-height: calc(100vh - 120px);}
</style>
```

页面中用到的组件需要手动导入注册

```js
import Vue from 'vue'
import { Button, Container, Footer, Header, Main } from 'element-ui'

const components = { Button, Container, Footer, Header, Main }
Object.entries(components).forEach(([key, component]) => {
    Vue.use(component)
});
```

### 1.封装导航组件

通过栅格化布局实现导航组件的划分

```html
<template>
  <el-row class="header-row">
    <el-col :span="18">
      <img src="@/assets/logo.png" class="logo" />
      <el-menu class="menu" mode="horizontal" background-color="#333" text-color="#fff"
        active-text-color="fff" :router="true"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/">发表文章</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="6">
      <div class="nav-right">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#333"
          text-color="#fff"
          active-text-color="fff"
        >
          <el-menu-item index="login">
            <router-link to="/login">登录</router-link>
          </el-menu-item>
          <el-menu-item index="reg">
            <router-link to="/reg">注册</router-link>
          </el-menu-item>
          <el-submenu index="profile">
            <template slot="title">张三</template>
            <el-menu-item index="logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-col>
  </el-row>
</template>
<style lang="scss">
.header-row {
  height: 100%;
  .logo { margin: 5px;height: 50px}
  .menu,.logo { display: inline-block;}
  .nav-right {
    float: right;
    li { display: inline-block;text-align: center;line-height: 60px;}
    a {color: #fff;}
  }
}
</style>
```

### 2.封装导航底部组件

```html
<template>
  <div class="footer-row">课程内容版权均归 珠峰架构课</div>
</template>
<style lang="scss">
.footer-row {line-height: 60px; text-align: center;}
</style>
```

### 3.页面结构

```html
<el-container style="min-width:960px;">
    <el-header>
        <PageHeader></PageHeader>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
    <el-footer>
        <PageFooter></PageFooter>
    </el-footer>
</el-container>
```

> 引入我们编写的`PageHeader`、`PageFooter`组件

## 四.封装`axios`请求

`axios`是基于`promise`的`ajax`库，我们一般会设置一些默认属性和拦截器

```js
import axios from 'axios';
import { baseURL } from '@/config'
class Http {
    constructor(baseUrl) {
        this.baseURL = baseURL;
        this.timeout = 3000;
    }
    setInterceptor(instance) {
        instance.interceptors.request.use(config => {
            return config;
        });
        instance.interceptors.response.use(res => {
            if (res.status == 200) {
                return Promise.resolve(res.data);
            } else {
                return Promise.reject(res);
            }
        }, err => {
            return Promise.reject(err);
        });
    }
    mergeOptions(options) {
        return {
            baseURL: this.baseURL,
            timeout: this.timeout,
            ...options
        }
    }
    request(options) {
        const instance = axios.create();
        const opts = this.mergeOptions(options);
        this.setInterceptor(instance);
        return instance(opts);
    }
    get(url, config = {}) {
        return this.request({
            method: 'get',
            url: url,
            ...config
        })
    }
    post(url, data) {
        return this.request({
            method: 'post',
            url,
            data
        })
    }
}
export default new Http;
```

> 每次请求时通过`axios.create()`方法创建axios实例并增添拦截器功能。再次之上我们也再次封装get方法和post方法

## 五.`Vuex`配置

### 1.模块的基本配置

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const rootModule = {
    state: {},
    mutations: {},
    actions: {},
    modules: {}
}
const files = require.context('./modules/', false, /\.js$/);
files.keys().forEach((key, index) => {
    let store = files(key).default;
    const moduleName = key.replace(/^\.\//, '').replace(/\.js$/, '');
    const modules = rootModule.modules || {};
    modules[moduleName] = store;
    modules[moduleName].namespaced = true;
    rootModule.modules = modules
});
const store = new Vuex.Store(rootModule);
export default store;
```

> 通过`require.context()`动态加载模块，实现store的状态分割

### 2.抽离根模块

```js
import Vue from 'vue'
import Vuex from 'vuex'
import rootModule from './root'; // 将rootModule单独拿到root文件夹中
Vue.use(Vuex)
```

## 六.前后端联调

### 1. 获取轮播图数据

后端接口:`http://localhost:3000/public/getSlider`

```js
export default {
    getSlider: '/public/getSlider' // 获取轮播图接口
}
```

> 抽离接口路径到`config`中,为了更方便的维护接口

```js
import config from './config/public';
import axios from '@/utils/request';
export const getSlider = (type) => axios.get(config.getSlider);
```

### 2.在`Vuex`中实现对应action

创造对应的`action-types`

```js
export const SET_SLIDERS = 'SET_SLIDERS';
```

```js
import { getSlider } from '../api/public';
import * as types from './action-types';
export default {
    state: {
        sliders: [],
    },
    mutations: {
        [types.SET_SLIDERS](state, sliders) {
            state.sliders = sliders;
        }
    },
    actions: {
        async [types.SET_SLIDERS]({ commit }) {
           let { sliders } = await getSlider();
           commit(types.SET_SLIDERS, sliders);
        }
    }
}
```

### 3.在组件中获取数据

```js
if (res.status == 200) {
    if(res.data.err == 0){ // 如果状态码是0 说明无错误
   	 	return Promise.resolve(res.data);
    }else{
    	return Promise.reject(res.data.data);
    }
}
```

> 我们在`axios`中统一处理错误

```js
import { mapActions, mapState } from "vuex";
import * as types from "@/store/action-types";
export default {
  computed: {
    ...mapState(["sliders"])
  },
  methods: {
    ...mapActions([types.SET_SLIDERS])
  },
  async mounted() {
    try{
      await this[types.SET_SLIDERS]();
    }catch(e){
      console.log(e);
    }
  }
};
```

> 这里我们可以通过辅助函数调用action，并将数据存储到state中。

### 4.渲染轮播图组件

```html
<div class="banner">
      <el-carousel :interval="4000" type="card" height="360px">
        <el-carousel-item v-for="item in sliders" :key="item._id">
          <img :src="item.url" />
        </el-carousel-item>
      </el-carousel>
</div>
```