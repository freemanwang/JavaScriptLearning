// // var a = {n: 1};
// // var b = a;
// // a.x = a = {n: 2};
// //
// // console.log(a.x)
// // console.log(a)
// // console.log(b.x)
// // console.log(b)
//
// function maopao(arr){
//     const array = [...arr]
//     console.time('time1')
//     for(let i = 0, len = array.length; i < len - 1; i++){
//         for(let j = i + 1; j < len; j++) {
//             if (array[i] > array[j]) {
//                 let temp = array[i]
//                 array[i] = array[j]
//                 array[j] = temp
//             }
//         }
//     }
//     console.timeEnd('time1')
//     return array
// }
//
// function maopao1(arr){
//     const array = [...arr]
//     console.time('time2')
//
//     //小优化，已有序就不继续遍历，节省掉不需要的工序
//     for(let i = 0, len = array.length; i < len - 1; i++){
//         let isOk = true
//         for(let j = i + 1; j < len; j++) {
//             if (array[j] > array[j+1]) {
//                 let temp = array[j]
//                 array[j] = array[j+1]
//                 array[j+1] = temp
//                 isOk = false
//             }
//         }
//         if(isOk){
//             break
//         }
//     }
//     console.timeEnd('time2')
//     return array
// }
//
// arr = [1,2,3,4,5,6,7,8,9,10,13,17,14,15,16,18,19,20]
// console.log(maopao(arr))
// console.log(maopao1(arr))
//
//
//
// /*
// * 这题考察的是对象的键名的转换。
//
// 对象的键名只能是字符串和 Symbol 类型。
// 其他类型的键名会被转换成字符串类型。
// 对象转字符串默认会调用 toString 方法。*/
// // example 1
// var a={}, b='123', c=123;
// a[b]='b';
// a[c]='c';  //123 转换成 '123',覆盖b
// console.log(a[b]);  //c
//
// // example 2
// var a={}
// b=Symbol('123')
// c=Symbol('123');
// a[b]='b';//// b 是 Symbol 类型，不需要转换。
// a[c]='c';//// c 是 Symbol 类型，不需要转换。任何一个 Symbol 类型的值都是不相等的，所以不会覆盖掉 b。
// console.log(a[b]);  //b
//
// // example 3
// var a={}, b={key:'123'}, c={key:'456'};
// a[b]='b';// b 不是字符串也不是 Symbol 类型，需要转换成字符串。
// // 对象类型会调用 toString 方法转换成字符串 [object Object]。
// a[c]='c';// c 不是字符串也不是 Symbol 类型，需要转换成字符串。
// // 对象类型会调用 toString 方法转换成字符串 [object Object]。这里会把 b 覆盖掉。
// console.log(a[b]);   //c
//

function moveZero(arr) {
    let len = arr.length
    j = 0
    for(let i=0; i<len-j; i++){
        if (arr[i] === 0){
            arr.push(0)
            arr.splice(i,1)
            j ++ //0的个数+1，也用来让i下标不用进入0的区域
            i -- //下一位已经挪到当前下标，所以--来抵消++，才能不跳过当前位
        }
    }
    return arr
}
arr = [1,0,1,0,0,1,1,0]
res = moveZero(arr)
console.log(res)

function twoSum(arr, target) {
    hash = {}
    for (let i=0; i<arr.length; i++){
        if (target - arr[i] in hash){
            return [arr[i], target-arr[i]]
        }else {
            hash[target]
        }
    }
}
