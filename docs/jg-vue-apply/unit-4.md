# 前端自动化测试（四）

在Vue项目中测试组件时会引用全局组件，那么如何处理这些全局组件呢？ 还有Vue中比较重要的一个点`Vuex`如何进行测试？

## 1.测试时使用VueRouter

### 1.1 存根

在你的组件中引用了全局组件 `router-link` 或者 `router-view`组件时，我们使用`shallowMount`来渲染会提示无法找到这两个组件，我们可以使用存根的方式`mock`掉相关的组件，

```javascript
<template>
    <div>
        <h1>当前路由:{{this.$route.path}}</h1>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于页面</router-link>

        <router-view></router-view>
    </div>
</template>
```

```javascript
import Nav from "@/components/Nav.vue";
import { shallowMount } from "@vue/test-utils";
it("测试Nav组件", () => {
  let wrapper = shallowMount(Nav,{
      // 忽略这两个组件
      stubs:['router-link','router-view'],
      mocks:{ // mock一些数据传入到Nav组件中
        $route:{path:'/'}
      }
  });
  expect(wrapper.find('h1').text()).toContain('/')
});
```

> 同理：我们可以mock掉一些全局组件，也可以mock一些参数传入到组件中。

## 1.2 安装VueRouter

我们可以也创建一个`localVue`来安装VueRouter,传入到组件中进行渲染。 安装 `Vue Router` 之后 Vue 的原型上会增加 `$route` 和 `$router` 这两个只读属性。所以不要挂载到基本的Vue构造函数上,同时也不能通过`mocks`参数重写这两个属性

```javascript
const localVue = createLocalVue();
localVue.use(VueRouter);

it("测试Nav组件", () => {
    let router = new VueRouter({
        routes:[
          {path:'/',component:Home},
          {path:'/about',component:About}
        ]
    });
    let wrapper = mount(Nav,{
        localVue,
        router
    });
    router.push('/about');
    expect(wrapper.find('h1').text()).toMatch(/about/)
});
```

## 2.Vuex的测试

我们通过一个计数器的例子来掌握如何测试vuex

```vue
<template>
    <div>
        {{this.$store.state.number}}
        <button @click="add(3)">添加</button>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    methods:{
        ...mapActions({'add':'increment'})
    }
}
</script>
```

编写`store/index.js`

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'
Vue.use(Vuex)
export default new Vuex.Store(config)
```

编写`store/mutations.js`

```javascript
export default {
    increment(state,count){
        state.number+=count
    }
}
```

编写`store/actions.js`

```javascript
export default {
  increment({ commit }, count) {
    setTimeout(() => {
      commit("increment", count);
    }, 1000);
  }
};
```

编写`store/config.js`

```javascript
import mutations from "./mutations";
import actions from "./actions";
export default {
  state: {
    number: 0
  },
  mutations,
  actions
};
```

这里我们就不过多的详细讲解vuex的执行过程了，直接开始测试啦！

### 2.1 单元化测试store

我们可以直接把store中的方法一一进行单元测试

就是一个个测试函数，但是需要mock `commit`和`dispatch`方法

```javascript
import mutations from '../mutations';
import actions from '../actions';
jest.useFakeTimers();
it('测试mutation',()=>{
    const state = {number:0}
    mutations.increment(state,2);
    expect(state.number).toBe(2);
});

it('测试action',()=>{
    let commit = jest.fn();
    actions.increment({commit},2);
    jest.advanceTimersByTime(2000);
    expect(commit).toBeCalled();
    expect(commit.mock.calls[0][1]).toBe(2);
});
```

### [#](http://www.zhufengpeixun.com/jg-vue/vue-apply/unit-4.html#_2-2-测试运行的store)2.2 测试运行的store

就是产生一个store,进行测试 好处是不需要`mock`任何方法

```javascript
import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils'
import config from '../config';
jest.useFakeTimers();
it('测试是否可以异步增加 1',()=>{
    let localVue = createLocalVue();
    localVue.use(Vuex);
    let store = new Vuex.Store(config); // 创建一个运行store
    expect(store.state.number).toBe(0);
    store.dispatch('increment',2);
    jest.advanceTimersByTime(2000); // 前进2s
    expect(store.state.number).toBe(2); 
});
```

> config文件最好每次测试时克隆一份，保证每个用例间互不干扰！

### 2.3 测试组件中的Vuex

`mock store`传入组件中，看函数是否能够如期调用

```javascript
import Vuex from 'vuex';
import Counter from '@/components/Counter';
import {createLocalVue,shallowMount} from '@vue/test-utils'

let localVue = createLocalVue();
localVue.use(Vuex);
let store;
let actions;
beforeEach(()=>{
    actions = {
        increment:jest.fn()
    }
    store = new Vuex.Store({
        actions,
        state:{}
    });
});
it('测试组件中点击按钮 是否可以 1',()=>{
    let wrapper = shallowMount(Counter,{
        localVue,
        store
    });
    wrapper.find('button').trigger('click');
    // 测试actions中的increment 方法是否能正常调用
    expect(actions.increment).toBeCalled();
})
```

> 到这里`Vuex`测试的方式我们就讲解完毕了, 其实前端自动化测试并不难~，大家多多练习就可以完全掌握啦!