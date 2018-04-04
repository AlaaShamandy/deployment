var webpack = require('webpack');
var path = require('path');

var parentDirectory = path.join(__dirname, '..');

module.exports = {
    entry: [
        path.join(parentDirectory, '/src/index.js')
    ],

    output: {
        path: path.join(parentDirectory, 'dist'),
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: parentDirectory,
        historyApiFallback: true,
        proxy: {
          "/api": {
            target: "http://localhost:3000",
            secure: false
          }
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    }
}
