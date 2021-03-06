let mix = require('laravel-mix');
let WebpackObfuscator = require('webpack-obfuscator');

class Obfuscator {
    /**
     * Options for Javascript Obfuscator.
     *
     * @ref https://github.com/javascript-obfuscator/javascript-obfuscator#options
     * @return {String|Array}
     */
    options = {}

    /**
     * A file names or globs which indicates files to exclude from obfuscation.
     *
     * @return {String|Array}
     */
    exclude = []

    /**
     * The optional name to be used when called by Mix.
     * Defaults to the class name, lowercased.
     *
     * @return {String|Array}
     */
    name() {
        return 'obfuscator';
    }

    /**
     * All dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        return ['javascript-obfuscator', 'webpack-obfuscator'];
    }

    /**
     * Register the component.
     *
     * When your component is called, all user parameters
     * will be passed to this method.
     *
     * @param  {object} config
     * @return {void}
     *
     */
    register(config) {
        let Config = config || {};
     
        this.options = Config.options || this.options;
        this.exclude = Config.exclude || this.exclude;
    }

    /**
     * Rules to be merged with the master webpack loaders.
     *
     * @return {Array|Object}
     */
    webpackRules() {    
        return {
            test: /\.js$/,
            exclude: this.exclude,
            enforce: 'post',
            use: { 
                loader: WebpackObfuscator.loader, 
                options: this.options
            }
        }
    }

}

mix.extend('obfuscator', new Obfuscator());
