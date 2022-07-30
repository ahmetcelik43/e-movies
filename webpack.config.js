var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const keywords = require('./src/seo/keywords.js')
const { join } = require('path')
module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]',
      //     limit: 10000,
      //   }
      // },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': join(__dirname, './src/js')
    }
  },
  performance: {
    hints: false
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin()
  ]
}
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Movies App',
      template: 'index.html',
      filename: path.resolve(__dirname, 'dist/index.html'),
      favicon: 'favicon.ico',
      meta: '',
      inject: true
    }),
    new PrerenderSPAPlugin({

      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/about', '/contact'],
      // postProcess(renderedRoute) {
      //   renderedRoute.route = renderedRoute.originalRoute;
      //   renderedRoute.html = renderedRoute.html.split(/>[\s]+</gim).join('><');
      //   if (renderedRoute.route.endsWith('.html')) {
      //     renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route);
      //   }
      //   return renderedRoute;
      // },
      postProcessHtml: function (context) {
        var titles = {
          '/': 'Home - Movies App',
          '/about': 'About Me - Movies App',
        }

        const html = context.html.replace(
          /<title>[^<]*<\/title>/i,
          '<title>' + titles[context.route] + '</title>'
        ).replace(
          /<meta name="keywords" content="[^<]*">/i,
          '<meta name="keywords" content="' + keywords[context.route] + '">'
        )
        context.html = html
        return context
      },
      renderer: new Renderer({
        inject: {
          foo: 'bar'
        },
        headless: false,
        renderAfterDocumentEvent: 'render',
        renderAfterTime: 5000,
      })
    })
  ])
} else {
  // NODE_ENV === 'development'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      title: 'DEVELOPMENT prerender-spa-plugin',
      template: 'index.html',
      filename: 'index.html',
      favicon: 'favicon.ico'
    }),
  ])
}
