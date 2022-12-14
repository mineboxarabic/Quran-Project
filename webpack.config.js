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
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }
        
    )],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'},
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpeg|gif|svg|jpg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'images'
                      },
                  },
                ],
              }
            ]
        }
    
}