#!/usr/bin/env bash
# Build the site and publish it to the gh-pages branch.
#
# Used because the current GitHub token lacks the `workflow` scope, so the
# Actions workflow in deploy/github-pages-workflow.yml cannot be pushed. Once
# that scope is granted, that workflow replaces this script and deploys happen
# automatically on every push to main.
set -euo pipefail

REPO_URL="$(git config --get remote.origin.url)"
SHA="$(git rev-parse --short HEAD)"
WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

echo "==> Building with VITE_BASE=/airjoy/"
VITE_BASE=/airjoy/ npm run build

# Pages has no server-side rewrites, so a deep link like /airjoy/site would 404.
# Pages serves 404.html for unknown paths; making it a copy of index.html boots
# the app and lets the router resolve the real route.
cp dist/index.html dist/404.html
touch dist/.nojekyll

echo "==> Publishing to gh-pages"
cp -r dist/. "$WORKDIR/"
cd "$WORKDIR"
git init -q
git symbolic-ref HEAD refs/heads/gh-pages
git add -A
git commit -q -m "Deploy AirJoy to GitHub Pages (source $SHA)"
git remote add origin "$REPO_URL"
git push -q --force origin gh-pages

echo "==> Done: https://tiao1314.github.io/airjoy/"
echo "    Pages may take a minute to serve the new build."
