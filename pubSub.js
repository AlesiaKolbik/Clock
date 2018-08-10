export class PubSubService {
    constructor() {
        this.events = {};
    }

    sub(/*string*/ eventName, /*Function*/ listener) {
        if (typeof listener !== 'function')
            throw "Only functions can be listeners";

        const listeners = this.events[eventName] || [];
        listeners.push(listener);
        this.events[eventName] = listeners;
    }

    pub(/*string*/ eventName, args) {
        const listeners = this.events[eventName] || [];
        for (const listener of listeners) {
            listener(args);
        }
    }

    has(/*string*/ eventName) {
        const listeners = this.events[eventName] || [];
        return !!listeners.length;
    }

    drop(/*string*/ eventName, /*Function*/ listener) {
        const listeners = this.events[eventName] || [];
        const index = listeners.indexOf(listener);
        if (index > -1) {
            this.events[eventName] = listeners.splice(index, 1);
        }
    }
}