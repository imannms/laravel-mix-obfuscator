# Laravel Mix Obfuscator
This extension provides instant [Webpack Obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator) ([Javascript Obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)) support to your Mix (v2.1 and up) builds.

# Usage
First, install the extension.

```npm install laravel-mix-obfuscator --save-dev```

Then, require it within your `webpack.mix.js` file, like so:

```javascript
let mix = require('laravel-mix');

require('laravel-mix-obfuscator');

mix
    .js('resources/js/app.js', 'public/js')
    .less('resources/less/app.less', 'public/css')
    .obfuscator({
	exclude: [
	   path.resolve(__dirname, 'node_modules')
	]
     });
```

# Config

```javascript

mix.obfuscator({
    options: {},
    exclude: []
})

```

### options
Type: `object` Default: `{}`

Javascript Obfuscator options.

[More information about the Javascript Obfuscator options](https://github.com/javascript-obfuscator/javascript-obfuscator#options)

### exclude
Type: `string[]` Default: `[]`

A file names or globs which indicates files to exclude from obfuscation.

It is not recommended to obfuscate vendor scripts and polyfills, since the obfuscated code is 15-80% slower (depends on options) and the files are significantly larger. 

**It is strongly recommended to exclude `node_modules`.**

