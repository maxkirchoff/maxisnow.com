const eleventySass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      permalink: function () {
        return (data) => `/assets/css/${data.page.filePathStem.split("/").pop()}.css`;
      },
    },
  });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    templateFormats: ["njk", "html"],
  };
};
