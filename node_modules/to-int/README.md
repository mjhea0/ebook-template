# to-int [![Build Status](https://travis-ci.org/natecavanaugh/to-int.svg?branch=master)](https://travis-ci.org/natecavanaugh/to-int)

> Parse a number from a string, defaulting to 0 (or any desired default), as well as the ability to pass a custom radix.
> Also exposes a `toFloat` method which calls `parseFloat` instead of `parseInt`.
> These methods are useful when you wish to convert a string to a number, but default to some value (which is often zero, but can be anything).


## Install

```
$ npm install --save to-int
```


## Usage

```js
var toInt = require('to-int');

toInt('10px');
//=> 10

toInt.toFloat('0.5em');
//=> 0.5
```


## API

### toInt(input, [radix, [defaultValue]])

#### input

*Required*
Type: `string|number`

The value you wish to parse for the number

#### radix

Type: `number`
Default: `10`

The radix you wish to pass to parse with.

#### defaultValue

Type: `number`
Default: `0`

If a number can't be parsed, this is what will be returned.

### toInt.toFloat(input, [defaultValue])

#### input

*Required*
Type: `string|number`

The value you wish to parse for the number

#### defaultValue

Type: `number`
Default: `0`

If a number can't be parsed, this is what will be returned.

## License

MIT © [Nate Cavanaugh](http://alterform.com)