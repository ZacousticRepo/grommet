import gulpWebpack from 'webpack-stream';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import minifyCss from 'gulp-cssnano';
import file from 'gulp-file';
import gulpif from 'gulp-if';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import del from 'del';
import runSequence from 'run-sequence';

import { getPackageJSON } from './grommet-toolbox.config';

module.exports = function (gulp)
{
	gulp.task('generate-index-icons', function (done)
    {
        var iconsFolder = path.join(__dirname, './src/img/icons');
        var iconsMap = [];
        fs.readdir(iconsFolder, function (err, icons)
        {
            icons.forEach(function (icon, index)
            {

                if (/\.svg$/.test(icon))
                {
                    const componentName = icon.replace(/^(.)|-([a-z])/g, function (g)
                    {
                        return g.length > 1 ? g[1].toUpperCase() : g.toUpperCase();
                    });

                    iconsMap.push(
                        `export { default as ${componentName.replace('.svg', '').replace(/^3d/, 'ThreeD').replace('-', '')}Icon } from './${componentName.replace('.svg', '')}';`
                    );

                    if (index === icons.length - 1)
                    {

                        const destinationFile = path.join(
                            __dirname, './src/js/components/icons/base/index.js'
                        );
                        fs.writeFile(destinationFile, iconsMap.join('\n'), function (err)
                        {
                            if (err)
                            {
                                throw err;
                            }

                            done();
                        });
                    }
                }
            });
        });
    });

    gulp.task('dist-css', () =>
    {
        gulp.src('src/scss/hpinc/*.scss')
            .pipe(sass({
                includePaths: [path.resolve(__dirname, './node_modules')]
            }))
            .pipe(rename('grommet-hpinc.min.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/'));

        gulp.src('src/scss/hpe/*.scss')
            .pipe(sass({
                includePaths: [path.resolve(__dirname, './node_modules')]
            }))
            .pipe(rename('grommet-hpe.min.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/'));

        gulp.src('src/scss/aruba/*.scss')
            .pipe(sass({
                includePaths: [path.resolve(__dirname, './node_modules')]
            }))
            .pipe(rename('grommet-aruba.min.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/'));

        return gulp.src('src/scss/vanilla/*.scss')
            .pipe(sass({
                includePaths: [path.resolve(__dirname, './node_modules')]
            }))
            .pipe(rename('grommet.min.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/'));
    });
};
