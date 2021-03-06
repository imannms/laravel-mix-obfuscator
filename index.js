let mix = require('laravel-mix');
let WebpackObfuscator = require('webpack-obfuscator');
let path = require('path');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/* mix.webpackConfig({
    plugins: [
        new JavaScriptObfuscator ({
            rotateUnicodeArray: true
        },  ['public/js/app.js'])
    ],
}); */

class Obfuscator {
	/**
     * Options for Javascript Obfuscator.
     * Defaults to the rotateStringArray, true.
     *
	 * @ref https://github.com/javascript-obfuscator/javascript-obfuscator#options
     * @return {String|Array}
     */
	options = {
		rotateStringArray: true,
	}

	/**
     * A file names or globs which indicates files to exclude from obfuscation.
     * Defaults to 'node_modules'.
     *
     * @return {String|Array}
     */
	exclude = [
		'node_modules'
	]

    /**
     * The optional name to be used when called by Mix.
     * Defaults to the class name, lowercased.
     *
     * @return {String|Array}
     */
    name() {
		return 'obfuscator';
        // Example:
        // return 'example';
        // return ['example', 'alias'];
    }

    /**
     * All dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
		return ['javascript-obfuscator', 'webpack-obfuscator'];
        // Example:
        // return ['typeScript', 'ts'];
    }

    /**
     * Register the component.
     *
     * When your component is called, all user parameters
     * will be passed to this method.
     *
     * Ex: register(src, output) {}
     * Ex: mix.yourPlugin('src/path', 'output/path');
     *
     * @param  {object} config
     * @return {void}
     *
     */
    register(config) {
		var config = config || {};
        // Example:
		// this.config = { proxy: arg };
		this.options = typeof config.options === 'object' ? this.buildOptions( config.options ) : this.options;
		this.exclude = typeof config.exclude === 'array' ? this.buildExcludeList( config.exclude ) : this.buildExcludeList( this.exclude );
    }

    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has executed.
     */
    boot() {
        // Example:
        // if (Config.options.foo) {}
    }

    /**
     * Append to the master Mix webpack entry object.
     *
     * @param  {Entry} entry
     * @return {void}
     */
    webpackEntry(entry) {
        // Example:
        // entry.add('foo', 'bar');
    }

    /**
     * Rules to be merged with the master webpack loaders.
     *
     * @return {Array|Object}
     */
    webpackRules() {
        // Example:
        // return {
        //     test: /\.less$/,
        //     loaders: ['...']
		// });
		
		return {
			test: /\.js$/,
			exclude: this.exclude,
/* 			exclude: [ 
				path.resolve(__dirname, 'node_modules'),
				path.resolve(__dirname, 'resources/js/vendor/fictionalebooks/library/jquery-plugin/*.js') 
			],
 */			enforce: 'post',
			use: { 
				loader: WebpackObfuscator.loader, 
				options: this.options
			}
		}
    }

    /*
     * Plugins to be merged with the master webpack config.
     *
     * @return {Array|Object}
     */
    webpackPlugins() {
        // Example:
        // return new webpack.ProvidePlugin(this.aliases);
    }

    /**
     * Override the generated webpack configuration.
     *
     * @param  {Object} webpackConfig
     * @return {void}
     */
    webpackConfig(webpackConfig) {
        // Example:
        // webpackConfig.resolve.extensions.push('.ts', '.tsx');
    }

    /**
     * Babel config to be merged with Mix's defaults.
     *
     * @return {Object}
     */
    babelConfig() {
        // Example:
        // return { presets: ['@babel/preset-react'] };
	}
	
	/**
     * Build exclude list.
     *
	 * @param  {string[]} list
     * @return {string[]}
     */
	buildExcludeList(list){
		let pathResolved = [];
		list.forEach(filename => {
			pathResolved.push( this.resolvePath(filename) );
		});
		return pathResolved;
	}
	
	/**
     * Build options.
     *
	 * @param  {object} options
     * @return {object}
     */
	buildOptions(options){
		if(typeof options.rotateStringArray !== 'boolean'){
			options.rotateStringArray = this.options.rotateStringArray;
		}

		return options;
	}
	
	/**
     * Resolve path.
     *
	 * @param  {string} filename
     * @return {string}
     */
	resolvePath(filename){
		return path.resolve(__dirname, filename);
	}
}

mix.extend('obfuscator', new Obfuscator());
