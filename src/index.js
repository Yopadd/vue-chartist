exports.install = function (Vue, options={}) {
    const defaultOptions = { messageNoData: '' }
    options = Object.assign({}, defaultOptions, options)

    Vue.component('chartist', {
        template:'<div :id="idChart" :class="[ratio, noData]">{{message}}</div>',
        ready() {
            this.draw()
        },
        props: {
            idChart: { type: String, required: true },
            ratio: { type: String },
            data: { type: Object },
            options: { type: Object },
            type: { type: String, required: true, validator(val) { return val === 'Pie' || val === 'Line' || val === 'Bar' } },
            eventHanders: { type: Array },
            responsiveOptions: { type: Object }
        },
        data() {
            return {
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
                        new Chartist[this.type]('#'+this.idChart, this.data, this.options, this.responsiveOptions) //clear the potential old chart
                        this.setNoData()
                    //data is defined
                    } else {
                        this.noData = '' //remove class ct-nodata
                        this.message = '' //remove message no data
                        if (this.error.onError) this.error = { onError: false, message: '' } //clear error
                        const chart = new Chartist[this.type]('#'+this.idChart, this.data, this.options, this.responsiveOptions)
                        if (this.eventHanders) {
                            for (let el of this.eventHanders) {
                                chart.on(el.event, el.fn)
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
            'data': 'draw',
            'data.series': {
                handler: 'draw',
                deep: true
            },
            'type': 'draw'
        }
    })
}
