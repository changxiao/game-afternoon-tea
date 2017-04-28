var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: false,
	// devtool: 'eval-source-map',
	entry: {
		main: __dirname + '/app/main.js',
		vendor: ['react']
	},
	output: {
		path: __dirname + '/public',
		publicPath: '/public',
		filename: '[name]-[hash].js'
	},

	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader:'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules!postcss-loader'
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
	  	new webpack.LoaderOptionsPlugin({
		  	options:{
		  		postcss: function(){
					return [autoprefixer]
		  		}
		  	}
		}),
	  	new webpack.BannerPlugin('Copyright Flying Unicorns inc.'),
	  	new HtmlWebpackPlugin({
	      template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
	    })
	],
	devServer: {
		contentBase: './public',
		port: 8080,
		historyApiFallback: true,
		inline:true
	}
}