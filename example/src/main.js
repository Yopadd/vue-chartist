const Vue = require('vue')

Vue.use(require('../../index.js'), { messageNoData: 'You have not enough data', classNoData: 'empty' })

/* eslint no-new: off */
new Vue({
  el: '#app',
  data () {
    return {
      data: {
        labels: '["Mon", "Tue", "Wed", "Thu", "Fri"]',
        series: '[4, 3.8, 3, 5, 4.1]'
      },
      type: 'Line',
      options: {
        fullWidth: true,
        lineSmooth: false
      },
      distributedSeriesData: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [15, 40, 60, 100]
      },
      distributedSeriesOptions: {
        distributeSeries: true
      },
      timeLineSeriesData: {
        series: [{
          name: 'series-1',
          data: [
            {x: new Date(143134652600), y: 53},
            {x: new Date(143234652600), y: 40},
            {x: new Date(143340052600), y: 45},
            {x: new Date(143366652600), y: 40},
            {x: new Date(143410652600), y: 20},
            {x: new Date(143508652600), y: 32},
            {x: new Date(143569652600), y: 18},
            {x: new Date(143579652600), y: 11}
          ]
        }, {
          name: 'series-2',
          data: [
            {x: new Date(143134652600), y: 53},
            {x: new Date(143234652600), y: 35},
            {x: new Date(143334652600), y: 30},
            {x: new Date(143384652600), y: 30},
            {x: new Date(143568652600), y: 10}
          ]
        }]
      },
      timeLineOptions: {
        axisX: {
          type: this.$chartist.FixedScaleAxis,
          divisor: 5,
          labelInterpolationFnc (value) {
            return moment(value).format('MMM D')
          }
        }
      },
      withOnlySeries: {
        series: [[
          {x: 1, y: 100},
          {x: 2, y: 50},
          {x: 3, y: 25},
          {x: 5, y: 12.5},
          {x: 8, y: 6.25}
        ]]
      },
      withOnlySeriesOptions: {
        axisX: {
          type: this.$chartist.AutoScaleAxis,
          onlyInteger: true
        }
      },
      events: [{
        event: 'draw',
        fn: context => {
          context.element.attr({
            style: `stroke: hsl(${Math.floor(this.$chartist.getMultiValue(context.value) / 100 * 100)}, 60%, 50%);`
          })
        }
      }]
    }
  },
  computed: {
    chartData () {
      return {
        labels: JSON.parse(this.data.labels),
        series: [JSON.parse(this.data.series)]
      }
    }
  }
})
