const Vue = require('vue')

Vue.use(require('../../index.js'), { messageNoData: 'You have not enough data', classNoData: 'empty' })

new Vue({
    el: '#app',
    data() {
        return {
            data: {
                labels: '["Mon", "Tue", "Wed", "Thu", "Fri"]',
                series: "[4, 3.8, 3, 5, 4.1]"
            },
            type: 'Line',
            options: {
                fullWidth: true,
                lineSmooth: false
            }
        }
    },
    computed: {
        chartData() {
            return {
                labels: JSON.parse(this.data.labels),
                series: [JSON.parse(this.data.series)]
            }
        }
    }
})
