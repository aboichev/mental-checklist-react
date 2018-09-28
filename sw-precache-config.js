module.exports = {
  staticFileGlobs: [
    'build/static/css/**.css',
    'build/static/js/**.js'
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  runtimeCaching: [{
    urlPattern: /\/img\//,
    handler: 'networkFirst'
  }]
}