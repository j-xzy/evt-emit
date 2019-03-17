import { EvtEmitter } from './src';

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

// with arguments
EvtEmitter.Instance.emit('key', 'xxxxx');

EvtEmitter.Instance.emit(123);

EvtEmitter.Instance.emit(symbol);

EvtEmitter.Instance.unSubscribe(123);
EvtEmitter.Instance.unSubscribe('key', callback);
