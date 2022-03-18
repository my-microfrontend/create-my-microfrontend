const { merge } = require('webpack-merge');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/',
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            disableDotRule: true
        }
    },
    devtool: 'eval',
    plugins: [
        // new ModuleFederationPlugin({
        //     name: 'container',
        //     remotes: {
        //         standard: 'standard@http://localhost:8081/remoteEntry.js',
        //         standardent: 'standardent@http://localhost:8083/remoteEntry.js',
        //         // custom: 'custom@http://localhost:8082/remoteEntry.js',
        //     },
        //     filename: 'remoteEntry.js',
        //     exposes: {
        //         './DashboardModal_App': './src/components/wrap-container/sf-navbar/DashboardModal',
        //     },
        //     shared: packageJson.dependencies,
        // }),
    ],
};

module.exports = merge(commonConfig, devConfig);