const gulp = require('gulp')

const config = require('./config')

const htmlmin = require('gulp-htmlmin')

const connect = require('gulp-connect')

const concat = require('gulp-concat')

const minifycss = require('gulp-minify-css')

const autoprefixer = require('gulp-autoprefixer')

const rename = require('gulp-rename')

const merge = require('merge-stream')

const webpack = require('webpack-stream')

const inject = require('gulp-inject')

const sass = require('gulp-sass')

//处理html 将src中的html文件输出到dist中去
gulp.task('handle:html',function(){
    return gulp.src('./src/views/*/*.html')
       // .pipe(htmlmin(config.htmloptions))
        .pipe(gulp.dest('./dist'))
})

//创建热更新服务器
gulp.task('server',function(){
    return connect.server(config.serveroptions)
})

//让服务器刷新
gulp.task('reload',function(){
   return gulp.src("./dist/**/*.html")
        .pipe(connect.reload())
})

//处理css
gulp.task('handle:css',function(){
    let streams = [];
    for( const page in config.cssoptions ){
        for( const file in config.cssoptions[page] ){
         let stream =   gulp.src(config.cssoptions[page][file])
                .pipe(sass( {outputStyle : 'compressed' } ))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
                    cascade: false, //是否美化属性值 默认：true 像这样：
                    //-webkit-transform: rotate(45deg);
                    //        transform: rotate(45deg);
                    remove:true //是否去掉不必要的前缀 默认：true 
                }))
                .pipe(concat(file +'.css'))
               // .pipe(minifycss()) //压缩
                .pipe( rename({suffix:'.min' }))
                .pipe(gulp.dest('./dist/' +page +'/css'))
            
            streams.push(stream)
        }
    }
    return merge(...streams)

})

//处理js  es6 -> es5  压缩 合并
gulp.task('handle:js',function(){
// return gulp.src('src/entry.js')
//         .pipe(webpack({
//             mode:'production',//设置打包模式： none development  production(会压缩代码)
//             //单入口  单出口
//             // entry : './src/views/index/javascripts/index.js',
//             // output : {
//             //     filename : 'index.js'
//             // }

//             //多入口 单出口 谁在前面，打包的时候也在前面
//             // entry : ['./src/views/index/javascripts/index.js','./src/views/index/javascripts/vendor.js'],
//             //  output : {
//             //      filename : 'index.js'
//             //  }

//             //多入口  多出口
//             entry : {
//                  index :   './src/views/index/javascripts/index.js',
//                  vendor:   './src/views/index/javascripts/vendor.js'
//             },
//             output : {
//                 filename : '[name].min.js'//[name]代表entry中键名是什么，打包出来的就是什么
//               }
//         }))
//         .pipe(gulp.dest('./dist/index/js'))

            let streams = []
            for( const page in config.jsoptions ){
                let entry = config.jsoptions[page]
                let filename = Array.isArray(entry) || ((typeof entry) === 'string') ? page : '[name]'
                let stream = gulp.src('src/entry.js')
                .pipe(webpack({
                    mode : 'production',
                    entry : entry,
                    output : { filename : filename + '.min.js' },
                    module : {
                        rules : [//webpack中在这里使用各种loader对代码进行各种编译
                            {
                                test : /\.js$/, //对js文件进行处理
                                loader : 'babel-loader',//使用babel-loader对其进行处理
                                query : {
                                    presets : ['es2015'] // 将es6编译一下
                                }
                            }
                        ]
                    }
                }))
                .pipe(gulp.dest('./dist/' + page + '/js'))
            streams.push(stream)
            }
            return merge( ...streams )
})

//专门给各个页面的html文件添加对应的依赖
gulp.task('inject', function () {
    setTimeout(() =>{
        config.pages.forEach(page => {
            var target = gulp.src('./dist/'+page+'/'+page+'.html');
            // It's not necessary to read the files (will speed up things), we're only after their paths:
            var sources = gulp.src(['./dist/'+page+'/js/*.js', './dist/'+page+'/css/*.css'], {read: false});
           
             target.pipe(inject(sources, {ignorePath : '/dist'}))
              .pipe(gulp.dest('./dist/'+page+''));
        })
    },1200);
   
  });

//监听函数
gulp.task('watch',function(){
    gulp.watch('./src/views/*/*.html',['handle:html', 'inject' ,'reload'])
    gulp.watch('./src/**/*.scss',['handle:css', 'inject' , 'reload'])
    gulp.watch('./src/**/*.js',['handle:js', 'inject' ,'reload'])
})


//默认任务
gulp.task('default',['server','handle:html', 'handle:css','handle:js', 'inject' ,'watch']) 
