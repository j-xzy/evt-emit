# *evt-emit*

*单例的事件模块*

## 使用

```
npm install evt-emit
```

1. 注册监听

``` ts
function callback(arg: any) {
  //
}

const symbol = Symbol.for('symbol');

// string
EvtEmitter.Instance.subscribe('key', callback);

// number
EvtEmitter.Instance.subscribe(123, callback);

// symbol
EvtEmitter.Instance.subscribe(symbol, callback); 
```

2. 触发

``` ts
// with arguments
EvtEmitter.Instance.emit('key', 'xxxxx');

EvtEmitter.Instance.emit(123);

EvtEmitter.Instance.emit(symbol);
```

3. 解除监听

``` ts
// 解除'key'的所有监听
EvtEmitter.Instance.unSubscribe('key');

// 解除symbol的callback监听
EvtEmitter.Instance.unSubscribe(symbol, callback);
```