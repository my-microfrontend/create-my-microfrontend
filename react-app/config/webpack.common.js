const fs =  require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime"],
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: "file-loader",
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "@svgr/webpack",
                        options: {
                            babel: false,
                            icon: true,
                        },
                    },
                    {
                        loader: "url-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public/*"),
                    filter: async (resourcePath) => {
                        // const data = await fs.promises.readFile(resourcePath);
                        // const content = data.toString();
                        const filterContent = ["index.html"]

                        if (resourcePath.includes(filterContent)) {
                            return false;
                        }

                        return true;
                    },
                    to({ context, absoluteFilename }) {
                        return Promise.resolve("[name][ext]");
                    },
                },
            ],
        }),
    ],
};
