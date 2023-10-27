const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = (config) => {
  config.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false,
  });

  config.addPassthroughCopy("src/assets/img/");
  config.addPassthroughCopy("src/assets/js/");

  config.addWatchTarget("./src/assets/scss/");
  config.setWatchThrottleWaitTime(500);

  config.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "serverless",
    functionsDir: "./netlify/functions",
  });

  return {
    dir: {
      input: "./src",
      output: "./build",
      includes: "_includes",
    },
  };
};
