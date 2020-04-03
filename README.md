# @riversun/event-emitter
[![npm version](https://badge.fury.io/js/%40riversun%2Fevent-emitter.svg)](https://badge.fury.io/js/%40riversun%2Fevent-emitter)
[![CircleCI](https://circleci.com/gh/riversun/event-emitter.svg?style=shield)](https://circleci.com/gh/riversun/event-emitter)
[![codecov](https://codecov.io/gh/riversun/event-emitter/branch/master/graph/badge.svg)](https://codecov.io/gh/riversun/event-emitter)

Helper class for sending and receiving events.
- Register a listener to receive events.
- Also, when an event occurs, call the event to the Listener registered in advance using the emit method

MIT License

# install

```
npm install @riversun/event-emitter
```

# usage

## on() method

on() method adds event listener functionｓ that receives events。

```javascript
const eventEmitter = new EventEmitter();

eventEmitter.on('testEvent', data => {
    console.log(data);
});
```

## emit() method 

emit() method sends an event with the specified event name and data to all registered listener functions

```javascript
eventEmitter.emit('testEvent', {testKey: 'testValue'});
```

## only() method

only() method can limit the event listener function that receives events to only one.

```javascript
 eventEmitter.only('testEvent', 'unique-listener', callbackFunc);
```
 
Only one listener is registered per "listenerName" even if called multiple times.
If the same listenerName is set for listener, the old listener will be removed.

# run tests

```
npm test
```

# API details

## Functions

<dl>
<dt><a href="#on">on(eventName, listenerFunc)</a></dt>
<dd><p>Set eventName you want to receive and the listener function to be callbacked from #emit method
 (This eventName will never fire unless called with emit)</p>
</dd>
<dt><a href="#only">only(eventName, listenerName, listenerFunc)</a></dt>
<dd><p>Only one listener is registered per &quot;listenerName&quot; even if called multiple times.
If the same listenerName is set for listener, the old listener will be removed.</p>
</dd>
<dt><a href="#pipe">pipe(eventEmitter)</a></dt>
<dd><p>Set the emitter that receives the callback of this emitter.
When the specified emitter is received a callback, the specified emitter also emits it to its listener.</p>
</dd>
<dt><a href="#emit">emit(eventName, data)</a></dt>
<dd><p>Emit data to listeners (callback functions) registered with the &quot;on()&quot; method.</p>
</dd>
<dt><a href="#hasListenerFuncs">hasListenerFuncs(eventName)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns true if at least one ListenerFunction that receives the event specified by &quot;eventName&quot; is registered</p>
</dd>
<dt><a href="#clearAll">clearAll()</a></dt>
<dd><p>Clear all related listeners</p>
</dd>
</dl>

<a name="on"></a>

## on(eventName, listenerFunc)
Set eventName you want to receive and the listener function to be callbacked from #emit method
 (This eventName will never fire unless called with emit)

**Kind**: global function  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| listenerFunc | <code>function</code> | 

<a name="only"></a>

## only(eventName, listenerName, listenerFunc)
Only one listener is registered per "listenerName" even if called multiple times.
If the same listenerName is set for listener, the old listener will be removed.

**Kind**: global function  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| listenerName | <code>string</code> | 
| listenerFunc | <code>function</code> | 

<a name="pipe"></a>

## pipe(eventEmitter)
Set the emitter that receives the callback of this emitter.
When the specified emitter is received a callback, the specified emitter also emits it to its listener.

**Kind**: global function  

| Param |
| --- |
| eventEmitter | 

<a name="emit"></a>

## emit(eventName, data)
Emit data to listeners (callback functions) registered with the "on()" method.

**Kind**: global function  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 
| data | <code>object</code> | 

<a name="hasListenerFuncs"></a>

## hasListenerFuncs(eventName) ⇒ <code>boolean</code>
Returns true if at least one ListenerFunction that receives the event specified by "eventName" is registered

**Kind**: global function  

| Param | Type |
| --- | --- |
| eventName | <code>string</code> | 

<a name="clearAll"></a>

## clearAll()
Clear all related listeners

**Kind**: global function  
