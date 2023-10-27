module.exports = (config) => {
  config.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false,
  })

  config.addPassthroughCopy("src/assets/img/");
  config.addPassthroughCopy("src/assets/js/");

  config.addWatchTarget("./src/assets/scss/");
  config.setWatchThrottleWaitTime(500);

  return {
    dir: {
      input: "./src",
      output: "./build",
      includes: "_includes",
    },
  };
}
