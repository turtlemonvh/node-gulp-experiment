/*
 * Configuration
 */
try {
    var _ = require("lodash");
    var buffer = require("vinyl-buffer");
    var concat = require("gulp-concat");
    var file = require("read-file");
    var forEach = require("gulp-foreach");
    var gulp = require("gulp");
    var jshint = require("gulp-jshint");
    var log = require("npmlog");
    var rename = require("gulp-rename");
    var runSequence = require("run-sequence");
    var shell = require("shelljs");
    var size = require("gulp-size");
    var source = require("vinyl-source-stream");
    var sourcemaps = require("gulp-sourcemaps");
    var uglify = require("gulp-uglify");
    var util = require("gulp-util");
    //var browserify = require("browserify");
    //var watchify = require("watchify");
} catch (e) {
    // Unknown error, rethrow it.   
    if (e.code !== "MODULE_NOT_FOUND") {
        throw e;
    }
    
    // Otherwise, we have a missing dependency. If the module is in the dependency list, the user just needs to run `npm install`.  
    // Otherwise, they need to install and save it.  
    var dependencies = require("./package.json").devDependencies;
    var module = e.toString().match(/'(.*?)'/)[1];
    var command = "npm install";
    
    if (typeof dependencies[module] === "undefined") {
        command += " --save-dev " + module;
    }
    
    console.error(e.toString() + ". Fix this by executing:\n\n" + command + "\n");
    process.exit(1);
}


const JS_BASE_DIR = "./applications/client/";
const APPS_SRC_DIR = JS_BASE_DIR + "apps/";
const APPS_DIST_DIR = "./public_html/js/apps/";
const TESTS_GLOB = "./tests/client/**/*.js";
 
const EXTERNAL_LIBS = {
    jquery: "./node_modules/jquery/dist/jquery.min.js",
    bootstrap: "./node_modules/bootstrap/dist/js/bootstrap.min.js"
};
const BROWSERIFY_TRANSFORMS = ["brfs"];
 
const LAST_DEPENDENCY_UPDATE_ID_FILE = ".npmDependenciesLastCommitId";
const AUTO_BUILD_FLAG_FILE = ".autobuild";
 
const SIZE_OPTS = {
    showFiles: true,
    gzip: true
};
const LINT_OPTS = {
    unused: true,
    eqnull: true,
    jquery: true
};
const ALLOW_NPM_MODULE_MANAGEMENT = true;

// Always add JS_BASE_DIR to the NODE_PATH environment variable.  This allows us to include our own modules
// with simple paths (no crazy ../../../../relative/paths) without having to resort to a symlink in node_modules 
// or other transforms that would add time to our build.  For example, from application/client/apps/login/index.js, 
// we can do `require("properties")` instead of `require("../../../properties")`
process.env.NODE_PATH = JS_BASE_DIR + ":" + (process.env.NODE_PATH || "");

// Pretty, pretty log messages.
log.enableColor();

function buildToSingleFile(options) {
    var src_glob = options.src_glob;  // array also allowed
    var tgt_filename = options.tgt_filename;
    var tgt_directory = options.tgt_directory;

    return gulp.src(src_glob)
        // Log each file that will be concatenated into the common.js file.
        .pipe(size(SIZE_OPTS))
        // Concatenate all files.
        .pipe(concat(tgt_filename))
        // Minify the result.
        .pipe(uglify())
        // Log the new file size.
        .pipe(size(SIZE_OPTS))
        // Save that file to the appropriate location.
        .pipe(gulp.dest(tgt_directory));
}

/**
 * Externalize all site-wide libraries into one file.  Since these libraries are all sizable, it would be better for the
 * client to request it individually once and then retreive it from the cache than to include all of these files into
 * each and every browserified application. 
 */
gulp.task("build-common-lib", function() {
    var paths = [];
    
    // Get just the path to each externalizable lib.
    _.forEach(EXTERNAL_LIBS, function(path, name) {
        paths.push(path);
    });
    
    return buildToSingleFile({
        src_glob: paths,
        tgt_filename: "common.min.js",
        tgt_directory: APPS_DIST_DIR + "../lib/"
    })
});

/**
 * Linter for the most basic of quality assurance.
 */
gulp.task("lint", function() {
    return gulp.src(JS_BASE_DIR + "**/*.js")
        .pipe(jshint(LINT_OPTS))
        .pipe(jshint.reporter("default"));
});

/*
 * Task to get the full contents of each app directory and build them into separate files
 */
gulp.task("build-apps", function() {
    // APPS_SRC_DIR
    var fs = require("fs");
    var app_folders = _.filter(fs.readdirSync(APPS_SRC_DIR), function(path) {
        var fullPath = APPS_SRC_DIR + path;
        return fs.lstatSync(fullPath).isDirectory();
    });

    console.log("Building apps: '" + app_folders.join(', ') + "'");

    // FIXME: If we return a stream (or deferred) the task will correctly say it has exited
    //        *after* the code runs, and not before it
    _.forEach(app_folders, function(folder) {
        buildToSingleFile({
            src_glob: APPS_SRC_DIR + folder + "/**/*.js",
            tgt_filename: folder + ".min.js",
            tgt_directory: APPS_DIST_DIR 
        })
    })

})

gulp.task("build", ["build-common-lib", "build-apps"]);


