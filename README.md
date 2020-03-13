# node-prune

> Easily pruning unneeded files from `node_modules`.

[![npm](https://img.shields.io/npm/v/node-prune.svg?style=flat-square)](https://npm.im/node-prune)

Original script written by [gpittarelli](https://gist.github.com/gpittarelli/64d1e9b7c1a4af762ec467b1c7571dc2) and [neophob](https://gist.github.com/neophob/0c8cfdd460b8332002e7ba74aa1e9ffd).

## Use cases:

- Optmize for sizes for aws lambda functions
- You haven't heard of `yarn` and `yarn autoclean`

## Docker

`cd` to project root and issue the following command.

```
docker run --rm -v ${PWD}:/app hochzehn/node-prune
```

## Installation

```
npm install -g node-prune
```

## Usage

`cd` to project root and issue the following command.

``` sh
node-prune
```


``` sh
node-prune [path/to/prune]
```
> This path is relative to the current working directory.

Output

```
 | Before: 135M (3653 files)
 | After: 112M (3102 files)
```

## License

MIT
