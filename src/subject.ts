'use strict';

import {IListener, ISubject, ISubscriber} from "./interfaces";

export class Subject implements ISubject {

    private iterator: number = 1;
    private listeners: Array<IListener> = [];
    private history: Array<any> = [];
    private last: any = null;

    constructor(private defaultValue?: any) {
        if (defaultValue) {
            this.last = defaultValue;
        }
    }

    public getLast(): any {
        return this.last;
    }

    public next(data?: any): ISubject {
        this.last = data;
        this.history.push(data);
        this.listeners.forEach((listener: IListener) => listener.callback(data));
        return this;
    }

    public nextUnique(data?: any): ISubject {
        if (!this.last || this.last !== data) {
            this.next(data);
        }
        return this;
    }

    public subscribe(callback: Function): ISubscriber {
        return this.addToListeners(callback);
    }

    public replayAndSubscribe(callback: Function): ISubscriber {
        let subscriber = this.addToListeners(callback);
        this.history.forEach((data?: any) => {
            callback(data);
        });
        return subscriber;
    }

    private addToListeners(callback): ISubscriber {
        this.listeners.push({
            _id: ++this.iterator,
            callback: callback
        });

        return (function (self) {
            return <ISubscriber>{
                unsubscribe: () => {
                    self.removeListener(self.iterator);
                }
            };
        })(this);
    }

    private removeListener(id: number) {
        for (let i = this.listeners.length - 1; i >= 0; --i) {
            if (this.listeners[i]._id === id) {
                this.listeners.splice(i, 1);
            }
        }
    }

}