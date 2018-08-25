process.env.NODE_ENV = 'production';
process.env.NODE_PATH = 'src';
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfigProd = require('react-scripts/config/webpack.config.prod');

webpackConfigProd.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'report.html',
  })
);

require('react-scripts/scripts/build');
