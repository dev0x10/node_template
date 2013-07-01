REM @echo off
echo "Creating necessary folders..."
mkdir .\models
mkdir .\lib

echo "moveing code..."
move .\templates\app\server.js .\server.js
move .\templates\app\package.json .\package.json
move .\templates\app\.gitignore .\.gitignore
move .\templates\app\config.json .\config.json
move .\templates\app\Makefile .\Makefile
move .\templates\test .\test
move .\templates\views .\views
move .\templates\public .\public
REM TODO move over the models

echo "Setting up dependencies from NPM..."
npm install

echo "Removing stuff you don't want..."
del /S /F .git
del /S /F templates
del README.md
del initproject.sh
del initproject.bat

echo "Initializing new git project..."
git init
git add .
git commit -m"Initial Commit"
