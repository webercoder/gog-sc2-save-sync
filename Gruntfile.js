module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cfg: grunt.file.readJSON('config.json'),
		watch: {
			"sc2saves": {
				files: "<%= cfg.mapsDir %>/**/*",
				tasks: ['rsync', 'gitadd', 'gitcommit']
			}
		},
		rsync: {
			"sc2saves": {
				options: {
					args: ["--verbose"],
					recursive: true,
					src: "<%= cfg.mapsDir %>/",
					dest: "./saves"
				}
			}
		},
		gitadd: {
			"sc2saves": {
				files: [{src: ["./saves/**/*"]}]
			}
		},
		gitcommit: {
			"sc2saves": {
				options: {
					cwd: "./",
					message: "Saving games."
				},
				files: [{src: ["./saves/**/*"]}]
			}
		}
	});
	grunt.loadNpmTasks('grunt-simple-watch');
	grunt.loadNpmTasks('grunt-rsync');
	grunt.loadNpmTasks('grunt-git');
	grunt.registerTask('default', ['simple-watch']);
};
