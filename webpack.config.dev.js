const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin")
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin")
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles")
const clearConsole = require("react-dev-utils/clearConsole")

const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

clearConsole()

if (
  !checkRequiredFiles([
    path.resolve('public/index.html'),
    path.resolve('src/index.tsx'),
  ])
) {
  process.exit(1);
}

module.exports = {
  mode: "development",
  context: __dirname,
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist/"),
    publicPath: "/",
    filename: "[name].[chunkhash].js"
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
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/, // Match image files
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext]" // Place images in 'images' folder
        }
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
  devServer: {
    historyApiFallback: true,
    compress: true,
    hot: true, // Enable Hot Module Replacement
    open: true, // Opens the browser after starting the server
    port: 4004,
    client: {
      progress: true
    }
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html"
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: "",
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      emitWarning: true,
      failOnError: false
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 14004
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  watchOptions: {
    // for some systems, watching many files can result in a lot of CPU or memory usage
    // https://webpack.js.org/configuration/watch/#watchoptionsignored
    // don't use this pattern, if you have a monorepo with linked packages
    ignored: /node_modules/
  }
}