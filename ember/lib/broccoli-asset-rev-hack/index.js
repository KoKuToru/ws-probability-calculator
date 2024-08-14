'use strict';

const original = require('broccoli-asset-rev/index');
const defaults = require('broccoli-asset-rev/lib/default-options');
const Fingerprint = require('broccoli-asset-rev/lib/fingerprint');
const UseRev = require('broccoli-asset-rewrite');
const FastbootManifestRewrite = require('broccoli-asset-rev/lib/fastboot-manifest-rewrite');

class FingerprintHack extends Fingerprint {
  getDestFilePath(relativePath) {
    const value = super.getDestFilePath(relativePath);
    const nvalue = value.replace(/-[a-f0-9]{32}-([a-f0-9]{32}\.[^.].+)$/, '-$1');
    this.assetMap[relativePath] = nvalue;
    return nvalue;
  }
}

function AssetRev(inputTree, options) {
  if (!(this instanceof AssetRev)) {
    return new AssetRev(inputTree, options);
  }

  options = options || {};
  var exclude = options.exclude || defaults.exclude;

  this.assetMap = {};
  this.inputTree = inputTree;
  this.customHash = options.customHash;
  this.extensions = options.extensions || defaults.extensions;
  this.replaceExtensions = options.replaceExtensions || defaults.replaceExtensions;
  this.exclude = exclude;
  this.fingerprintAssetMap = options.fingerprintAssetMap || defaults.fingerprintAssetMap;
  this.generateAssetMap = options.generateAssetMap;
  this.generateRailsManifest = options.generateRailsManifest;
  this.assetMapPath = options.assetMapPath || defaults.assetMapPath;
  this.railsManifestPath = options.railsManifestPath || defaults.railsManifestPath;
  this.prepend = options.prepend || defaults.prepend;
  this.ignore = options.ignore;
  this.description = options.description;

  // first pass - excludes replaceable source code
  this.exclude = exclude.slice();
  this.replaceExtensions.forEach(function(ext) { this.exclude.push('**/*.' + ext); }, this);
  var fingerprintTree = new FingerprintHack(inputTree, this);
  var assetRewrite = UseRev(fingerprintTree, this);

  // second pass - fingerprints replaceable source code
  this.exclude = exclude;
  this.onlyHash = this.replaceExtensions;
  var fingerprintTree2 = new FingerprintHack(assetRewrite, this);
  var assetRewrite2 = UseRev(fingerprintTree2, this);

  return new FastbootManifestRewrite(assetRewrite2, this.assetMap);
}

module.exports = {
  ...original,
  name: 'broccoli-asset-rev-hack',
  initializeOptions() {
    original.initializeOptions.call(this);
    const options = this.options;
    this.options = { ...options };
    // don't run the original broccoli-asset-rev
    options.enabled = false;
  },
  postprocessTree(type, tree) {
    if (type === 'all' && this.options.enabled) {
      tree = AssetRev(tree, this.options);
      // XXX: run it twice
      tree = AssetRev(tree, this.options);
    }

    return tree;
  }
};
