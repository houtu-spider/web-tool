// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: "./bin/run.js",
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "demo.js"
    },
    plugins: [
    ],
    target: "node",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "public"),
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-loader",
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    }
                ]
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "public"),
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                include: path.resolve(__dirname, "public"),
                use: ['file-loader']
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".ejs", "..."],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
