#!/usr/bin/env bash
# Port of https://github.com/tj/node-prune to bash
#
# Prunes common files that are unnecessarily published in npm packages
# when people don't configure `.npmignore` or package.json's `files`

echo "Before: "$(du -hs .)

# Common unneeded files
find . -type d -name node_modules -prune -exec find {} -type f \( \
    -name Makefile -or \
    -name Gulpfile.js -or \
    -name Gruntfile.js -or \
    -name .tern-project -or \
    -name .gitattributes -or \
    -name .editorconfig -or \
    -name .eslintrc -or \
    -name .jshintrc -or \
    -name .flowconfig -or \
    -name .documentup.json -or \
    -name .yarn-metadata.json -or \
    -name .travis.yml -or \
    -name appveyor.yml -or \
    -name LICENSE.txt -or \
    -name LICENSE -or \
    -name AUTHORS -or \
    -name CONTRIBUTORS -or \
    -name .yarn-integrity -or \
    -name "*.md" -or \
    \( -name '*.ts' -and \! -name '*.d.ts' \) -or \
    -name "*.jst" -or \
    -name "*.coffee" \
  \) -print0 \; | xargs -0 rm -rf

# Common unneeded directories
find ./ttt -type d -name node_modules -prune -exec find {} -type d \( \
    -name __tests__ -or \
    -name test -or \
    -name tests -or \
    -name powered-test -or \
    -name docs -or \
    -name doc -or \
    -name website -or \
    -name images -or \
    -name assets -or \
    -name example -or \
    -name examples -or \
    -name 'images' -or \
    ! -path '*ttt/images' -or \
    -name .nyc_output \
  \) -print0 \; | xargs -0 rm -rf


echo "After: "$(du -hs .)