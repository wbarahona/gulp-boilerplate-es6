//
// All routes for assets will go here
// ---------------------------------------------------------------------------------------------
module.exports = {
        dev: {
            scripts: './app/client/src/assets/scripts',
            fonts: './app/client/src/assets/fonts/**/*',
            images: './app/client/src/assets/img/**/*',
            styles: './app/client/src/assets/sass',
            hbs: {
                    root: './app/client/src/assets/templates',
                    partials: './app/client/src/assets/templates/partials'
                },
            root: './app/client/src'
        },
        dist: {
            scripts: './dist/assets/scripts',
            fonts: './dist/assets/fonts',
            images: './dist/assets/img',
            styles: './dist/assets/css',
            root: './dist'
        }
    };
