1. Create new Heroku app
heroku create epic-notes
git remote -v (to see)
2. Setup the buildpack for meteor
heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
3. Setup mongolab db
heroku addons:create mongolab:sandbox
4. Configure ROOT_URL env variable
heroku config:set ROOT_URL=""
5. Set Note version in package.json
6. Commit and deply via (git push)
git push heroku master
