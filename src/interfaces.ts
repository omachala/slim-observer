'use strict';

export interface ISubscriber {
    unsubscribe();
}

export interface IListener {
    _id: any;

    callback(data?: any);
}

export interface ISubject {
    getLast(): any;

    next(data?: any): ISubject;

    nextUnique(data?: any): ISubject;

    subscribe(callback: Function): ISubscriber;

    replayAndSubscribe(callback: Function): ISubscriber;
}