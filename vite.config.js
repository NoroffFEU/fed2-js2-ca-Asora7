import { resolve } from "path";
import { defineConfig } from "vite";

/**
 * Vite configuration for the multi-page application (MPA).
 * 
 * This configuration sets up the build options and entry points for the application.
 * 
 * @module vite.config.js
 */

export default defineConfig({
  /**
   * Specifies that this is a multi-page application.
   * 
   * @type {string}
   * @default "mpa"
   */
  appType: "mpa",

  /**
   * Base URL for the application when served in production.
   * 
   * @type {string}
   * @default ""
   */
  base: "",

  /**
   * Build options for the application.
   * 
   * @type {Object}
   * @property {string} target - The JavaScript language version to compile to.
   * @property {Object} rollupOptions - Options for Rollup, the underlying bundler.
   */
  build: {
    /**
     * Target ECMAScript version for the build.
     * 
     * @type {string}
     * @default "esnext"
     */
    target: "esnext",

    rollupOptions: {
      /**
       * Input files for the application.
       * 
       * This includes the entry points for various pages in the application.
       * 
       * @type {Object}
       * @property {string} main - Entry point for the main application.
       * @property {string} login - Entry point for the login page.
       * @property {string} auth - Entry point for the authentication page.
       * @property {string} register - Entry point for the registration page.
       * @property {string} profile - Entry point for the user profile page.
       * @property {string} post - Entry point for the posts page.
       * @property {string} editPost - Entry point for editing posts.
       * @property {string} createPost - Entry point for creating new posts.
       * @property {string} viewPost - Entry point for viewing individual posts.
       */
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
        viewPost: resolve(__dirname, "./post/view/index.html"),
      },
    },
  },
});
