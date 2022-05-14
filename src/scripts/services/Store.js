import Observable from './Observable';
class Store extends Observable {
  constructor(defaultState = {}) {
    super();
    this.state = defaultState;
  }

  setState(key, data) {
    Object.defineProperty(this.state, key, {
      value: data,
      configurable: true,
    });
    this.publish(this.state);
  }

  getState() {
    return this.state;
  }
}

export const store = new Store();
