var ChartistFn = require('./Chartist').ChartistFn
var Chartist = require('./Chartist').Chartist

exports.install = function (Vue, options = {}) {
  const defaultOptions = { messageNoData: '', classNoData: 'ct-nodata' }
  options = Object.assign({}, defaultOptions, options)

  Vue.component('Chartist', ChartistFn(options))
}

exports.Chartist = Chartist
