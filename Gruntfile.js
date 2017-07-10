module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)
    // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: false,
        presets: ['es2016'],
        plugins: [
          'transform-export-extensions',
          'babel-plugin-add-module-exports',
          'transform-es2015-modules-commonjs'
        ]
      },
      dist: {
        files: [{
          'expand': true,
          'cwd': 'src/',
          'src': ['*.js'],
          'dest': 'lib',
          'ext': '.js'
        }]
      }
    },
    clean: ['lib']
  })

  grunt.loadNpmTasks('grunt-contrib-clean')
    // 默认任务
  grunt.registerTask('default', ['clean', 'babel'])
}
