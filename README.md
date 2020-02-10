# event-emitter

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
