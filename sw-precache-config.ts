module.exports = {
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  runtimeCaching: [
    {
      handler: "cacheFirst",
      urlPattern: /^https:\/\/unpkg.com/
    },
    {
      handler: "cacheFirst",
      urlPattern: /^https:\/\/a\.tile\.openstreetmap\.org/
    },
    {
      handler: "cacheFirst",
      urlPattern: /^https:\/\/b\.tile\.openstreetmap\.org/
    },
    {
      handler: "cacheFirst",
      urlPattern: /^https:\/\/c\.tile\.openstreetmap\.org/
    }
  ],
  staticFileGlobs: [
    "build/*.html",
    "build/manifest.json",
    "build/static/**/!(*map*)"
  ],
  stripPrefix: "build/",
  swFilePath: "build/service-worker.js"
};
