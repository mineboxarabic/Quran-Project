const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = 
{
    mode : "development",
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'mains.js'
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'},
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
            ]
        }
    
}