const Vue = require('vue')

Vue.use(require('../../index.js'), { messageNoData: 'You have not enough data', classNoData: 'empty' })

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
