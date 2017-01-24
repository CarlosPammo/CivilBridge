module.exports = function (grunt) {
	'use strict';
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		metadata: {
			majorVersion: process.env.MAJOR_VERSION || '1',
			minorVersion: process.env.MINOR_VERSION || '0',
			buildNumber: process.env.BUILD_NUMBER || '1',
			productVersion: require('util').format('%s.%s.%s', '<%= metadata.majorVersion %>', '<%= metadata.minorVersion %>', '<%= metadata.buildNumber %>'),
			productName: process.env.PRODUCT_NAME || 'VIPRE Business Web Console',
			outputName: process.env.OUTPUT_NAME || 'Concreter_<%= metadata.productVersion %>'
		},
		banner: '/* <%= pkg.name %> - v<%= pkg.version %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n',
		uglify: {
			target: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					"js/<%= pkg.name %>.min.js": ["js/**/*.js"]
				}
			},
			replica: {
				options: {
					banner: '<%= banner %>'
				},
				files: [{
					expand: true,
					cwd: 'js',
					src: '**/*.js',
					dest: 'js.min'
				}]
			}
		},	
		msbuild: {
			debug: {
				src: ['Concreter.csproj'],
				options: {
					projectConfiguration: 'Debug',
					targets: ['Clean', 'Rebuild'],
					maxCpuCount: 4,
					buildParameters: {
						WarningLevel: 4,
						EnableNuGetPackageRestore: true
					},
					verbosity: 'normal'
				}
			},
			clean: {
				src: ['Concreter.csproj'],
				options: {
					targets: ['Clean'],
					verbosity: 'normal'
				}
			},
			release: {
				src: ['Concreter.csproj'],
				options: {
					projectConfiguration: 'Release',
					targets: ['Clean', 'Rebuild'],
					maxCpuCount: 4,
					buildParameters: {
						WarningLevel: 4,
						EnableNuGetPackageRestore: true
					},
					verbosity: 'normal'
				}
			},
			compile: {
				src: ['Concreter.csproj'],
				options: {
					projectConfiguration: 'debug',
					targets: ['build'],
					maxCpuCount: 4,
					buildParameters: {
						WarningLevel: 4,
						EnableNuGetPackageRestore: true
					},
					verbosity: 'normal'
				}
			}
		},
		shell: {
			physicalPath: {
				command: 'appcmd set site /site.name:Concreter/application[path=\'/\'].virtualDirectory[path=\'/\'].physicalPath:"' +
				require('path').resolve('.') + '" /apphostconfig:"' + require('path').resolve('.\\..\\.vs\\config\\applicationhost.config') + '"'
			}
		}
	});

	grunt.loadNpmTasks('grunt-resx2json-2');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-msbuild');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-downloadfile');

	grunt.registerTask('js_replica_min', ['uglify:replica']);
	grunt.registerTask('js_min', ['uglify:target']);
	grunt.registerTask('css_min', ['cssmin']);
	grunt.registerTask('html_min', ['htmlmin:dist']);
	grunt.registerTask('min', ['js_min', 'css_min', 'html_min']);
	grunt.registerTask('i18n', ['resx2json:i18n']);
	grunt.registerTask('release', ['msbuild:release']);
	grunt.registerTask('debug', ['msbuild:debug']);
	grunt.registerTask('clean', ['msbuild:clean']);
	grunt.registerTask('compile', ['msbuild:compile']);
	grunt.registerTask('installer', ['msbuild:installer_x86', 'msbuild:installer_x64']);
	grunt.registerTask('build', ['css_min', 'js_min', 'html_min', 'i18n', 'msbuild:release', 'installer']);
	grunt.registerTask('iis', ['shell:physicalPath', 'shell:iisexpress']);
	grunt.registerTask('build_iis', ['debug', 'iis']);
	grunt.registerTask('download_dotNetFx45', ['downloadfile:dotNetFx45']);
	grunt.registerTask('download', ['downloadfile:fontSourceSansPro']);
	grunt.registerTask('default', ['build']);
};