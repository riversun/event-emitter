/**
 * Helper class for sending and receiving events.
 * - Register a listener to receive events.
 * - Also, when an event occurs, call the event to the Listener registered in advance using the emit method
 *
 * MIT License
 *
 * @author Tom Misawa (riversun.org@gmail.com,https://github.com/riversun)
 */
export default class EventEmitter {

  constructor(eventTypes) {

    //  key:eventType,
    //  value:EventListenerList
    this.onListeners = new Map();

    // key:eventType
    // value:EventListenerMap
    this.onlyListeners = new Map();


    //prepare listenerLists related to the eventType
    if (eventTypes) {
      for (const eventType of eventTypes) {
        const listenerList = new EventListenerList();
        this.onListeners.set(eventType, listenerList);
      }
    }

    this.childEventEmitters = [];
  }


  /**
   * Set eventType you want to receive and the listener function to be callbacked from #emit method
   *  (This eventType will never fire unless called with emit)
   *
   * @param {string} eventType
   * @param {function} listenerFunc
   */
  on(eventType, listenerFunc) {

    let listenerList = this.onListeners.get(eventType);

    if (!listenerList) {
      listenerList = new EventListenerList();
      this.onListeners.set(eventType, listenerList);
    }
    listenerList.addListenerFunc(listenerFunc);
  }

  /**
   * Remove specified event listener
   * @param eventType
   * @param listenerFunc
   */
  removeListener(eventType, listenerFunc) {
    let listenerList = this.onListeners.get(eventType);

    if (listenerList) {
      listenerList.removeListener(listenerFunc);
    }
  }

  /**
   * Only one listener is registered per "listenerName" even if called multiple times.
   * If the same listenerName is set for listener, the old listener will be removed.
   * @param {string} eventType
   * @param {string} listenerName
   * @param  {function} listenerFunc
   */
  only(eventType, listenerName, listenerFunc) {

    let listenerMap = this.onlyListeners.get(eventType);

    if (!listenerMap) {
      listenerMap = new EventListenerMap();
      this.onlyListeners.set(eventType, listenerMap);
    }

    listenerMap.putListenerFunc(listenerName, listenerFunc);
  }

  /**
   * Set the emitter that receives the callback of this emitter.
   * When the specified emitter is received a callback, the specified emitter also emits it to its listener.
   *
   * @param eventEmitter
   */
  pipe(eventEmitter) {
    this.childEventEmitters.push(eventEmitter);
  }

  /**
   * Emit data to listeners (callback functions) registered with the "on()" method.
   * @param {string} eventType
   * @param {object} data
   */
  emit(eventType, data) {

    const listenerList = this.onListeners.get(eventType);

    // fire "on" listener
    if (listenerList) {

      // Add "eventType" into data
      data.eventType = eventType;

      listenerList.callListenerFunc(data);
    }

    // fire "only" listener
    const listenerMap = this.onlyListeners.get(eventType);
    if (listenerMap) {
      // Call the listener registered with "only" method

      // Add "eventType" into data
      data.eventType = eventType;
      listenerMap.callListenerFunc(data);
    }

    for (const childEventEmitter of this.childEventEmitters) {
      childEventEmitter.emit(eventType, data);
    }
  }

  /**
   * Returns true if at least one ListenerFunction that receives the event specified by "eventType" is registered
   * @param {string} eventType
   * @returns {boolean}
   */
  hasListenerFuncs(eventType) {

    //  key:eventType,
    //  value:EventListenerList
    if (this.onListeners.has(eventType)) {

      const listenerList = this.onListeners.get(eventType);

      if (listenerList && listenerList.hasListenerFunc()) {
        return true;
      }
    }

    for (const childEventEmitter of this.childEventEmitters) {
      const childEventEmitterHasListenerFuncs = childEventEmitter.hasListenerFuncs(eventType);
      if (childEventEmitterHasListenerFuncs) {
        return true;
      }
    }

    return false;
  }

  /**
   * Clear all related listeners
   */
  clearAll() {

    for (const listenerList of this.onListeners.values()) {
      listenerList.clearAll();
    }
    this.onListeners.clear();


    for (const listenerMap of this.onlyListeners.values()) {
      listenerMap.clearAll();
    }
    this.onlyListeners.clear();


    this.childEventEmitters = [];
  }
}

/**
 * A sequential list containing event listeners(callback functions)
 */
export class EventListenerList {

  constructor() {
    this.listenerFuncs = [];
  }

  clearAll() {
    this.listenerFuncs = [];
  }

  hasListenerFunc() {
    if (this.listenerFuncs.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  addListenerFunc(listenerFunc) {
    this.listenerFuncs.push(listenerFunc);
  }

  callListenerFunc(data) {
    for (const listenerFunc of this.listenerFuncs) {
      if (this.typeOf(listenerFunc) === 'Function') {
        listenerFunc(data);
      } else {
        throw Error(`[@riversun/event-emitter] listenerFunction you set is not a function. listenerFunction:"${listenerFunc}".Check args of #only method or #on method.`);
      }
    }
  }

  removeListener(listenerFunc) {
    this.removeArrayItemOnce(this.listenerFuncs, listenerFunc);
  }

  removeArrayItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

}

/**
 * Map that stores listeners(callback functions) with the specific key
 */
export class EventListenerMap {

  constructor() {
    this.listenerFuncMap = new Map();
  }

  clearAll() {
    this.listenerFuncMap.clear();
  }

  hasListenerFunc(key) {
    return this.listenerFuncMap.has(key);
  }

  putListenerFunc(key, listenerFunc) {
    this.listenerFuncMap.set(key, listenerFunc);
  }

  callListenerFunc(data) {
    for (const listenerFunc of this.listenerFuncMap.values()) {
      if (this.typeOf(listenerFunc) === 'Function') {
        listenerFunc(data);
      } else {
        throw Error(`[@riversun/event-emitter] listenerFunction you set is not a function. listenerFunction:"${listenerFunc}".Check args of #only method or #on method.`);
      }
    }
  }

  typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }
}


