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
        src: '.tmp/concat/bundle.js',
        dest: 'lib/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      options: {
        separator: ';',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dev: {
        src: ['src/*.js'],
        dest: '.tmp/bundle.js'
      },
      dist: {
        src: ['.tmp/babel/*.js'],
        dest: '.tmp/concat/bundle.js'
      }
    },
    watch: {
      files: ['src/*.js'],
      tasks: ['concat', 'babel', 'uglify'],
      express: {
        files: [ '**/*.js' ],
        tasks: [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      dev: {
        files: ['src/*.js'],
        tasks: ['concat']
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: [{
          'expand': true,
          'cwd': 'src/',
          'src': ['*.js'],
          'dest': '.tmp/babel',
          'ext': '.js'
        }]
      }
    },
    clean: ['.tmp']
  })
    // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-clean')
    // 默认任务
  grunt.registerTask('default', ['babel', 'concat:dist', 'uglify', 'clean'])
}
