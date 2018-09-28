module.exports = {
  staticFileGlobs: [
    'build/static/css/**.css',
    'build/static/js/**.js',
    'build/img/chesspieces/wikipedia/**.png'
  ],
  swFilePath: './build/service-worker.js',
  stripPrefix: 'build/',
  handleFetch: false,
  runtimeCaching: [{
    urlPattern: /\/img\//,
    handler: 'networkFirst'
  }]
}