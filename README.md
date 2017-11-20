# n-prune

> Easily pruning unneeded files from `node_modules` or whatever any folder.

Original script written by [gpittarelli](https://gist.github.com/gpittarelli/64d1e9b7c1a4af762ec467b1c7571dc2).

## Use cases:

- Optmize for sizes for production build

## Installation

```
npm install -g node-prune
# n-prune

# or
npm i -D node-prune
./node_modules/.bin/n-prune
```

## Usage
``` sh
# `cd` to project root and issue the following command.
n-prune

# or n-prune specific folder and specific config
n-prune /xx/node_modules -c /xx/.prune.json
```

## customnize
create json config file format like this:(if not specific，this is default)

```js
{
  "files": [
    "Makefile",
    "Gulpfile.js",
    "Gruntfile.js",
    ".tern-project",
    ".gitattributes",
    ".editorconfig",
    ".eslintrc",
    ".jshintrc",
    ".flowconfig",
    ".documentup.json",
    ".yarn-metadata.json",
    ".travis.yml",
    "appveyor.yml",
    "LICENSE.txt",
    "LICENSE",
    "AUTHORS",
    "CONTRIBUTORS",
    ".yarn-integrity",
    "*.md",
    "*.ts",
    "*.jst",
    "*.coffee",
    "!*.d.ts"
  ],
  "folders": [
    "__tests__",
    "test",
    "tests",
    "powered-test",
    "docs",
    "doc",
    "website",
    "images",
    "assets",
    "example",
    "examples",
    "coverage",
    ".nyc_output"
  ]
}
```
ignore pattern starts with `!`


## Output

```
Before: 135M .
After: 112M .
```

## License

MIT
