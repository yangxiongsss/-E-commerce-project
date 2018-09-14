const config = {
    htmloptions : {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    },
    serveroptions : {
        root : './dist',
        port : 8000,
        livereload : true
    },
    pages : ['index' , 'list' , 'car' , 'header'],
    cssoptions : {//css配置
        'index' : { //index 页面的css
            'common' : [//index页面处理之后的common.min.css需要合并的文件
                './src/stylesheets/reset.scss',
                './src/views/index/stylesheets/common/*.scss'
            ],
            //index页面处理之后的index.min.css需要合并的文件
            'index' : './src/views/index/stylesheets/index/*.scss'
        },
        'list' : {
            'list' : [
                './src/stylesheets/reset.scss',
                './src/views/list/*/*.scss'
            ]
        },
       'header' : {
            'header' : './src/views/header/Hcss/*.scss'
       }
    },
    jsoptions : {//js配置
        'index' : {         
                index :   './src/views/index/javascripts/index.js',
                vendor:   './src/views/index/javascripts/vendor.js'                   
        },
        'list' : {
            'list' : './src/views/list/javascripts/list.js'
        },
        'header' : {
            'header' : './src/views/header/Hjs/header.js'
        }     
    }
}
module.exports = config