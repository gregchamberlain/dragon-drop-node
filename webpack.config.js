var getConfig = require('hjs-webpack');


module.exports = getConfig({
  // entry point for the app
  in: 'client/dragon_drop.jsx',

  // Name or full path of output directory
  // commonly named `www` or `public`. This
  // is where your fully static site should
  // end up for simple deployment.
  out: 'server/public',
  output: {
    filename: 'bundle.js',
    cssFilename: 'styles.css'
  },
  html: false,

  // This will destroy and re-create your
  // `out` folder before building so you always
  // get a fresh folder. Usually you want this
  // but since it's destructive we make it
  // false by default
  clearBeforeBuild: false
});
