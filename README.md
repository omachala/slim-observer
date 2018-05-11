# slim-observer

Javascript (typescript) implementation of observer pattern on less then 100 rows.
It provides just o few most common functions and minified version is smaller then 2kB.

![Travis](https://img.shields.io/travis/omachala/slim-observer.svg)
![Coveralls github](https://img.shields.io/coveralls/github/omachala/slim-observer.svg)
![GitHub package version](https://img.shields.io/github/package-json/v/omachala/slim-observer.svg)

## Usage 

Basic usage
```js
// create observable subject
var observable = new Subject();

// create first listener
observable.subscribe(function(newValue){
    alert(newValue);
});

// create second listener
observable.subscribe(function(newValue){
    console.log(newValue);
});

observable.next('hello'); // emit value to all listeners
observable.next('world'); // emit another value
```

Get last emitted value
```js
observable.getLast();
```

Create subject with initial value
```js
var observable = new Subject('initial value');
```

New subscriber with all history values replay.
```js
observable.replayAndSubscribe(function(newValue){
    console.log(newValue);
});
```

Unsubscribe existing listener.
 ```js
var observable = new Subject();

var subscriber = observable.subscribe(function(newValue){
    alert(newValue);
});

subscriber.unsubscribe();
```

Emitting only unique values (if new value is different).
```js
observable.nextUnique(123).nextUnique(123); // emits value to subscribers only once
```

## Building tools

### Build
Transpile TS code to JS in `dist/` folder. Maps included.
```
npm run build
```

### Unit Test
Tests framework used are: mocha & chai.
```
npm test
```

Testing with coverage:
```
nyc npm test
```

## License
This project seed is licensed as Public Domain. Therefore, do whatever you want including changing the license for your needs in your project.
More specifically, it was licensed as CC0 (Creative Commons 0) to further improve the freedom of a Public Domain Licence in context where it is not applicable.