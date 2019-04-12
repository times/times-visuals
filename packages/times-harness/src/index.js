const path = require("path");
const webpack = require("webpack");
const CreateFileWebpack = require("create-file-webpack");

const htmlTemplate = require("./html-template");
const componentTemplate = require("./component-template");

module.exports = (
  entry,
  paths,
  componentName,
  componentHtml,
  mode = "development"
) => ({
  entry,

  output: {
    path: `${paths.distDirectory}/${componentName}`,
    filename: "index.js",
    publicPath: "/",
    libraryTarget: "umd"
  },

  mode,

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
    mode === "development" && new webpack.HotModuleReplacementPlugin(),
    mode === "development" && new webpack.NamedModulesPlugin(),
    mode === "production" &&
      new CreateFileWebpack({
        path: paths.distDirectory,
        fileName: `${componentName}/${componentName}.html`,
        content: componentTemplate(componentName)
      }),
    new CreateFileWebpack({
      path: paths.distDirectory,
      fileName: "index.html",
      content: htmlTemplate(componentName, componentHtml, mode)
    })
  ].filter(Boolean)
});
