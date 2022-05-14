class Observable {
  observers = [];

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }
  publish(data) {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}

export default Observable;
