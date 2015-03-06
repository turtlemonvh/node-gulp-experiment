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

    cd node-gulp-test
    sudo npm install --global gulp
    npm install
    grunt build  # fancy async build magic

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
https://github.com/osscafe/gulp-cheatsheet

https://github.com/gulpjs/gulp/blob/master/docs/API.md#deps
- declare task dependencies

https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb
- watching built in

https://www.npmjs.com/package/gulp-sass
- fast sass

## Fixes / TODOs

- Add hash to files to break cache
- Speed up startup (lazy load? : https://github.com/gulpjs/gulp/issues/632)
- Handle html templates for angular


