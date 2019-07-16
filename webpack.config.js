var path = require('path');
module.exports = {
	mode: "development",

    entry: {
        app :'./src/app.ts'
    },
    output: {
		path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions:['.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}