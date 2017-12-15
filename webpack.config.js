const webpack = require('webpack');
const path = require('path');
const createHTML = require("html-webpack-plugin");
const extractText = require("extract-text-webpack-plugin");
const clean = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 



const baseOption =(env)=> ({
  entry: {
    index: path.join(__dirname,'app/app.{{#if package.hasTypescript}}ts{{else}}js{{/if}}')
  },
  output: {
    filename: `[name]${env.production?'.min.[chunkhash]':''}.js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: `[name]${env.production?'.min.[chunkhash]':''}.js`,
  },
  module: {
    rules: [
      // catch css
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractText.extract({
          fallback: [
            // config
            {
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          use: [
            // config 
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      // {{#if package.hasScss}}
      // catch scss
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractText.extract({
          fallback: [
            // config
            {
              loader: 'style-loader',
              options: {
                sourceMap: true
              }
            }
          ],

          use: [
            // config
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                outputStyle: 'expanded'
              }
            }
          ]

        })
      },
      // {{/if}}
      // catch file 
      {
        test: /\.png|jpe?g|gif|svg$/,
        exclude: /fonts?/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            outputPath: '/assets/images/',
            name: '[name].[ext]?[hash:6]'

          }
        }
      },
      // catch font
      {
        test: /\.eot|svg|ttf|woff|woff2$/,
        include: /fonts?/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: '/assets/fonts/',
            name: '[name].[ext]?[hash:6]'
          }
        }
      },
      // {{#if package.hasTypescript}}
      // catch typescript
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          // loader
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options:{
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      // {{else}}
      // catch js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // config
          {
            loader: 'babel-loader'
          }
        ]
      },
      // {{/if}}
      // catch vue
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          // loader
          {
            loader: 'vue-loader',
            options:{
              extractCSS:true,
              // {{#if package.hasTypescript}}
              loaders:{
                ts:"babel-loader!ts-loader"
              }
              // {{/if}}
            }
          }
        ]
      }
    ]

  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.vue'],
    alias: {
      app:path.resolve(__dirname,'app'),
      components:path.resolve(__dirname,'app/components/'),
      assets:path.resolve(__dirname,'app/assets/')
    }
  },
  devtool: "source-map",
  plugins: [
    new extractText({
      filename: `[name]${env.production?'.min.[contenthash]':''}.css`
    }),
    new createHTML({
      title: {{{package.name}}},
      template: path.resolve(__dirname, 'app/app.html')
    })

  ]
});

const devServer = {
  host:"0.0.0.0",
  useLocalIp:true,
  proxy: {},
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  historyApiFallback: true,
  hot: false,
  https: false,
  noInfo: false,
  open:true

};

module.exports = env => {
  const _baseOption = baseOption(env)
  if (env.production) {
    process.env.NODE_ENV = 'production';
    _baseOption.plugins.unshift(new clean('dist'))
    _baseOption.plugins.push(new UglifyJsPlugin({sourceMap:true}));
    return _baseOption;
  } else if (env.development) {
    process.env.NODE_ENV = 'development';
    return Object.assign(_baseOption, {devServer})
  }
}