/**
 * Babel Configuration
 *
 * This module exports the Babel configuration for the project, specifying
 * the presets to be used for transpiling modern JavaScript code into a
 * backward-compatible version.
 *
 * @module BabelConfig
 *
 * @type {Object}
 * @property {Array<string>} presets - An array of Babel presets to be applied.
 * @property {string} presets[0] - The preset for transforming ES6+ code into a format
 *     compatible with older environments.
 */

export default {
  presets: ['@babel/preset-env'],
};
