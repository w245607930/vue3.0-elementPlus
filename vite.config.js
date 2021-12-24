import {defineConfig} from 'vite'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import {
    ElementPlusResolver,
    AntDesignVueResolver,
    VantResolver,
    HeadlessUiResolver,
    ElementUiResolver
} from 'unplugin-vue-components/resolvers'
import styleImport, {
    AndDesignVueResolve,
    VantResolve,
    ElementPlusResolve,
    NutuiResolve,
    AntdResolve
} from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
const fs = require('fs')
const dotenv = require('dotenv')

// https://vitejs.dev/config/
export default ({command, mode}) => {
    let NODE_ENV = process.env.NODE_ENV || 'development';
    let envFiles = [];

    console.log(NODE_ENV, 'NODE_ENV')
    console.log(command, 'command')

    //根据不同的环境使用不同的环境变量
    if(command === 'serve'){
        envFiles = [
            /** default file */
            `.env`
        ]
    }else{
        envFiles = [
            /** default file */
            `.env`,
            /** mode file */
            `.env.${NODE_ENV}`
        ]
    }
    for (const file of envFiles) {
        console.log(file, 'file')
        const envConfig = dotenv.parse(fs.readFileSync(file))
        for (const k in envConfig) {
            process.env[k] = envConfig[k]
        }
    }
    console.log(process.env.VITE_API_DOMAIN, 'VITE_API_DOMAIN')

    return defineConfig({
        server: {
            // base: process.env.VITE_BASE_URL,
            // host: process.env.VITE_HOST,
            port: process.env.VITE_PORT,   //开发环境启动的端口
            open: false,
            cors: true,
        },
        build: {
            // 压缩
            minify: "Esbuild",
            // 进行压缩计算
            brotliSize: false,
            sourcemap: false,
            gzip: true,
            outDir: process.env.VITE_OUTPUT_DIR,
            assetsDir: 'static/img/', // 指定生成静态资源的存放路径
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                },
            },
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.', 'src'),
                '/images': 'static/img',
                '~': path.resolve(__dirname, 'static')
            },
        },
        plugins: [
            vue(),
            viteCompression(),
            AutoImport({
                // imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
                imports: ['vue', 'vue-router', 'vuex'],
                dts: 'src/auto-import.js'
            }),
            Components({
                //指定组件位置，默认是 src/components
                dirs: ['src/components'],
                // ui库解析器，也可以自定义
                resolvers: [
                    ElementPlusResolver(),
                    AntDesignVueResolver(),
                    VantResolver(),
                    HeadlessUiResolver(),
                    ElementUiResolver()
                ],
                //组件的有效文件扩展名。
                extensions: ['vue'],
                dts: 'src/components.js'
            }),
            //解决Toast、Dialog样式不生效
            styleImport({
                resolves: [
                    AndDesignVueResolve(),
                    VantResolve(),
                    ElementPlusResolve(),
                    NutuiResolve(),
                    AntdResolve()
                ]
            }),
            // gzip压缩
            // new CompressionWebpackPlugin({
            //     filename: '[path][base].gz',
            //     algorithm: 'gzip',
            //     test: new RegExp(
            //         '\\.(' +
            //         ['js', 'css'].join('|') +
            //         ')$'
            //     ),
            //     threshold: 10240,
            //     minRatio: 0.8
            // }),
        ]
    })
}
