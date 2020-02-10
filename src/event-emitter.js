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

    constructor(eventNames) {

        /**
         * key:eventName,
         * value:EventListenerList
         */
        this.onListeners = new Map();

        /**
         * key:eventName
         * value:EventListenerMap
         */
        this.onlyListeners = new Map();


        //prepare listenerLists related to the eventName
        if (eventNames) {
            for (const eventName of eventNames) {
                const listenerList = new EventListenerList();
                this.onListeners.set(eventName, listenerList);
            }
        }

        this.childEventEmitters = [];
    }


    /**
     * Set eventName you want to receive and the listener function to be callbacked from #emit method
     *  (This eventName will never fire unless called with emit)
     *
     * @param eventName
     * @param listenerFunc
     */
    on(eventName, listenerFunc) {

        let listenerList = this.onListeners.get(eventName);

        if (!listenerList) {
            listenerList = new EventListenerList();
            this.onListeners.set(eventName, listenerList);
        }
        listenerList.addListenerFunc(listenerFunc);
    }

    /**
     * Only one listener is registered per "listenerName" even if called multiple times.
     * If the same listenerName is set for listener, the old listener will be removed.
     * @param eventName
     * @param listenerName
     * @param listenerFunc
     */
    only(eventName, listenerName, listenerFunc) {

        let listenerMap = this.onlyListeners.get(eventName);

        if (!listenerMap) {
            listenerMap = new EventListenerMap();
            this.onlyListeners.set(eventName, listenerMap);
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
     * @param eventName
     * @param data
     */
    emit(eventName, data) {

        const listenerList = this.onListeners.get(eventName);

        if (listenerList) {

            //Add "eventName" into data
            data.eventName = eventName;

            listenerList.callListenerFunc(data);
        }

        const listenerMap = this.onlyListeners.get(eventName);
        if (listenerMap) {
            //Call the listener registered with "only" method
            listenerMap.callListenerFunc(data);
        }

        for (const childEventEmitter of this.childEventEmitters) {
            childEventEmitter.emit(eventName, data);
        }
    }

    /**
     * Returns true if at least one ListenerFunction that receives the event specified by "eventName" is registered
     * @param eventName
     * @returns {boolean}
     */
    hasListenerFuncs(eventName) {

        if (this.onListeners.has(eventName)) {

            const listenerList = this.onListeners.get(eventName);

            if (listenerList && listenerList.hasListenerFunc()) {
                return true;
            }

            //const listenerMap = this.onlyListeners.get(eventName);

            for (const childEventEmitter of this.childEventEmitters) {
                const childEventEmitterHasListenerFuncs = childEventEmitter.hasListenerFunc(eventName);
                if (childEventEmitterHasListenerFuncs) {
                    return true;
                }
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
            listenerFunc(data);
        }
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
            listenerFunc(data);
        }
    }

}