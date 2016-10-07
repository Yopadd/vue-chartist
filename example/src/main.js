const Vue = require('vue')

Vue.use(require('../../index.js'), { messageNoData: 'You have not enough data', classNoData: 'empty' })

new Vue({
    el: '#app',
    data() {
        return {
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                series: [{
                    name: 'series-1',
                    data: [0, 2, 4, 2, 0]
                }, {
                    name: 'series-2',
                    data: [2, 3, 2.7, 1, 2.3]
                }, {
                    name: 'series-3',
                    data: [4, 3.8, 3, 5, 4.1]
                }]
            },
            type: 'Line',
            pieData: {
                series: [5, 6, 3, 0, 2, 4]
            },
            options: {
                fullWidth: true,
                series: {
                    'series-1': {
                        lineSmooth: false
                    },
                    'series-2': {
                        showArea: true
                    },
                    'series-3': {
                        showPoint: false
                    }
                }
            },
            pieOptions: {
                donut: true,
                donutWidth: 60
            },
            emptyData: {
                series: [[], []],
                labels: ['a','b'],
            },
            eventHandlers: [{
                event: 'draw',
                fn(data) {
                    if (data.type === 'line' || data.type === 'area') {
                        data.element.animate({
                            d: {
                                begin: 2000 * data.index,
                                dur: 2000,
                                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                to: data.path.clone().stringify(),
                                easing: Vue.chartist.Svg.Easing.easeOutQuint
                            }
                        })
                    }
                }
            }]
        }
    }
})
