const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    mode: "development",
    devtool: "source-map",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Todo App bundled with webpack",
            template: "./src/index.html",
            scriptLoading: "blocking",
        })
    ],
    devServer: {
        port: 8081,
        compress: true,

    }
}