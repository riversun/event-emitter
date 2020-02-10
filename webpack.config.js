const packageJson = require('./package.json');
const version = packageJson.version;
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {

    const conf = {
        mode: 'development',
        entry: {
            "event-emitter": ['./src/event-emitter.js'],
        },
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: argv.mode === 'production' ? `[name].min.js` : `[name].js`,
            library: '',
            libraryTarget: 'umd'
        },
        optimization: {
            minimizer: [new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                }

            })],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ],
                },
            ],

        },
        resolve: {
            alias: {}
        },
        plugins: [
            new webpack.BannerPlugin(`[name] v${version} Copyright (c) 2020 Tom Misawa(riversun.org@gmail.com)`),
        ],

    };

    if (argv.mode !== 'production') {
        conf.devtool = 'inline-source-map';
    }

    return conf;

};