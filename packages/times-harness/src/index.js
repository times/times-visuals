const path = require("path");
const webpack = require("webpack");
const CreateFileWebpack = require("create-file-webpack");

const htmlTemplate = require("./template");

module.exports = (entry, paths, componentHtml) => ({
  entry,

  output: {
    path: paths.distDirectory,
    filename: "index.js",
    publicPath: "/",
    libraryTarget: "umd"
  },

  mode: "development",

  module: {
    rules: [
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: "file-loader?name=assets/[hash].[ext]"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            query: {
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:3]"
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        // exclude: /(node_modules)/,
        include: [
          paths.baseDirectory,
          path.resolve(__dirname, "node_modules/@times-visuals/"),
          path.dirname(require.resolve("@times-visuals/web-component-harness"))
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: paths.distDirectory,
    publicPath: "/",
    open: true,
    port: 8000,
    hot: true
  },

  devtool: "inline-source-map",

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CreateFileWebpack({
      path: paths.distDirectory,
      fileName: "index.html",
      content: htmlTemplate(componentHtml)
    })
  ]
});
