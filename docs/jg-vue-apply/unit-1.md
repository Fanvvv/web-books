# 前端自动化测试（一）

目前开发大型应用，测试是一个非常重要的环节，但是大多数前端开发者对测试相关的知识是比较缺乏的，因为可能项目开发周期短根本没有机会写。所以你没有办法体会到前端自动化测试的重要性！

来说说为什么前端自动化测试如此重要！

先看看前端常见的问题:

- 修改某个模块功能时，其它模块也受影响，很难快速定位bug
- 多人开发代码越来越难以维护
- 不方便迭代,代码无法重构
- 代码质量差

增加自动化测试后：

- 我们为核心功能编写测试后可以保障项目的可靠性
- 强迫开发者,编写更容易被测试的代码，提高代码质量
- 编写的测试有文档的作用，方便维护

## 1.测试

### 1.1 黑盒测试和白盒测试

- 黑盒测试一般也被称为功能测试，黑盒测试要求测试人员将程序看作一个整体，不考虑其内部结构和特性，只是按照期望验证程序是否能正常工作
- 白盒测试是基于代码本身的测试，一般指对代码逻辑结构的测试。

### 1.2 测试分类

```
单元测试(Unit Testing)
```

单元测试是指对程序中最小可测试单元进行的测试,例如测试`一个函数`、`一个模块`、`一个组件`...

```
集成测试(Integration Testing)
```

将已测试过的单元测试函数进行组合集成暴露出的高层函数或类的封装，对这些函数或类进行的测试

`端到端测试(E2E Testing)` 打开应用程序模拟输入，检查功能以及界面是否正确

### 1.3 TDD & BDD

```
TDD是测试驱动开发(Test-Driven Development)
```

TDD的原理是在开发功能代码之前，先编写单元测试用例代码

```
BDD是行为驱动开发(Behavior-Driven Development)
```

系统业务专家、开发者、测试人员一起合作，分析软件的需求，然后将这些需求写成一个个的故事。开发者负责填充这些故事的内容,保证程序实现效果与用户需求一致。

总结： TDD是先写测试在开发 （一般都是单元测试，白盒测试），而BDD则是按照用户的行为来开发，在根据用户的行为编写测试用例 （一般都是集成测试，黑盒测试）

### 1.4 测试框架

- **Karma** Karma为前端自动化测试提供了跨浏览器测试的能力，可以在浏览器中执行测试用例
- **Mocha** 前端自动化测试框架,需要配合其他库一起使用，像chai、sinon...
- **Jest** Jest 是facebook推出的一款测试框架,集成了 Mocha,chai,jsdom,sinon等功能。
- ...

看到这`facebook` 都在推Jest,你还不学吗? Jest也有一些缺陷就是不能像`karam`这样直接跑早浏览器上，它采用的是`jsdom`，优势是简单、0配置！ 后续我们通过jest来聊前端自动化测试

## 2.Jest的核心应用

在说`Jest`测试之前，先来看看以前我们是怎样测试的

```javascript
const parser = (str) =>{
    const obj = {};
    str.replace(/([^&=]*)=([^&=]*)/g,function(){
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}
const stringify = (obj) =>{
    const arr = [];
    for(let key in obj){
        arr.push(`${key}=${obj[key]}`);
    }
    return arr.join('&');
}
// console.log(parser('name=zf')); // {name:'zf'}
// console.log(stringify({name:'zf'})) // name=zf
```

我们每写完一个功能，会先手动测试功能是否正常，测试后可能会将测试代码注释起来。这样会产生一系列问题，因为会污染源代码，所有的测试代码和源代码混合在一起。如果删除掉，下次测试还需要重新编写。

所以测试框架就帮我们解决了上述的问题

### 2.1 分组、用例

Jest是基于模块的，我们需要将代码包装成模块的方式,分别使用 `export` 将 `parser`、`stringify`这两个方法导出

安装`jest`

```bash
npm init -y # 初始化pacakge.json
npm i jest 
```

我们建立一个`qs.test.js`来专门编写测试用例，这里的用例你可以认为就是一条测试功能 （后缀要以.test.js结尾，这样jest测试时默认会调用这个文件）

```javascript
import {parser,stringify} from './qs';

it('测试 parser 是否能正常解析结果',()=>{
    // expect 断言，判断解析出来的结果是否和 {name:'zf'}相等
    expect(parser(`name=zf`)).toEqual({name:'zf'});
})
```

`jest`默认自带断言功能，断言的意思就是判断是不是这个样子，我断定你今天没吃饭~，结果你吃了。说明这次断言就失败了，测试就无法通过

通过配置`scripts` 来执行命令

```json
"scripts": {
    "test": "jest"
}
```

执行 `npm run test`,可惜的是默认在`node`环境下不支持`es6模块`的语法，需要`babel`转义,当然你也可以直接使用commonjs规范来导出方法，因为大多数现在开发都采用es6模块，所以就安装一下~

```bash
# core是babel的核心包 preset-env将es6转化成es5
npm i @babel/core @babel/preset-env --save-dev
```

并且配置`.babelrc`文件，告诉babel用什么来转义

```json
{
    "presets":[
        [
            "@babel/preset-env",{
                "targets": {"node":"current"}
            }
        ]
    ]
}
```

默认jest中集成了`babel-jest`,运行时默认会调用`.babelrc`进行转义，可以直接将es6转成es5语法
运行 `npm run test` 出现:

继续编写第二个用例

```javascript
import {parser,stringify} from './qs';
describe('测试qs 库',()=>{
    it('测试 parser 是否能正常解析结果',()=>{
        expect(parser(`name=zf`)).toEqual({name:'zf'});
    })
    
    it('测试 stringify 是否正常使用stringify',()=>{
        expect(stringify({name:'zf'})).toEqual(`name=zf`)
    })
});
```

> describe的功能是给用例分组，这样可以更好的给用例分类，其实这就是我们所谓的单元测试，对某个具体函数和功能进行测试

### 2.2 matchers匹配器

在写第一个测试用例时，我们一直在使用`toEqual`其实这就是一个匹配器，那我们来看看`jest`中常用的匹配器有哪些？因为匹配器太多了，所以我就讲些常用的！

为了方便理解，我把匹配器分为三类、判断相等、不等、是否包含

```javascript
it('判断是否相等',()=>{
    expect(1+1).toBe(2); // 相等于 js中的===
    expect({name:'zf'}).toEqual({name:'zf'}); // 比较内容是否相等
    expect(true).toBeTruthy(); // 是否为 true / false 也可以用toBe(true)
    expect(false).toBeFalsy();
});

it('判断不相等关系',()=>{
    expect(1+1).not.toBe(3); // not取反
    expect(1+1).toBeLessThan(5); // js中的小于
    expect(1+1).toBeGreaterThan(1); // js中的大于
});

it('判断是否包含',()=>{
    expect('hello world').toContain('hello'); // 是否包含
    expect('hello world').toMatch(/hello/); // 正则
});
```

### 2.3 测试操作节点方法

说了半天，我们自己来写个功能测试一下!

```javascript
export const removeNode = (node) => {
    node.parentNode.removeChild(node)
};
```

核心就是测试传入一个节点，这个节点是否能从`DOM`中删除

```javascript
import { removeNode } from './dom'
it('测试删除节点',()=>{
    document.body.innerHTML = `<div><button data-btn="btn"></button</div>`
    let btn = document.querySelector('[data-btn="btn"]')
    expect(btn).not.toBeNull()
    removeNode(btn);
    btn = document.querySelector('[data-btn="btn"]');
    expect(btn).toBeNull()
})
```

这个就是我们所说的jsdom，在node中操作dom元素

### 2.4 Jest常用命令

我们希望每次更改测试后，自动重新执行测试,修改执行命令:

```json
"scripts": {
    "test": "jest --watchAll"
}
```

重新执行 `npm run test`，这时就会监控用户的修改 

提示我们按下`w`，显示更多信息

这里我把每个命令的含义都列好了，有需要可以自己尝试一下~