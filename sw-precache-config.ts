module.exports = {
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  runtimeCaching: [
    {
      handler: "fastest",
      urlPattern: /^https:\/\/unpkg.com/
    },
    {
      handler: "fastest",
      urlPattern: /^https:\/\/a\.tile\.openstreetmap\.org/
    },
    {
      handler: "fastest",
      urlPattern: /^https:\/\/b\.tile\.openstreetmap\.org/
    },
    {
      handler: "fastest",
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
