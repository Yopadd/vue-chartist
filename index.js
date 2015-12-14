'use strict';

exports.install = function (Vue) {
    var custmOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var defaultOptions = {
        messageNoData: ''
    };
    var options = Object.assign({}, defaultOptions, custmOptions);

    Vue.component('chartist', {
        template: '<div :id="idChart" :class="[ratio, noData]">{{message}}</div>',
        ready: function ready() {
            this.draw();
        },
        props: {
            idChart: { type: String, required: true },
            ratio: { type: String },
            data: { type: Object },
            options: { type: Object },
            type: { type: String, required: true, validator: function validator(val) {
                    return val === 'Pie' || val === 'Line' || val === 'Bar';
                } },
            eventHanders: { type: Array },
            responsiveOptions: { type: Object }
        },
        data: function data() {
            return {
                error: { onError: false, message: "" },
                noData: '',
                message: ''
            };
        },
        methods: {
            draw: function draw() {
                if (this.data) {
                    //data empty
                    if (this.data.series.length < 1 || this.type !== 'Pie' && this.data.labels.length < 1) {
                        new Chartist[this.type]('#' + this.idChart, this.data, this.options, this.responsiveOptions); //clear the potential old chart
                        this.setNoData();
                        //data ok
                    } else {
                            this.noData = ''; //remove class ct-nodata
                            this.message = ''; //remove message no data
                            if (this.error.onError) this.error = { onError: false, message: "" }; //clear error
                            var chart = new Chartist[this.type]('#' + this.idChart, this.data, this.options, this.responsiveOptions);
                            if (this.eventHanders) {
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = this.eventHanders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var el = _step.value;

                                        chart.on(el.event, el.fn);
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
            'data': 'draw',
            'data.series': {
                handler: 'draw',
                deep: true
            },
            'type': 'draw'
        }
    });
};
