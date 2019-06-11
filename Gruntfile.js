'use strict';
module.exports = function (grunt) {
  require ('load-grunt-tasks') (grunt);
  grunt.initConfig ({
    less: {
      style: {
        files: {
          'build/css/style.css': 'less/style.less'
        }
      }
    }
    , postcss: {
      style: {
        options: {
          processors: [require ('autoprefixer') ()]
        }
        , src: 'build/css/*.css'
      }
    }
    , browserSync: {
      server: {
        bsFiles: {
          src: ['build/*.html', 'build/css/*.css']
        }
        , options: {
          server: 'build/'
          , watchTask: true
          , notify: false
          , open: true
          , cors: true
          , ui: false
        }
      }
    }
    , copy: {
      build: {
        files: [
          {
            expand: true
            , src: [
              'fonts/**/*.{woff,woff2}', 'img/**', 'js/**'
            ]
            , dest: 'build'
          }
        ]
      }
    }
    , clean: {
      build: ['build']
    }
    , watch: {
      html: {
        files: ['*.html']
        , tasks: ['posthtml']
      }
      , style: {
        files: ['less/**/*.less']
        , tasks: ['less', 'postcss', 'csso']
      }
    }
    , csso: {
      style: {
        options: {
          report: 'gzip'
        }
        , files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    }
    , imagemin: {
      images: {
        options: {
          optimizationLevel: 3
          , progressive: true
        }
        , files: [
          {
            expand: true
            , src: ['img/**/*.{png,jpg,svg}']
            , dest: 'build'
          }
        ]
      }
    }
    , cwebp: {
      images: {
        options: {
          q: 90
        }
        , files: [
          {
            expand: true
            , src: ['img/**/*.{png,jpg}']
            , dest: 'build'
          }
        ]
      }
    }
    , svgstore: {
      options: {
        includeTitleElement: false
      }
      , sprite: {
        files: {
          'build/img/sprite.svg': ['img/icon-*.svg']
        }
      }
    }
    , posthtml: {
      options: {
        use: [require ('posthtml-include') ()]
      }
      , build: {
        files: [
          {
            expand: true
            , src: ['*.html']
            , dest: 'build'
          }
        ]
      }
    }
  });
  grunt.registerTask ('serve', ['browserSync', 'watch']);
  grunt.registerTask ('build', ['clean', 'copy', 'less', 'postcss', 'csso', 'svgstore', 'posthtml', 'imagemin', 'cwebp']);
};
