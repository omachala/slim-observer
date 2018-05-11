'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Subject = (function () {
    function Subject(defaultValue) {
        this.defaultValue = defaultValue;
        this.iterator = 1;
        this.listeners = [];
        this.history = [];
        this.last = null;
        if (defaultValue) {
            this.last = defaultValue;
        }
    }
    Subject.prototype.getLast = function () {
        return this.last;
    };
    Subject.prototype.next = function (data) {
        this.last = data;
        this.history.push(data);
        this.listeners.forEach(function (listener) { return listener.callback(data); });
        return this;
    };
    Subject.prototype.nextUnique = function (data) {
        if (!this.last || this.last !== data) {
            this.next(data);
        }
        return this;
    };
    Subject.prototype.subscribe = function (callback) {
        return this.addToListeners(callback);
    };
    Subject.prototype.replayAndSubscribe = function (callback) {
        var subscriber = this.addToListeners(callback);
        this.history.forEach(function (data) {
            callback(data);
        });
        return subscriber;
    };
    Subject.prototype.addToListeners = function (callback) {
        this.listeners.push({
            _id: ++this.iterator,
            callback: callback
        });
        return (function (self) {
            return {
                unsubscribe: function () {
                    self.removeListener(self.iterator);
                }
            };
        })(this);
    };
    Subject.prototype.removeListener = function (id) {
        for (var i = this.listeners.length - 1; i >= 0; --i) {
            if (this.listeners[i]._id === id) {
                this.listeners.splice(i, 1);
            }
        }
    };
    return Subject;
}());
exports.Subject = Subject;
//# sourceMappingURL=subject.js.map