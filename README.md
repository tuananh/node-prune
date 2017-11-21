# n-prune

[![Build Status](https://travis-ci.org/zxdong262/n-prune.svg?branch=master)](https://travis-ci.org/zxdong262/n-prune)

> Easily pruning unneeded files from `node_modules` or any folder.

Original script written by [gpittarelli](https://gist.github.com/gpittarelli/64d1e9b7c1a4af762ec467b1c7571dc2).

## Use cases:

- Optmize for sizes for production build (do not support windows)

## Installation

```
npm install -g node-prune
# n-prune

# or
npm i -D node-prune
./node_modules/.bin/n-prune
```

## Usage
```

  Usage: n-prune [dir]

  prune unwanted files and folders, default target is ./node_modules


  Options:

    -V, --version  output the version number
    -c, --config   sepcific config file, visit https://github.com/zxdong262/n-prune for config file detail
    -h, --help     output usage information
```

``` sh
# `cd` to project root and issue the following command.
n-prune

# or n-prune specific folder and specific config
n-prune /xx/node_modules -c /xx/prune.json
```

## customnize
create json config file format like this:

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
    "*.coffee"
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
  ],
  "ignores": [
    "save1/images",
    "save2/images",
    "*.d.ts",
    "*.x.ts"
  ]
}
```


## Output

```
prune folder: /home/zxd/dev/n-prune/test/temp/p3/node_modules
before prune:
76K     .
after prune:
60K     .
```

## License

MIT
