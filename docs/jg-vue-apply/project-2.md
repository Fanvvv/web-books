# **项目实战** (二)

## 一.登录权限

### 1.用户注册模块实现

#### `API`接口定制

后端接口:`http://localhost:3000/public/reg`

```js
export default {
    reg:'/user/reg',
}
```

```js
import config from './config/user';
import axios from '@/utils/request';
export const reg = (options) => axios.post(config.reg,options);
```

#### 调用接口

```js
import * as user from '@/api/user.js'
submitForm(formName) {
    this.$refs[formName].validate(async valid => {
        if (valid) {
            try {
                await user.reg(this.ruleForm);
                this.$message({
                    type:'sucess',
                    message:'注册成功，请登录'
                });
                this.$router.push('/login');
            } catch (e) {
                this.$message({
                    type:'error',
                    message:e
                });
            }
        } else {
            return false;
        }
    });
}
```

### 2.验证码获取

后端接口:`http://localhost:3000/public/getCaptcha`

```text
export default {
    getSlider: '/public/getSlider', // 获取轮播图接口
    getCaptcha:'/public/getCaptcha' // 获取验证码
}
```

需要用户产生唯一标识，可以和验证码对应

```js
export const setLocal = (key, value) => {
    if(typeof value === 'object'){
        return localStorage.setItem(key,JSON.stringify(value));
    }
    localStorage.setItem(key, value);
}
export const getLocal = (key,isObject) => {
    if(isObject){
        return JSON.parse(localStorage.getItem(key)) || {}
    }
    return localStorage.getItem(key) || '';
}
```

> 封装`setLocal`和 `getLocal`本地存储方法

```js
import {getLocal} from '@/utils/local'
export const getCaptcha = () => axios.get(config.getCaptcha, {params: {
    uid:getLocal('uid')
}}); 
```

获取验证码并传入当前用户的唯一标识

```js
import {v4} from 'uuid';
import {setLocal,getLocal} from '@/utils/local';
import {getCaptcha} from '@/api/public.js'
export default {
	async mounted(){
      this.uid = getLocal('uid');
      if(!this.uid){
        setLocal('uid',v4())
      }
      this.getCaptcha();
    },
    methods: {
      async getCaptcha(){
        let {data} = await getCaptcha();
        this.verify = data;
      },
    }
}
```

> 页面加载时获取验证码，同样点击时也可以调用`getCaptcha`切换验证码

### 3.登录实现

后端接口:`http://localhost:3000/user/login`

```js
export default {
    login:'/user/login'
}
```

```js
export const login = (options) => axios.post(config.login, options);
```

#### `Vuex`存储用户信息

```js
// 设置用户信息
export const SET_USER = 'SET_USER'
// 用户登录
export const USER_LOGIN = 'USER_LOGIN';
// 设置以及获取权限
export const SET_PERMISSION = 'SET_PERMISSION'
```

> 定制要实现的功能

```js
import * as user from '@/api/user'
import * as types from '../action-types';
import { setLocal,getLocal } from '@/utils/local'
export default {
    state: {
        userInfo: {},
        hasPermission: false,
    },
    mutations: {
        [types.SET_USER](state, payload) {
            state.userInfo = payload;
            setLocal('token',payload.token);
        },
        [types.SET_PERMISSION](state, has) {
            state.hasPermission = has;
        }
    },
    actions: {
        async [types.SET_USER]({ commit, dispatch }, { payload, hasPermission }) {
            commit(types.SET_USER, payload);
            commit(types.SET_PERMISSION, hasPermission);
        },
        async [types.USER_LOGIN]({ dispatch }, userInfo) {
            let result = await user.login(userInfo);
            dispatch(types.SET_USER, {
                payload: result.data,
                hasPermission: true
            });
            return result;
        }
    }
}
```

#### **实现登录逻辑**

```js
import * as types from "@/store/action-types";
import { createNamespacedHelpers } from "vuex";
let { mapActions } = createNamespacedHelpers("user");
methods: {
    ...mapActions([types.USER_LOGIN]),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try{
            let {data} = await this[types.USER_LOGIN]({...this.ruleForm,uid:this.uid});
            this.$router.push('/');
          }catch(e){
            this.$message({type:'error',message:e});
          }
        } else {
          alert("失败");
          return false;
        }
      });
    }
}
```

#### 用户菜单控制

```html
<template v-if="!hasPermission">
  <el-menu-item index="login">
    <router-link to="/login">登录</router-link>
  </el-menu-item>
  <el-menu-item index="reg">
    <router-link to="/reg">注册</router-link>
  </el-menu-item>
</template>
<el-submenu index="profile" v-else>
  <template slot="title">{{userInfo.username}}</template>
    <el-menu-item @click="$router.push('/manager')">管理后台</el-menu-item>
  <el-menu-item index="logout">退出登录</el-menu-item>
</el-submenu>
```

```js
import * as types from "@/store/action-types";
import { createNamespacedHelpers } from "vuex";
let { mapActions, mapState, mapMutations } = createNamespacedHelpers("user");
export default {
  computed: {
    ...mapState(["hasPermission", "userInfo"])
  },
};
```

### 4.验证是否登录

后端接口:`http://localhost:3000/user/validate`

```js
export default {
    validate: '/user/validate'
}
```

```js
export const validate = () => axios.get(config.validate);
```

```js
async [types.USER_VALIDATE]({ dispatch }) {
    if (!getLocal('token')) return false;
    try {
        let result = await user.validate();
        dispatch(types.SET_USER, {
            payload: result.data,
            hasPermission: true
        });
        return true;
    } catch (e) {
        dispatch(types.SET_USER, {
            payload: {},
            hasPermission: false
        });
    }
}
```

> 如果没有token返回false,之后通过token校验用户是否登录。

```js
[types.SET_USER](state, payload) {
    state.userInfo = payload;
    if (payload && payload.token) {
        setLocal('token', payload.token);
    } else {
        localStorage.clear('token');
    }
}
```

> 如果token被修改，验证登录失败，清除token信息.

### 5.路由钩子鉴权

遍历hook文件添加钩子方法

```js
import hooks from './hook'
Object.values(hooks).forEach(hook=>{
    router.beforeEach(hook.bind(router));
})
```

```js
import store from '../store';
import * as types from '../store/action-types';
const loginPermission = async function(to, from, next) {
    let flag = await store.dispatch(`user/${types.USER_VALIDATE}`);
    next();
}
```

```js
 config.headers.authorization = 'Bearer '+getLocal('token')
```

> 携带token

### 6.根据是否需要登录增加校验

```text
meta:{
    needLogin:true
}
```

> 给路由增添路由源信息

```js
const loginPermission = async function(to, from, next) {
    // 先判断是否需要登录
    let needLogin = to.matched.some(item => item.meta.needLogin);
    let flag = await store.dispatch(`user/${types.USER_VALIDATE}`);
    if (!store.state.user.hasPermission) {
        if (needLogin) { // 没权限需要登录,那就校验是否登陆过
            if (!flag) { // 没登陆过
                next('/login')
            } else {
                next();
            }
        } else { // 没权限不需要登录
            next();
        }
    } else {
        // 有权限
        if (to.path == '/login') {
            next('/');
        } else {
            next();
        }
    }
}
```

## 二.路由权限

```js
export const ADD_ROUTE  = 'ADD_ROUTE' // 添加路由动作
export const SET_MENU_PERMISSION = 'SET_MENU_PERMISSION' // 表示菜单权限已经拥有
```

```js
export const menuPermission = async function(to, from, next) {
    if (store.state.user.hasPermission) {
        if (!store.state.user.menuPermission) {
            store.dispatch(`user/${types.ADD_ROUTE}`);
            next({...to,replace:true});
        } else {
            next();
        }
    } else {
        next();
    }
}
```

> 根据用户返回的权限过滤需要的路由

```js
import router from '@/router/index'
import per from '@/router/per';
async [types.ADD_ROUTE]({ commit, state }) {
    let authList = state.userInfo.authList;
    if (authList) {
        // 开始 规划路由
        let routes = filterRouter(authList);
        let route = router.options.routes.find(item => item.path === '/manager');
        route.children = routes;
        router.addRoutes([route]);
        commit(types.SET_MENU_PERMISSION, true);
    }
}
```



> 过滤的当前用户支持的路由

```js
const filterRouter = (authList) => {
    let auths = authList.map(item => item.auth);
    const filter = (authRoutes) => {
        let result = authRoutes.filter(route => {
            if (auths.includes(route.meta.auth)) {
                if (route.children) {
                    route.children = filter(route.children);
                }
                return route;
            }
        })
        return result
    }
    return filter(per);
}
```



```js
[types.SET_MENU_PERMISSION](state, has) {
	state.menuPermission = has;
}
```

## 三.菜单权限

### 1.菜单权限的处理

针对不同的用户，提供不同的菜单。

#### 管理员权限

- 用户管理功能
- 用户统计功能
- 信息发布功能
- 文章管理功能

#### 普通用户权限

- 个人中心功能
- 我的收藏功能
- 私信消息功能
- 我的文章功能

```js
import { createNamespacedHelpers } from "vuex";
let { mapState } = createNamespacedHelpers("user");
export default {
    data() {
        return { menuList: [] };
    },
    mounted() {
        this.menuList = this.getMenList(this.userInfo.authList);
    },
    computed: {
        ...mapState(["userInfo"])
    },
    methods: {
        getMenList(authList) {
            let menu = [];
            let sourceMap = {};
            authList.forEach(m => {
                m.children = [];
                sourceMap[m.id] = m;
                if (m.pid === -1) {
                    menu.push(m);
                } else {
                    sourceMap[m.pid] && sourceMap[m.pid].children.push(m);
                }
            });
            return menu;
        }
    },
    render() { // 递归生成菜单
        let renderChildren = (data) => {
            return data.map(child => {
                return child.children.length ?
                    <el-submenu index={child._id}>
                        <div slot="title">{child.name}</div>
                        {renderChildren(child.children)}
                    </el-submenu> :
                    <el-menu-item index={child.path}>{child.name}</el-menu-item>
            })
        }
        return <el-menu
            background-color="#333"
            text-color="#fff"
            default-active={this.$route.path}
            router={true}
        >
            {renderChildren(this.menuList)}
        </el-menu>
    }
}
```

## 四.`websocket`封装

### 1.通过Vuex创建WebSocket

```js
export const CREATE_WEBSOCKET = 'CREATE_WEBSOCKET';
export const SET_MESSAGE = 'SET_MESSAGE';
```

> 当用户登录后，创建websocket对象

```js
export const createWebsocket = async function(to, from, next) {
    if (store.state.user.hasPermission && !store.state.ws) {
        store.dispatch(`${types.CREATE_WEBSOCKET}`);
        next();
    } else {
        next();
    }
}
```

```js
[types.CREATE_WEBSOCKET](state,ws){
    state.ws = ws;
}
async [types.CREATE_WEBSOCKET]({commit}){
    let ws = new WS();
    ws.create();
    commit(types.CREATE_WEBSOCKET,ws);
}
```

> 将websocket对象保存到vuex中，方便后续使用

### 2.WebSocket封装

- 实现监听消息
- 实现消息发送
- 实现心跳检测
- 实现断线重连

```js
import { getLocal } from './local'
import store from '@/store'
import * as types from '@/store/action-types';
class WS {
    constructor(config = {}) {
        this.url = config.url || 'localhost'
        this.port = config.port || 4000
        this.protocol = config.protocol || 'ws'
        this.time = config.time || 3000 * 10;
    }
    create() {
        this.wsc = new WebSocket(`${this.protocol}://${this.url}:${this.port}`);
        this.wsc.onopen = this.onOpen;
        this.wsc.onmessage = this.onMessage;
        this.wsc.onclose = this.onClose;
        this.wsc.onerror = this.onError
    }
    onOpen = () => {
        this.wsc.send(JSON.stringify({
            type: 'auth',
            data: getLocal('token')
        }))
    }
    onClose = () => {
        this.wsc.close()
    }
    send = (msg) => {
        this.wsc.send(JSON.stringify(msg));
    }
    onMessage = (e) => {
        var {type,data} = JSON.parse(e.data);
        switch (type) {
            case 'noAuth':
                console.log('没权限')
                break;
            case 'heartCheck':
                this.checkServer();
                this.wsc.send(JSON.stringify({ type: 'heartCheck'}))
                break;
            default:
                if(data === 'auth ok') return;
                store.commit(types.SET_MESSAGE,data)
        }
    }
    onError = () => {
        setTimeout(() => {
            this.create()
        }, 1000);
    }
    checkServer() {
        clearTimeout(this.handle);
        this.handle = setTimeout(() => {
            this.onClose();
            this.onError()
        }, this.time + 1000)
    }
}
export default WS;
```

### 3.存放WebSocket信息

```js
[types.SET_MESSAGE](state,msg){
	state.message = msg
}
```