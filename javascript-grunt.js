// Grunt
// Example file that compiles Ember.js Application and syncs assets to Amazon S3

module.exports = function(grunt) {
  grunt.initConfig({
    env: grunt.file.readJSON('.env'),
    aws_s3: {
      options: {
        accessKeyId: '<%= env.AWS_ACCESS_KEY_ID %>',
        secretAccessKey: '<%= env.AWS_SECRET_ACCESS_KEY %>',
        uploadConcurrency: 5,
        downloadConcurrency: 5
      },
      development: {
        options: {
          bucket: '<%= env.AWS_BUCKET %>',
          differential: true
        },
        files: [
          {expand: true, cwd: 'dist/assets/', src: ['**'], dest: 'assets'},
          {expand: true, cwd: 'dist/resources/', src: ['**'], dest: 'resources'},
          {expand: true, cwd: 'dist/', src: ['incl.*'], dest: ''},
          {dest: '/', cwd: 'dist/', exclude: 'promote/**/*', action: 'delete'}
        ]
      },
      staging: {
        options: {
          bucket: '<%= env.AWS_BUCKET %>',
          differential: true
        },
        files: [
          {expand: true, cwd: 'dist/assets/', src: ['**'], dest: 'promote/assets'},
          {expand: true, cwd: 'dist/resources/', src: ['**'], dest: 'promote/resources'},
          {expand: true, cwd: 'dist/', src: ['incl.*'], dest: 'promote'},
          {dest: 'promote/', cwd: 'dist/', action: 'delete'}
        ]
      }
    },
    shell: {
      development: {
        command: 'ember build --environment=development'
      },
      staging: {
        command: 'ember build --environment=staging'
      }
    }
  });

  //npm tasks
  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-shell');

  //register tasks
  grunt.registerTask('development', ['gitinfo', 'shell:development', 'aws_s3:development']);
  grunt.registerTask('staging', ['gitinfo', 'shell:staging', 'aws_s3:staging']);
};
