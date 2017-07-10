module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)
    // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>  created by alex  at <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '.tmp/app.js',
        dest: 'dest/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      options: {
        separator: ';',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dev: {
        src: ['lib/*.js'],
        dest: '.tmp/bundle.js'
      },
      dist: {
        src: ['lib/core.js'],
        dest: '.tmp/bundle.js'
      }
    },
    jshint: {
      files: ['lib/**.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['lib/*.js'],
      tasks: ['concat', 'babel', 'uglify'],
      express: {
        files: [ '**/*.js' ],
        tasks: [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      dev: {
        files: ['lib/*.js'],
        tasks: ['concat']
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          '.tmp/app.js': '.tmp/bundle.js'
        }
      }
    },
    clean: ['.tmp'],
    express: {
      options: {
        port: 8080
      },
      dev: {
        options: {
          script: 'path/server.js'
        }
      }
    }
  })
    // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-express-server')
    // 默认任务
  grunt.registerTask('default', ['concat:dist', 'babel', 'clean', 'uglify'])
  grunt.registerTask('develop', ['concat:dev', 'watch:dev'])
  grunt.registerTask('dev', ['express', 'watch'])
  grunt.registerTask('server', [ 'express:dev', 'watch' ])
  grunt.registerTask('dep', ['concat:dep'])
}
