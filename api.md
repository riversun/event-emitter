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
