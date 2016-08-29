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
                chart: null,
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
                        this.chart = new this.Chartist[this.type](this.$els.chart, this.data, this.options, this.responsiveOptions) //clear the potential old chart
                        this.setNoData()
                    //data is defined
                    } else {
                        this.noData = '' //remove class ct-nodata
                        this.message = '' //remove message no data
                        if (this.error.onError) this.error = { onError: false, message: '' } //clear error
                        this.chart = new this.Chartist[this.type](this.$els.chart, this.data, this.options, this.responsiveOptions)
                        if (this.eventHandlers) {
                            for (let item of this.eventHandlers) {
                                this.chart.on(item.event, item.fn)
                            }
                        }
                    }
                } else {
                    this.setNoData()
                }
            },
            redraw() {
                if (this.data.series.length < 1 || (this.type !== 'Pie' && this.data.labels.length < 1))
                    this.setNoData()
                this.chart.update(this.data, this.options)
            },
            setNoData() {
                this.error = { onError: true, message: options.messageNoData }
                this.noData = 'ct-nodata'
                this.message = this.error.message
            }
        },
        watch: {
            'ratio': 'redraw',
            'options': 'redraw',
            'data': {
                handler: 'redraw',
                deep: true
            },
            'type': 'redraw'
        }
    })
}
