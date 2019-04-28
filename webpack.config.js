let path = require("path");
let CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let VueLoader = require("vue-loader");


module.exports = {

    devtool: "sourcemaps",
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "bundle.js"

    },

    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["es2015"] }
                }
            },
            {
                test: /\.(html|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }

            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "vue-style-loader"
                    },
                    {
                        loader: "css-loader?sourceMap"
                    },
                    {
                        loader: "sass-loader?sourceMap"
                    }
                ]
            },

            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },


            {
                test: /\.css$/,
                use: [{
                        loader: "vue-style-loader"
                    },
                    {
                        loader: "css-loader?sourceMap"
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ],
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']

    },

    plugins: [
        new VueLoader.VueLoaderPlugin(),
        new CleanWebpackPlugin(['public']),
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'images' },
            //add to this array for further static assets e.g. {from: 'src/fonts', to:  'fonts'}
        ]),
    ]


}
