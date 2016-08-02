exports.install = function (Vue, options={}) {
    const defaultOptions = { messageNoData: '' }
    options = Object.assign({}, defaultOptions, options)

    Vue.component('chartist', {
        template:'<div v-el:chart :class="[ratio, noData]" v-text="message"></div>',
        ready() {
            this.draw()
        },
        props: {
            ratio: { type: String },
            data: { type: Object },
            options: { type: Object },
            type: { type: String, required: true, validator(val) { return val === 'Pie' || val === 'Line' || val === 'Bar' } },
            eventHandlers: { type: Array },
            responsiveOptions: { type: Array }
        },
        data() {
            return {
                Chartist: require('chartist'),
                error: { onError: false, message: '' },
                noData: '',
                message: ''
            }
        },
        methods: {
            draw() {
                if (this.data) {
                    //data is empty
                    if (this.data.series.length < 1 || (this.type !== 'Pie' && this.data.labels.length < 1)) {
                        new this.Chartist[this.type](this.$els.chart, this.data, this.options, this.responsiveOptions) //clear the potential old chart
                        this.setNoData()
                    //data is defined
                    } else {
                        this.noData = '' //remove class ct-nodata
                        this.message = '' //remove message no data
                        if (this.error.onError) this.error = { onError: false, message: '' } //clear error
                        const chart = new this.Chartist[this.type](this.$els.chart, this.data, this.options, this.responsiveOptions)
                        if (this.eventHandlers) {
                            for (let item of this.eventHandlers) {
                                chart.on(item.event, item.fn)
                            }
                        }
                    }
                } else {
                    this.setNoData()
                }
            },
            setNoData() {
                this.error = { onError: true, message: options.messageNoData }
                this.noData = 'ct-nodata'
                this.message = this.error.message
            }
        },
        watch: {
            'ratio': 'draw',
            'options': 'draw',
            'data': {
                handler: 'draw',
                deep: true
            },
            'type': 'draw'
        }
    })
}
