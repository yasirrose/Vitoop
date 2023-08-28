var Encore = require('@symfony/webpack-encore');

Encore
// the project directory where all compiled assets will be stored
    .setOutputPath('web/vitoop/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/vitoop')

    // will create public/build/app.js and public/build/app.css
    .addEntry('vitoop-app', './assets/js/app.js')

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

    .configureBabel(function(babelConfig) {
        // add additional presets
        babelConfig.presets.push('env');

        // no plugins are added by default, but you can add some
        // babelConfig.plugins.push('styled-jsx/babel');
    })

    .enableVueLoader()

    // enable source maps during development
    .enableSourceMaps(!Encore.isProduction())

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    // show OS notifications when builds finish/fail
    .enableBuildNotifications()

// create hashed filenames (e.g. app.abc123.css)
// .enableVersioning()

// allow sass/scss files to be processed
// .enableSassLoader()
;

// export the final configuration

const config = Encore.getWebpackConfig();

config.resolve = {
    'alias': {
        vue: '@vue/compat'
    }
}

config.module = {
    rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              compatConfig: {
                // Default everything to Vue 2 behavior
                MODE: 2
              }
            }
          }
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
      ]
}

module.exports = config;