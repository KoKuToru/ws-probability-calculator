'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    outputPaths: {
      app: {
        html: 'app.html',
      }
    },
    fingerprint: {
      extensions: ['html', 'js', 'css', 'png', 'jpg', 'gif', 'map', 'wasm'],
      exclude: [ 'index.html' ]
    }
  });

  return app.toTree();
};
