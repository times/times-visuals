module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]__[local]--[hash:base64:5]',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/public/icons/[name].[ext]',
      },
    ],
  },
  resolve: {
    mainFields: ['dev', 'module', 'main'],
  },
};
