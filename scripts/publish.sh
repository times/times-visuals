#!/bin/bash

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

MESSAGE=$(printf "chore(release): publish %s [skip ci]")

yarn lerna publish --conventional-commits --yes --concurrency=1 --exact -m "$MESSAGE"
