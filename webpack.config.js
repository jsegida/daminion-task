const HtmlWebpackPlugin = require("html-webpack-plugin");
const createPostCSSPresetEnv = require("postcss-preset-env");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const postCSSImport = require("postcss-import");
const StyleExtension = require("style-ext-html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const SRC_PATH = path.resolve("src");
const PROMISE_CHUNK = "promise";

module.exports = {
    entry: {
        bundle: SRC_PATH,
        promise: path.resolve(SRC_PATH, PROMISE_CHUNK)
    },
    module: {
        rules: [
            {
                test: /\.pcss$/,
                include: SRC_PATH,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                postCSSImport,
                                createPostCSSPresetEnv()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                include: SRC_PATH,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(SRC_PATH, "index.html"),
            inject: false,
            excludeChunks: [
                PROMISE_CHUNK
            ]
        }),
        new MiniCSSExtractPlugin(),
        new StyleExtension({
            position: "head-bottom"
        }),
        new ManifestPlugin()
    ],
    devtool: "inline-module-source-map"
};
