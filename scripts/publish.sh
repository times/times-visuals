#!/bin/bash

# Storybook docs
if ! git diff-index --quiet HEAD --
then
  git add .
  git commit -m "chore(release): publish docs [skip ci]"
fi;

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

MESSAGE=$(printf "chore(release): publish %s [skip ci]")

yarn lerna publish --conventional-commits --yes --concurrency=1 --exact -m "$MESSAGE"

git push