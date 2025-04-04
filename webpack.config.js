const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const path = require("path")

// Filter only env vars that start with REACT_APP_
const envVars = Object.keys(process.env)
  .filter((key) => key.startsWith("REACT_APP_"))
  .reduce((acc, key) => {
    acc[key] = JSON.stringify(process.env[key])
    return acc
  }, {})

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist/"),
    publicPath: '/',
    filename: "js/[name].[chunkhash].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".js", ".ts", ".tsx"], // Optional: Resolve these extensions automatically
    //webpack v5 does not include polyfills...
    fallback: {
      fs: false,
      util: false,
      stream: false,
      crypto: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        type: "asset/resource",
        exclude: /node_modules/,
        generator: {
          filename: "images/[name].[hash][ext]" // Place images in 'images' folder
        }
        //use: ["file-loader?name=[name].[ext]"] // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/, // Match font files
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash][ext]" // Place fonts in 'fonts' folder
        }
      }
    ],
  },
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      ...envVars,
      REACT_APP_BUILD_DATE: webpack.DefinePlugin.runtimeValue(Date.now)
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css" // Output CSS in 'css' folder
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html"
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: ""
    })
  ],
  watchOptions: {
    // for some systems, watching many files can result in a lot of CPU or memory usage
    // https://webpack.js.org/configuration/watch/#watchoptionsignored
    // don't use this pattern, if you have a monorepo with linked packages
    ignored: /node_modules/
  }
}