/*
 用意： Promise 用来解决回调地狱
 什么是回调地狱？异步操作时，想获取异步操作内部的反馈只能通过在异步操作内部使用回调函数；而多次需要前面执行状态的异步操作就很容易陷入嵌套的回调地狱。

 *1.Promise 是一个构造函数，可以 new Promise() 得到一个 Promise 的实例
 * 2.在 Promise 内，有2个函数，分别是 resolve（成功后的回调函数） 和 reject（失败后的回调函数）
 * 3.Promise 构造函数的 Prototype 属性上，有个 .then() 方法，也就是说任意 Promise 构造函数创建的实例，都可以访问到 .then() 方法
 * 4.Promise 表示一个 异步操作，每当我们 new 一个 Promise 的实例，就表示一个具体的异步操作
 * 5.Promise 创建的实例的异步操作只有2种状态：
 *   5.1 状态1：异步执行成功，需要在内部调用 成功的回调函数 resolve()把结果返回给调用者；
 *   5.2 状态2：异步执行失败，需要在内部调用 失败的回调函数 reject()把结果返回给调用者；
 *   PS：由于 Promise的实例是一个异步操作，所以内部拿到操作的结果后，无法通过return 把操作的结果返回给调用者；这时候只能用回调函数的形式，把 成功 或 失败 的结果返回给调用者；
 * 6.我们可以在 new 出来的 Promise 实例上，调用 .then() 方法，【预先】为这个 Promise 异步操作，指定 resolve 和 reject 回调函数
 * */

//这里new 出来的 promise ，只是代表 【形式上的】一个异步操作
//形式上的意思是说，我们只知道它是一个异步操作，但是是做什么具体的异步工作，目前不清楚
// var promise = new Promise()

//每当 new 一个 Promise 实例时，就会立即执行这个异步操作中的代码
//也就是说，new 的时候，除了能得到一个 promise实例 外，还会理解调用我们为 Promise 构造函数传递的那个function，执行这个function中的 异步代码。
// var promise = new Promise(function () {
//     //    这个 function 内部就是具体的操作
//     setTimeout(function () {
//         console.log("timeout")
//     },1000)
//     console.log("promise的功能执行了")
// })


//    一般的 Promise 使用方法：处理异步函数，根据执行成功与否调用callback处理
//    场景:封装一个函数，功能为读取一个文件并返回内容
// const fs = require('fs')
// function getFileByPath(fpath) {
//     return  new Promise(function (resolve, reject) {
//         fs.readFile(fpath, 'utf-8', (err, data) => {
//             if (err)
//                 return reject(err)
//             resolve(data)
//         })
//     })
// }
var p = getFileByPath()
p.then(function () {
//    resolve函数，成功时执行
},function () {
//    reject函数，失败时执行
})


// 1.Promise内部的读取文件的操作是异步操作，主线程new完Promise后继续向下执行而非去读文件，于是return 了 promise 对象，用 p 接收了这个 promise 实例，
// 2.主线程继续向下执行，通过 p.then() 给 promise 对象设置了成功和失败的回调函数
// 3.主线程执行完同步任务后，回去处理 promise 内部的 读文件的异步操作，此时promise 是已经设置好 resolve 和 reject 的状态，因此先执行，再通过状态判断执行哪个回调函数。

// promise 解决 回调地狱的例子
//    实现读取1.txt，2.txt，3.txt,上一个成功读取才读下一个
//PS: 通过 .then 指定回调函数时， 成功的回调函数 resolve 必须传；失败的可以忽略不传

//运行结果是 1.txt 输出，2的错误导致2和3都无法输出。当然，无错时如预期结果
// getFileByPath('./files/1.txt')
//     .then(function (data) {
//         console.log(data)
//         //    读取文件2
//         return getFileByPath('./files/22.txt')
//     })
//     .then(function (data) {
//         console.log(data)
//         //读取文件3
//         return getFileByPath('./files/3.txt')
//     })
//     .then(function (data) {
//         console.log(data)
//     })



// 如果前面的 promise 执行失败，不想让后续的 promise 操作被终止，可以为每个 promise 指定 失败的回调

//运行结果是哪怕2错，报错后3依然能输出
// getFileByPath('./files/1.txt')
//     .then(function (data) {
//         console.log(data)
//         //    读取文件2
//         return getFileByPath('./files/22.txt')
//     },function (err) {
//         console.log(err.message)
//         return getFileByPath('./files/22.txt')
//     })
//     .then(function (data) {
//         console.log(data)
//         //读取文件3
//         return getFileByPath('./files/3.txt')
//     },function (err) {
//         console.log(err.message)
//         return getFileByPath('./files/3.txt')
//     })
//     .then(function (data) {
//         console.log(data)
//     })

//如果有一个 promise 失败，立即终止所有。
//用catch捕获错误，且删除前面的reject函数
//catch 的作用：前面的有任何的 Promise 执行失败则立即终止所有的 promise 的执行，并马上进入 catch 去处理 Promise 中抛出的异常。

//结果是在 2.txt 处有错，3不执行，直接捕获输出错误信息
getFileByPath('./files/1.txt')
    .then(function (data) {
        console.log(data)
        //    读取文件2
        return getFileByPath('./files/22.txt')
    })
    .then(function (data) {
        console.log(data)
        //读取文件3
        return getFileByPath('./files/3.txt')
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (err) {
        console.log("这是自己的错误信息"+err.message)
    })
