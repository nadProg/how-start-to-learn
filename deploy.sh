#!/usr/bin/env sh

# abort on errors
set -e

# build
gulp build

# navigate into the build output directory
cd build

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:nadprog/nadprog.github.io.git main
# 
# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:nadprog/how-start-to-learn.git main:gh-pages

cd -