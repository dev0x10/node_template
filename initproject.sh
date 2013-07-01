#!/bin/sh
echo "Creating necessary folders..."
mkdir ./models
mkdir ./lib

echo "Copying code..."
mv ./templates/app/server.js ./server.js
mv ./templates/app/package.json ./package.json
mv ./templates/app/.gitignore ./.gitignore
mv ./templates/app/config.json ./config.json
mv ./templates/app/Makefile ./Makefile
mv ./templates/test ./test/
mv ./templates/views ./views
mv ./templates/public ./public
# TODO copy over the models

echo "Setting up dependencies from NPM..."
npm install

echo "Removing stuff you don't want..."
rm -rf .git
rm -rf templates
rm README.md
rm initproject.sh
rm initproject.bat

echo "Initializing new git project..."
git init
git add .
git commit -m"Initial Commit"
