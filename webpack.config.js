const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ]
}