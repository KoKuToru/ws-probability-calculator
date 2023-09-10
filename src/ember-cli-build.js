'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    outputPaths : {
      app : {
        html : 'app.html',
      }
    }
  });

  return app.toTree();
};
