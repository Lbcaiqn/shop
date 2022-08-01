import mitt from 'mitt'

//mitt是比较老的库了，实现基于ES5的构造函数且没有做ts支持，会报错，这里童年过类型断言为any解决
export default new (mitt as any)()