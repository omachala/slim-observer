# slim-observer

Javascript (typescript) implementation of observer pattern on less then 100 rows.
It provides just o few most common functions and minified version is smaller then 2kB.

## Building tools

### Lint
Linting using tslint.

```
npm run lint
```

### Clean
Clear the `dist/` folder.

```
npm run clean
```

### Build
Transpile TS code to JS in `dist/` folder. Maps included.

```
npm run build
```

Continous build:

```
npm run build:w
```

### Uglify
Concat and minify all JS files in `dist/` folder to one output (default `dist/all.min.js`).

```
npm run uglify
```

### Unit Test
Tests framework used are: mocha & chai.

TDD mode to run it concurrently with your editions:

```
npm run test:tdd
```

CI mode to run it only one:

```
npm test
```

Testing with coverage:

```
nyc npm test
nyc report -r text lcov html
coverage/index.html
```


### Coverage Test
TDD mode to run it concurrently with your editions:

```
npm run test:tdd
```

CI mode to run it only one:

```
npm run test
```

## License
This project seed is licensed as Public Domain. Therefore, do whatever you want including changing the license for your needs in your project.
More specifically, it was licensed as CC0 (Creative Commons 0) to further improve the freedom of a Public Domain Licence in context where it is not applicable.