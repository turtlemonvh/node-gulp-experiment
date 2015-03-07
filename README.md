# Node Gulp Test

*This is a work in progress*

A basic structure for a **MULTI** page application with gulp.

Using node just because it will already be installed.

Using docker (eventually) because it makes dependencies more apparent.  Ta-da.

The goal is to have

- node / express
- home page, login page, app page
- login page uses http basic auth
- assets (js,css) are built into bundles
- manually include bundles on each page
- live reload pages when assets change (rewrite name of css files)


## Use

To set up

    cd node-gulp-test
    sudo npm install --global gulp
    npm install

    # Build and launch server
    gulp 


You should be able to hit the following in your browser without any 404s, and with templates filled in.

- http://localhost:3000/
- http://localhost:3000/app
- http://localhost:3000/login


## About

Based off 

- Article: http://thanpol.as/grunt/Managing-large-scale-projects-with-Grunt/
- Github: https://github.com/booleangate/getting-started-with-gulp-and-browserify

Notes

- add config files to separate directories
     - example: https://github.com/cowboy/wesbos/tree/master/grunt
- build each chunk (e.g., common apps) separately
- write a few top level tasks that run multiple tasks
- watching css and rebuilding


http://blog.overzealous.com/post/74121048393/why-you-shouldnt-create-a-gulp-plugin-or-how-to
- live-reload example


## More about gulp

http://gulpjs.com/
https://github.com/osscafe/gulp-cheatsheet
https://github.com/gulpjs/gulp/blob/master/docs/API.md

https://github.com/gulpjs/gulp/blob/master/docs/API.md#deps
- declare task dependencies

https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb
- watching built in

https://www.npmjs.com/package/gulp-sass
- fast sass

https://www.npmjs.com/package/gulp-nodemon
https://www.npmjs.com/package/gulp-express
- serve express so that it gets reloaded whenever code changes

http://expressjs.com/starter/hello-world.html
http://expressjs.com/starter/basic-routing.html
http://expressjs.com/4x/api.html
https://github.com/strongloop/express/wiki/Migrating-from-3.x-to-4.x
- express

## Fixes / TODOs

- Add hash to files to break cache
- Speed up startup (lazy load? : https://github.com/gulpjs/gulp/issues/632)
- Handle html templates for angular


