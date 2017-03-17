var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};

var HtmlWebpackPlugin = require('html-webpack-plugin');

var HtmlWebpackConfig = {
    title: 'hexo',
    filename: 'index.html',
    template: "./src/index.html",
    hash: true,
    showErrors: true
};

module.exports = {
    entry: [
        'babel-polyfill',
        "webpack-hot-middleware/client",
        "./src/main.tsx"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(HtmlWebpackConfig)
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loaders: ["react-hot", "awesome-typescript-loader?useBabel=true"] },
            { test: /\.(css|less)$/, loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader!less-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.(ttf|otf|woff|woff2|eot)$/, loader: 'file-loader' },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', "stage-2"]
                }
            },
            {test: /\.json$/,loader: 'json-loader'},
            {test: /\.md$/,loader: 'raw-loader'}
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};