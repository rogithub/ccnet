var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {        
        index: [
            './scripts/index/index.ts'
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'wwwroot/dist/')
    }
};