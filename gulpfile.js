const gulp=require('gulp');

const sass=require('gulp-sass');
const cssnano=require('gulp-cssnano');
const rev=require('gulp-rev');
const uglify=require('gulp-uglify-es').default;
const imagemin=require('gulp-imagemin');
const del=require('del');

gulp.task('css',function(done){
    console.log("Minifying CSS");
    gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'))

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js',function(done){
    console.log("Minifying JS");
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'))
    done();
});

gulp.task('img',function(done){
    gulp.src('./assets/**/*.+(png|jpg|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();    
})

gulp.task('clearAssets',function(done){
    del.sync('./public/assets');
    done();
})
gulp.task('build',gulp.series('clearAssets','css','js','img'),function(done){
    done();
})






