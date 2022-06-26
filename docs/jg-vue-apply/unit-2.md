# 前端自动化测试（二）

上一章节，我们已经讲述了Jest中的基本使用,这一章我们来深度使用Jest

在测试中我们会遇到很多问题，像如何测试异步逻辑，如何mock接口数据等...

通过这一章节，可以让你在开发中对Jest的应用游刃有余，我们来逐一击破吧！

## 1.Jest进阶使用

### 1.1 异步函数的测试

提到异步无非就两种情况，一种是回调函数的方式，一种就是现在流行的promise方式

```javascript
export const getDataThroughCallback = fn => {
  setTimeout(() => {
    fn({ name: "zf" });
  }, 1000);
};

export const getDataThroughPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "zf" });
    }, 1000);
  });
};
```

我们编写`async.test.js`方法

```javascript
import {getDataThroughCallback,getDataThroughPromise} from './3.getData';

// 默认测试用例不会等待测试完成，所以增加done参数，当完成时调用done函数
it('测试传入回调函数 获取异步返回结果',(done)=>{ // 异步测试方法可以通过done
    getDataThroughCallback((data)=>{
        expect(data).toEqual({name:'zf'});
        done();
    })
})
// 返回一个promise 会等待这个promise执行完成
it('测试promise 返回结果 1',()=>{
    return getDataThroughPromise().then(data=>{
        expect(data).toEqual({name:'zf'});
    })
})
// 直接使用async + await语法
it('测试promise 返回结果 2',async ()=>{
    let data = await getDataThroughPromise();
    expect(data).toEqual({name:'zf'});
})
// 使用自带匹配器
it('测试promise 返回结果 3',async ()=>{
    expect(getDataThroughPromise()).resolves.toMatchObject({name:'zf'})
})
```

## 2.Jest中的mock

### 2.1 模拟函数jest.fn()

为什么要模拟函数呢？来看下面这种场景，你要如何测试

```javascript
export const myMap = (arr,fn) =>{
   return arr.map(fn)
}
```

打眼一看很简单啊，我只需要判断函数的返回结果就可以啦,像这样

```javascript
import { myMap } from "./map";
it("测试 map方法", () => {
  let fn = item => item * 2;
  expect(myMap([1, 2, 3], fn)).toEqual([2, 4, 6]);
});
```

但是我想更细致一些，像每一次调用函数传入的是否是数组的每一项，函数是否被调用了三次,说的更明确些就是想追溯函数具体的执行过程！

```javascript
import { myMap } from "./map";
it("测试 map 方法", () => {
  // 通过jest.fn声明的函数可以被追溯
  let fn = jest.fn(item => (item *= 2));
  expect(myMap([1, 2, 3], fn)).toEqual([2, 4, 6]);
  // 调用3次
  expect(fn.mock.calls.length).toBe(3); 
  // 每次函数返回的值是 2,4,6
  expect(fn.mock.results.map(item=>item.value)).toEqual([2,4,6])
});
```

> 详细看下这个mock中都有什么东东

### 2.2 模拟文件jest.mock()

我们希望对接口进行mock，可以直接在`__mocks__`目录下创建同名文件,将整个文件mock掉，例如当前文件叫`api.js`

```javascript
import axios from "axios";

export const fetchUser = ()=>{
    return axios.get('/user')
}
export const fetchList = ()=>{
    return axios.get('/list')
}
```

创建`__mocks__/api.js`

```javascript
export const fetchUser = ()=>{
    return new Promise((resolve,reject)=> resolve({user:'zf'}))
}
export const fetchList = ()=>{
    return new Promise((resolve,reject)=>resolve(['香蕉','苹果']))
}
```

开始测试

```javascript
jest.mock('./api.js'); // 使用__mocks__ 下的api.js
import {fetchList,fetchUser} from './api'; // 引入mock的方法
it('fetchUser测试',async ()=>{
    let data = await fetchUser();
    expect(data).toEqual({user:'zf'})
})

it('fetchList测试',async ()=>{
    let data = await fetchList();
    expect(data).toEqual(['香蕉','苹果'])
})
```

这里需要注意的是，如果mock的`api.js`方法不全，在测试时可能还需要引入原文件的方法，那么需要使用`jest.requireActual('./api.js')` 引入真实的文件。

这里我们想这样做是不是有些麻烦呢，其实只是想将真正的请求mock掉而已，那么我们是不是可以直接`mock axios`方法呢？

在`__mocks__`下创建 `axios.js` 重写get方法

```javascript
export default {
    get(url){
        return new Promise((resolve,reject)=>{
            if(url === '/user'){
                resolve({user:'zf'});
            }else if(url === '/list'){
                resolve(['香蕉','苹果']);
            }
        })
    }
}
```

当方法中调用`axios`时默认会找`__mocks__/axios.js`

```javascript
jest.mock('axios'); // mock axios方法
import {fetchList,fetchUser} from './api';
it('fetchUser测试',async ()=>{
    let data = await fetchUser();
    expect(data).toEqual({user:'zf'})
})

it('fetchList测试',async ()=>{
    let data = await fetchList();
    expect(data).toEqual(['香蕉','苹果'])
})
```

### 2.3 模拟Timer

接着来看下个案例，我们期望传入一个callback，想看下callback能否被调用！

```javascript
export const timer = callback=>{
    setTimeout(()=>{
        callback();
    },2000)
}
```

因此我们很容易写出了这样的测试用例

```javascript
import {timer} from './timer';
it('callback 是否会执行',(done)=>{
    let fn = jest.fn();
    timer(fn);
    setTimeout(()=>{
        expect(fn).toHaveBeenCalled();
        done();
    },2500)
});
```

有没有觉得很愚蠢，如果时间很长呢？ 很多个定时器呢？这时候我们想到了`mock Timer`

```javascript
import {timer} from './timer';
jest.useFakeTimers();
it('callback 是否会执行',()=>{
    let fn = jest.fn();
    timer(fn);
    // 运行所有定时器，如果需要测试的代码是个秒表呢？
    // jest.runAllTimers();
    
    // 将时间向后移动2.5s
    // jest.advanceTimersByTime(2500);

    // 只运行当前等待定时器
    jest.runOnlyPendingTimers();
    expect(fn).toHaveBeenCalled();
});
```

## 3. Jest中的钩子函数

为了测试的便利，Jest中也提供了类似于Vue一样的钩子函数，可以在执行测试用例前或者后来执行

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }
  add(count) {
    this.count += count;
  }
}
module.exports = Counter;
```

我们要测试`Counter`类中`add`方法是否符合预期,来编写测试用例

```javascript
import Counter from './hook'
it('测试  counter增加 1 功能',()=>{
    let counter = new Counter; // 每个测试用例都需要创建一个counter实例，防止相互影响
    counter.add(1);
    expect(counter.count).toBe(1)
})

it('测试  counter增加 2 功能',()=>{
    let counter = new Counter;
    counter.add(2);
    expect(counter.count).toBe(2)
})
```

我们发现每个测试用例都需要基于一个新的`counter`实例来测试，防止测试用例间的相互影响,这时候我们可以把重复的逻辑放到钩子中！

**钩子函数**

- beforeAll 在所有测试用例执行前执行
- afteraAll 在所有测试用例执行后
- beforeEach 在每个用例执行前
- afterEach 在每个用例执行后

```javascript
import Counter from "./hook";
let counter = null;
beforeAll(()=>{
    console.log('before all')
})
afterAll(()=>{
    console.log('after all')
})
beforeEach(() => {
  console.log('each')
  counter = new Counter();
});
afterEach(()=>{
    console.log('after');
})
it("测试  counter增加 1 功能", () => {
  counter.add(1);
  expect(counter.count).toBe(1);
});
it("测试  counter增加 2 功能", () => {
  counter.add(2);
  expect(counter.count).toBe(2);
});
```

> 钩子函数可以多次注册，一般我们通过describe 来划分作用域

```javascript
import Counter from "./hook";
let counter = null;
beforeAll(() => console.log("before all"));
afterAll(() => console.log("after all"));
beforeEach(() => {
  counter = new Counter();
});
describe("划分作用域", () => {
  beforeAll(() => console.log("inner before")); // 这里注册的钩子只对当前describe下的测试用例生效
  afterAll(() => console.log("inner after"));
  it("测试  counter增加 1 功能", () => {
    counter.add(1);
    expect(counter.count).toBe(1);
  });
});
it("测试  counter增加 2 功能", () => {
  counter.add(2);
  expect(counter.count).toBe(2);
});
// before all => inner before=> inner after => after all
// 执行顺序很像洋葱模型 ^-^
```

## 4.Jest中的配置文件

我们可以通过jest命令生成jest的配置文件

```bash
npx jest --init
```

会提示我们选择配置项：

```bash
➜  unit npx jest --init
The following questions will help Jest to create a suitable configuration for your project
# 使用jsdon
✔ Choose the test environment that will be used for testing › jsdom (browser-like)
# 添加覆盖率
✔ Do you want Jest to add coverage reports? … yes
# 每次运行测试时会清除所有的mock
✔ Automatically clear mock calls and instances between every test? … yes
```

在当前目录下会产生一个`jest.config.js`的配置文件

## 5.Jest覆盖率

刚才产生的配置文件我们已经勾选需要产生覆盖率报表，所有在运行时我们可以直接增加 `--coverage`参数

```json
"scripts": {
    "test": "jest --coverage"
}
```

可以直接执行`npm run test`,此时我们当前项目下就会产生coverage报表来查看当前项目的覆盖率

```bash
---------|----------|----------|----------|----------|-------------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------|----------|----------|----------|----------|-------------------|
All files |      100 |      100 |      100 |      100 |                   |
 hook.js  |      100 |      100 |      100 |      100 |                   |
----------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.856s, estimated 2s
```

> 命令行下也会有报表的提示，jest增加覆盖率还是非常方便的~

- Stmts表示语句的覆盖率
- Branch表示分支的覆盖率(if、else)
- Funcs函数的覆盖率
- Lines代码行数的覆盖率

到此我们的`Jest`常见的使用已经基本差不多了！接下我们来看看如何利用Jest来测试Vue项目！