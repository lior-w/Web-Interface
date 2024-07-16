type Callback = (arg: any) => void;

export class EventHandler {
  private static instance: EventHandler;
  private events: { [eventType: string]: Callback[] };

  private constructor() {
    this.events = {};
  }

  static getInstance(): EventHandler {
    if (!EventHandler.instance) {
      EventHandler.instance = new EventHandler();
    }
    return EventHandler.instance;
  }

  subscribe(eventType: string, callback: Callback): void {
    // console.log(eventType);
    if (!this.events[eventType]) {
      this.events[eventType] = [];
    }
    this.events[eventType].push(callback);
  }

  unsubscribe(eventType: string, callback: Callback): void {
    if (!this.events[eventType]) return;

    this.events[eventType] = this.events[eventType].filter(
      (cb) => cb !== callback
    );
  }

  publish(eventType: string, arg: any): void {
    // console.log(!this.events[eventType]);
    // console.log(eventType);
    if (!this.events[eventType]) return;
    // console.log("aaa", this.events);
    // console.log("bbb", arg);
    this.events[eventType].forEach((callback) => callback(arg));
  }
}

export default EventHandler;
