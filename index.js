'use strict';

exports.install = function (Vue) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var defaultOptions = { messageNoData: '' };
    options = Object.assign({}, defaultOptions, options);

    Vue.component('chartist', {
        template: '<div v-el:chart :class="[ratio, noData]">{{message}}</div>',
        ready: function ready() {
            this.draw();
        },

        props: {
            ratio: { type: String },
            data: { type: Object },
            options: { type: Object },
            type: { type: String, required: true, validator: function validator(val) {
                    return val === 'Pie' || val === 'Line' || val === 'Bar';
                }
            },
            eventHandlers: { type: Array },
            responsiveOptions: { type: Object }
        },
        data: function data() {
            return {
                error: { onError: false, message: '' },
                noData: '',
                message: ''
            };
        },

        methods: {
            draw: function draw() {
                if (this.data) {
                    //data is empty
                    if (this.data.series.length < 1 || this.type !== 'Pie' && this.data.labels.length < 1) {
                        new Chartist[this.type](this.$els.chart, this.data, this.options, this.responsiveOptions); //clear the potential old chart
                        this.setNoData();
                        //data is defined
                    } else {
                            this.noData = ''; //remove class ct-nodata
                            this.message = ''; //remove message no data
                            if (this.error.onError) this.error = { onError: false, message: '' }; //clear error
                            var chart = new Chartist[this.type](this.$els.chart, this.data, this.options, this.responsiveOptions);
                            if (this.eventHandlers) {
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = this.eventHandlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var item = _step.value;

                                        chart.on(item.event, item.fn);
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return) {
                                            _iterator.return();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                            }
                        }
                } else {
                    this.setNoData();
                }
            },
            setNoData: function setNoData() {
                this.error = { onError: true, message: options.messageNoData };
                this.noData = 'ct-nodata';
                this.message = this.error.message;
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
    });
};
