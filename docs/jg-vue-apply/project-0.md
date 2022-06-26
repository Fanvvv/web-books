## 1.初始化开发环境

## 1.1 初始化项目

```bash
npm install @vue/cli -g
vue create vue-ketang
```

> [CLI CHANGELOG](https://github.com/vuejs/vue-cli/blob/dev/CHANGELOG.md)

```bash
 (*) Choose Vue version
 (*) Babel
 ( ) TypeScript
 (*) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
```

> dart-sass 性能更好,后续sass新的特性会优先支持，也解决了node-sass不稳定问题

### 1.2 安装依赖

```text
vue add style-resources-loader
```

1

```js
const path = require('path');
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [path.resolve(__dirname, 'src/assets/common.scss')]
        }
    }
}
```

> 增加全局`scss`变量

```bash
npm i postcss-plugin-px2rem lib-flexible
```

```js
import "lib-flexible"; // main.js
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-plugin-px2rem")({
                        rootValue: 75,
                        exclude: /node_module/,
                    })
                ]
            }
        }
    }
}
```

> 增加`px2rem插件`

```text
npm i vant axios -D
```

```js
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
```

## 1.3 配置目录

```bash
src
    │  App.vue     # 根组件
    │  main.js     # 入口文件
    ├─api          # 存放接口
    ├─assets       # 存放资源
    ├─components   # 组件
    ├─config       # 存放配置文件
    ├─router       # 存放路由配置
    ├─store        # 存放vuex配置
    ├─utils        # 存放工具方法
    └─views        # 存放Vue页面
```

## 项目路由搭建

### 2.1 配置`router.js`

```js
const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/lesson',
        name: 'lesson',
        component: () => import('@/views/lesson/index.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue')
    }
];
```

### 2.2 使用`vant ui`组件

```vue
<div id="app">
  <router-view></router-view>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="shop-o" to="/lesson">我的课程</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/profile">个人中心</van-tabbar-item>
  </van-tabbar>
</div>
```

### 2.3 增加路由loading效果

```js
import Loading from '@/components/loading';
const loadable = (asyncFUnction) => {
    const component = () => ({
        component: asyncFUnction(),
        loading:Loading
    })
    return {
        render(h) {
            return h(component)
        }
    }
}
export default loadable
```

## 3.首页头部导航搭建

### 3.1 头部绘制

```vue
<template>
    <div class="home-header">
        <img src="@/assets/logo.png" />
        <van-dropdown-menu>
            <van-dropdown-item :value="category" :options="categories" @change="change" />
        </van-dropdown-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            category: 0,
            categories: [
                { text: '全部课程', value: 0 },
                { text: 'vue课程', value: 1 },
                { text: 'react课程', value: 2 },
            ]
        }
    },
    methods: {
        change(newVal) {
            this.category = newVal
        }
    }
}
</script>
<style lang="scss">
.home-header {
    background: $background;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2.5%;
    position: fixed;
    top: 0;
    left: 0;
    width: 95%;
    img {
        height: 50px;
    }
    .van-dropdown-menu__title {
        color: #fff;
    }
    .van-dropdown-menu__bar {
        background: $background;
    }
}
</style>
```

### 3.2 同步数据

```vue
<template>
    <HomeHeader v-model="currentCategory"></HomeHeader>
</template>
<script>
import HomeHeader from './home-header'
export default {
    data(){
        return {currentCategory:0}
    },
    components:{
        HomeHeader
    }
}
```

```vue
<template>
    <div class="home-header">
        <img src="@/assets/logo.png" />
        <van-dropdown-menu>
            <van-dropdown-item :value="value" :options="categories" @change="change" />
        </van-dropdown-menu>
    </div>
</template>
<script>
export default {
    props:{
        value:Number  
    },
    data() {
        return {
            categories: [
                { text: '全部课程', value: 0 },
                { text: 'vue课程', value: 1 },
                { text: 'react课程', value: 2 },
            ]
        }
    },
    methods: {
        change(newVal) {
            this.$emit('input',newVal);
        }
    }
}
</script>
```

## 4.`vuex`流程搭建

### 4.1 `vuex`实现模块化

```js
const files = require.context('.',true,/\.js$/);
const modules = {}
files.keys().forEach(key=>{
    const path = key.replace(/(\.\/|\.js)/g, '');
    if(path === 'index') return;
    const [namespace,type] = path.split('/');
    if(!modules[namespace]){
        modules[namespace] = {
            namespaced :true
        }
    }
    modules[namespace][type] = files(key).default;
})
export default modules
```

```bash
─home
    |-- state.js
    |-- actions.js
    |-- mutations.js
─profile
    |-- state.js
    |-- actions.js
    |-- mutations.js
─user
    |-- state.js
    |-- actions.js
    |-- mutations.js
```

```js
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
Vue.use(Vuex)
export default new Vuex.Store({
  ...modules
})
```

### 4.2 设置分类

- `state.js` 设置`vuex`中的默认状态

```js
const state = {
    category:0
}
export default state;
```

- `action-types.js` 设置`action`类型

```js
export const SET_CATEGORIES = 'SET_CATEGORIES'; // 设置分类
```

- `mutations.js` 增加修改状态方法

```js
import * as Types from '@/store/action-types'
const mutations = {
    [Types.SET_CATEGORIES](state,payload){
        state.category = payload
    }
}
export default mutations
```

```vue
<template>
    <HomeHeader v-model="currentCategory"></HomeHeader>
</template>
<script>
import HomeHeader from './home-header';
import { createNamespacedHelpers } from 'vuex';
import * as Types from '@/store/action-types.js'
const { mapState,mapMutations } = createNamespacedHelpers('home');
export default {
    methods:{
        ...mapMutations([Types.SET_CATEGORIES]),
    },
    computed:{
        ...mapState(['category']),
        currentCategory:{
            get(){
                return this.category
            },
            set(val){
                this[Types.SET_CATEGORIES](val);
            }
        }
    },
    components: {
        HomeHeader
    }
}
</script>
```

## 5.轮播图实现

### 5.1 扩展`axios`

```js
import axios from 'axios';
class HTTP {
    constructor() {
        this.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:7001' :
            '/';
        this.timeout = 3000;
        this.queue = {};
    }
    setInterceptor(instance, url) {
        instance.interceptors.request.use((config) => { // 请求拦截
            this.queue[url] = url;
            return config;
        }, err => {
            return Promise.reject(err);
        });
        instance.interceptors.response.use((res) => {
            delete this.queue[url];
            if (res.data.err === 0) {
                return res.data.data
            } else {
                return Promise.reject(res.data)
            }
        }, err => {
            delete this.queue[url];
            return Promise.reject(err);
        })
    }
    request(options) {
        let instance = axios.create();
        let config = {
            ...options,
            baseURL: this.baseURL,
            timeout: this.timeout
        }
        this.setInterceptor(instance, options.url);
        return instance(config);
    }
    post(url, data) {
        return this.request({
            method: 'post',
            url,
            data
        })
    }
    get(url, config = {}) {
        return this.request({
            method: 'get',
            url: url,
            ...config
        })
    }
}
export default new HTTP
```

### 5.2 接口封装

```js
import axios from "../utils/axios"
// 获取轮播图 
export const fetchSlides = () => axios.get('/api/slider');
```

### 5.3 `vuex`中同步接口数据

```js
const state = {
    category:0,
    slides: []
}
export default state;
```

```js
export const SET_SLIDES = 'SET_SLIDES' // 设置轮播图数据
```

```jsx
import * as Types from '@/store/action-types'
import { fetchSlides } from '@/api/home.js'
const actions = {
    async [Types.SET_SLIDES]({ commit }) {
        let slides = await fetchSlides();
        commit(Types.SET_SLIDES, slides);
    }
}
export default actions
```

```js
import * as Types from '@/store/action-types'
const mutations = {
    [Types.SET_SLIDES](state, slides) {
        state.slides = slides
      }
}
export default mutations
```

```vue
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(slide,index) in slides" :key="index">
        <img :src="slide.url"></van-swipe-item>
</van-swipe>
<script>
 mounted() {
     if (this.slides.length == 0) {
         this[Types.SET_SLIDES]();
     }
 }
</script>
```