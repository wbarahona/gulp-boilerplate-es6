//
// Gulpfile.js
// Recipe by Willmer Barahona
// -----------------------------------------------------------------------
	// task related
	import gulp from 'gulp';
	import rename from 'gulp-rename';
	import notify from 'gulp-notify';
	import { argv } from 'yargs';
	import prettyTime from 'pretty-hrtime';

	// front end server related
	import connect from 'gulp-connect';

	// view/html/templating related
	import handlebars from 'gulp-compile-handlebars';

	// application configurations
	import paths from './app/client/conf/paths.conf';
	import web from './app/client/conf/web.conf';
	import helpers from './app/client/conf/helpers.conf';

//
// Internals
// -----------------------------------------------------------------------
	const internals 		= {
								web: web,
								paths: paths,
								hbs: {
									helpers: helpers
								}
							};
	internals.hbs.options 	= {
								ignorePartials: true,
								batch : [internals.paths.dev.hbs.partials],
								helpers : internals.hbs.helpers
							};

//
// Notify when task has done
// -----------------------------------------------------------------------
	gulp.on('task_stop', function(e) {

		var quiet = (argv.quiet) ? true : false;

		if (!quiet) {

			var time = prettyTime(e.hrDuration);
			gulp.src('').pipe(notify({
				title: "Finished: "+ e.task.toUpperCase(),
				message: "after " + time
			}));
		}
	});

//
// Connect task
// -----------------------------------------------------------------------
	gulp.task('connect', () => {

		connect.server({
			root: internals.paths.dist.root,
			port: 8000,
			livereload: true
		});
	});


//
// Process templates
// -----------------------------------------------------------------------
	gulp.task('templates', () => {

		return gulp.src([internals.paths.dev.hbs.root+'/**/*.hbs', '!'+internals.paths.dev.hbs.partials+'/**/*.hbs'])
				   .pipe(handlebars(internals.web, internals.hbs.options))
				   .pipe(rename(function(path) {
				   		path.extname = '.html';
				   }))
				   .pipe(gulp.dest(paths.dist.root))
				   .pipe(connect.reload());
	});

//
// Watch changes
// -----------------------------------------------------------------------
    gulp.task('watch', () => {

        gulp.watch([internals.paths.dev.hbs.root+'/**/*.hbs'], ['templates']);
    });

//
// Default Task
// -----------------------------------------------------------------------
	gulp.task('default', ['connect', 'templates', 'watch']);
