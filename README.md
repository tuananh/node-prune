# node-prune

> Easily pruning unneeded files from `node_modules`.

Original script written by [gpittarelli](https://gist.github.com/gpittarelli/64d1e9b7c1a4af762ec467b1c7571dc2).

## Use cases:

- Optmize for sizes for aws lambda functions
- You haven't heard of `yarn` and `yarn autoclean`

## Installation

```
npm install -g node-prune
```

Output

```
Before: 135M .
After: 112M .
```

## Usage

`cd` to project root and issue the following command.

``` sh
node-prune
```

## License

MIT