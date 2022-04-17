const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);
module.exports = {

    entry: './client/app.js',
    output: {
        path: path.join(__dirname, 'server/public'),
        filename:'js/bundle.js'
    }, 
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    devMode ? 'style-loader' : miniCssExtractPlugin.loader,             
                    'css-loader'
                ]
            }
        ]
    },
    plugins : [
        new htmlWebpackPlugin({
            template: './client/index.html',
            minify: {
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new miniCssExtractPlugin({
            filename: 'styles/bundle.css'
        })
    ],
    devtool: 'source-map',
    

}