require('dotenv').config()

module.exports = function (eleventyConfig) {
  // Output directory: _site

  eleventyConfig.addPassthroughCopy("js/*.js")
  eleventyConfig.addPassthroughCopy("js/history/*.js")
  eleventyConfig.addPassthroughCopy("assets/*.svg")
  eleventyConfig.addPassthroughCopy("assets/*.css")

  // Copy `img/` to `_site/img`
  // eleventyConfig.addPassthroughCopy("img");

  // // Copy `css/fonts/` to `_site/css/fonts`
  // // Keeps the same directory structure.
  // eleventyConfig.addPassthroughCopy("css/fonts");

  // // Copy any .jpg file to `_site`, via Glob pattern
  // // Keeps the same directory structure.
  // eleventyConfig.addPassthroughCopy("**/*.jpg");
};