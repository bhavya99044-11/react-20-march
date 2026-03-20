import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

export default {
  mode: "development",

  entry: "./src/index.js",

  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "bundle.js",
    clean: true
  },

  devServer: {
    static: {
      directory: path.join(process.cwd(), "public")
    },
    port: 3000,
    open: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
};