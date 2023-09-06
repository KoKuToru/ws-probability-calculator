git branch -D gh-pages
set -e
git checkout --orphan gh-pages
cd src
yarn
yarn build --output-path ../docs
cd ..
git rm -rf --cached .
git add docs
git add README.md
git commit -m 'gh-pages publish'
git push --force origin gh-pages
rm -r docs
git checkout --force master
