import { default as EventEmitter } from '../src/event-emitter';

describe('EventEmitter', () => {

  describe('constructor', () => {

    test('default', () => {
      const eventEmitter = new EventEmitter(['testEvent', 'testEvent2']);
      expect(eventEmitter.hasListenerFuncs('testEvent')).toBe(false);
    });
  });

  describe('emit()/on()', () => {

    test('Set callback func by on() and emit().', () => {

      const eventEmitter = new EventEmitter();

      eventEmitter.on('testEvent', data => {
        expect(data.eventType).toBe('testEvent');
        expect(data.testKey).toBe('testValue');
      });

      eventEmitter.emit('testEvent', { testKey: 'testValue' });
    });


    test('Set multiple callback funcs by on() and emit().', () => {

      const eventEmitter = new EventEmitter();

      let numOfCallbacks = 0;

      const callbackFunc = data => {
        numOfCallbacks++;

      };

      for (let i = 0; i < 10; i++) {
        eventEmitter.on('testEvent', callbackFunc);
      }

      eventEmitter.emit('testEvent', { testKey: 'testValue' });

      expect(numOfCallbacks).toBe(10);
    });


  });

  describe('getAllListeners()', () => {

    test('getAllListeners.', () => {

      const eventEmitter = new EventEmitter();

      const allListeners0 = eventEmitter.getAllListeners();
      expect(allListeners0.testEvent).toBeFalsy();

      eventEmitter.on('testEvent', data => {
        expect(data.eventType).toBe('testEvent');
        expect(data.testKey).toBe('testValue');
      });

      const allListeners = eventEmitter.getAllListeners();
      expect(allListeners.testEvent).toBeTruthy();
      expect(allListeners.testEvent.listeners.length).toBe(1);
      eventEmitter.emit('testEvent', { testKey: 'testValue' });
    });

    test('with child emitters.', () => {

      const parentEmitter = new EventEmitter();
      const childEmitter = new EventEmitter();

      parentEmitter.pipe(childEmitter);

      let numOfCallbacks = 0;

      childEmitter.on('testEvent', data => {
        numOfCallbacks++;
        expect(data.testKey).toBe('testValue');
      });

      parentEmitter.on('testEvent', data => {
        numOfCallbacks++;
        expect(data.testKey).toBe('testValue');
      });
      const allListeners = parentEmitter.getAllListeners();
      // allListeners.testEvent.childEventEmitters should be " [ { childEmitterIdx: 0, listeners: [ [Function (anonymous)] ] } ]"
      expect(allListeners.testEvent).toBeTruthy();
      expect(allListeners.testEvent.childEventEmitters).toBeTruthy();
      expect(allListeners.testEvent.childEventEmitters.length).toBe(1);
      expect(allListeners.testEvent.childEventEmitters[0].listeners).toBeTruthy();
      expect(allListeners.testEvent.childEventEmitters[0].listeners.length).toBe(1);

      parentEmitter.emit('testEvent', { testKey: 'testValue' });

    });
  });

  describe('only()', () => {
    test('Make sure that there is only one callback even if you set several listeners', () => {

      const eventEmitter = new EventEmitter();

      let numOfCallbacks = 0;

      const callbackFunc = data => {
        numOfCallbacks++;
      };

      for (let i = 0; i < 10; i++) {
        eventEmitter.only('testEvent', 'unique-listener', callbackFunc);
      }

      eventEmitter.emit('testEvent', { testKey: 'testValue' });

      expect(numOfCallbacks).toBe(1);
    });
  });


  describe('hasListenerFuncs()', () => {

    test('has listener', () => {
      const parentEmitter = new EventEmitter();
      parentEmitter.on('testEvent', () => {
      });

      expect(parentEmitter.hasListenerFuncs('testEvent')).toBe(true);
    });

    test('has listener on children', () => {
      const parentEmitter = new EventEmitter();
      const childEmitter = new EventEmitter();

      parentEmitter.pipe(childEmitter);
      childEmitter.on('testEvent', () => {
      });
      expect(parentEmitter.hasListenerFuncs('testEvent')).toBe(true);
    });
  });

  describe('removeListener()', () => {
    test('Remove listener', () => {

      const eventEmitter = new EventEmitter();

      const func = data => {
        throw Error('Removed listner called')
      };

      eventEmitter.on('testEvent', func);
      eventEmitter.removeListener('testEvent', func);
      eventEmitter.emit('testEvent', { testKey: 'testValue' });
    });
  });

  describe('pipe()', () => {

    test('Child listener can receive events from parent EventEmitter.', () => {

      const parentEmitter = new EventEmitter();
      const childEmitter = new EventEmitter();

      parentEmitter.pipe(childEmitter);

      let numOfCallbacks = 0;

      childEmitter.on('testEvent', data => {
        numOfCallbacks++;
        expect(data.testKey).toBe('testValue');
      });

      parentEmitter.on('testEvent', data => {
        numOfCallbacks++;
        expect(data.testKey).toBe('testValue');
      });

      for (let i = 0; i < 10; i++) {
        parentEmitter.only('testEvent', 'unique-listener', data => {
          numOfCallbacks++;
          expect(data.testKey).toBe('testValue');
        });
      }


      parentEmitter.emit('testEvent', { testKey: 'testValue' });

      expect(numOfCallbacks).toBe(3);
    });

    test('When a parent does not subscribe to an event name, but a child emitter does subscribe to that event name, make sure that the child emitter you pipe fires correctly', (done) => {

      const parentEmitter = new EventEmitter();
      const childEmitter = new EventEmitter();
      parentEmitter.pipe(childEmitter);
      childEmitter.on('testEvent', (data) => {
        done();
      });
      parentEmitter.emit('testEvent', { message: 'test' });
    });
  });

  describe('clearAll()', () => {

    test('Make sure listeners are definitely gone by clearAll() method', () => {
      const parentEmitter = new EventEmitter();
      const childEmitter = new EventEmitter();

      parentEmitter.pipe(childEmitter);

      let numOfCallbacks = 0;

      childEmitter.on('testEvent', data => {
        numOfCallbacks++;
        expect(data.testKey).toBe('testValue');
      });

      parentEmitter.on('testEvent', data => {
        numOfCallbacks++;
        expect(data.testKey).toBe('testValue');
      });

      for (let i = 0; i < 10; i++) {
        parentEmitter.only('testEvent', 'unique-listener', data => {
          numOfCallbacks++;
          expect(data.testKey).toBe('testValue');
        });
      }

      parentEmitter.emit('testEvent', { testKey: 'testValue' });

      expect(numOfCallbacks).toBe(3);

      parentEmitter.clearAll();

      numOfCallbacks = 0;

      parentEmitter.emit('testEvent', { testKey: 'testValue' });

      expect(numOfCallbacks).toBe(0);


    });

  });//describe

});
