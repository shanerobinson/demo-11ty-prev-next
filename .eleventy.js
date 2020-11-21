module.exports = function(eleventyConfig) {

  return  {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
  };

};