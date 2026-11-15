import * as chartist from "chartist"
import { type App, defineComponent, h, type PropType } from "vue"

type AllEventName = "*" | chartist.PhaseName | chartist.CustomEventName
type Event<K extends AllEventName = AllEventName> = K extends "*"
	? {
			event: K
			fn: chartist.AllPhasesListener
		}
	: K extends chartist.PhaseName
		? {
				event: K
				fn: chartist.PhaseListener<K>
			}
		: K extends chartist.CustomEventName
			? {
					event: K
					fn: (payload: chartist.ChartEvents[K]) => void
				}
			: never

export default {
	install(
		app: App,
		options: { messageNoData?: string; classNoData?: string } = {},
	) {
		app.config.globalProperties.$chartist = chartist

		app.component(
			"Chartist",
			defineComponent({
				compatConfig: {
					RENDER_FUNCTION: false,
				},
				props: {
					ratio: {
						type: String,
						default: "ct-square",
					},
					data: {
						type: Object as PropType<
							| chartist.PieChartData
							| chartist.LineChartData
							| chartist.BarChartData
						>,
						default() {
							return {
								series: [],
								labels: [],
							}
						},
					},
					options: {
						type: Object as PropType<
							| chartist.PieChartPresetOptions
							| chartist.LineChartPresetOptions
							| chartist.BarChartPresetOptions
						>,
						default() {
							return {}
						},
					},
					type: {
						type: String as PropType<"Pie" | "Line" | "Bar">,
						required: true,
						validator(val) {
							return val === "Pie" || val === "Line" || val === "Bar"
						},
					},
					eventHandlers: {
						type: Object as PropType<Array<Event>>,
						default() {
							return []
						},
					},
					responsiveOptions: {
						type: Object as PropType<
							| chartist.PresetResponsiveOptions<chartist.PieChartPresetOptions>
							| chartist.PresetResponsiveOptions<chartist.LineChartPresetOptions>
							| chartist.PresetResponsiveOptions<chartist.BarChartPresetOptions>
						>,
						default() {
							return []
						},
					},
					noData: {
						type: Object,
						default() {
							return {
								message: "",
								class: "ct-nodata",
							}
						},
					},
				},
				data() {
					return {
						chart: null as
							| chartist.PresetHandle<chartist.PieChartPresetOptions>
							| chartist.PresetHandle<chartist.LineChartPresetOptions>
							| chartist.PresetHandle<chartist.BarChartPresetOptions>
							| null,
						message: "",
					}
				},
				watch: {
					ratio: "redraw",
					options: { handler: "redraw", deep: true },
					responsiveOptions: { handler: "redraw", deep: true },
					data: { handler: "redraw", deep: true },
					type: "draw",
					eventHandlers: "resetEventHandlers",
					hasNoData: {
						immediate: true,
						handler(val) {
							if (val) {
								this.setNoData()
							} else {
								this.clear()
							}
						},
					},
				},
				mounted() {
					this.draw()
				},
				computed: {
					hasNoData() {
						return (
							!this.data?.series ||
							this.data.series.length < 1 ||
							(this.type !== "Pie" &&
								"distributeSeries" in this.options &&
								!this.options.distributeSeries &&
								this.data.series.every((series) => {
									if (Array.isArray(series)) {
										return !series.length
									}
									if (
										typeof series === "string" ||
										typeof series === "number"
									) {
										return true
									}
									if (!series) {
										return false
									}
									if ("data" in series) {
										return !series.data.length
									}
									return false
								}))
						)
					},
					noDataOptions() {
						return {
							message: options.messageNoData || this.noData.message,
							class: options.classNoData || this.noData.class,
						}
					},
					chartFunc() {
						switch (this.type) {
							case "Pie":
								return chartist.pieChart
							case "Bar":
								return chartist.barChart
							case "Line":
								return chartist.lineChart
						}
					},
				},
				methods: {
					clear() {
						this.message = ""
					},
					draw() {
						this.chart = this.hasNoData
							? null
							: this.chartFunc(
									this.$refs.chart as string,
									this.data as chartist.PieChartData &
										chartist.BarChartData &
										chartist.LineChartData,
									this.options,
									this.responsiveOptions,
								)
						this.setEventHandlers()
					},
					redraw() {
						if (this.chart) {
							this.chart.setOptions(this.options)
							this.chart.update({ data: this.data as chartist.ChartData })
						} else {
							this.draw()
						}
					},
					resetEventHandlers(
						eventHandlers: Array<Event>,
						oldEventHandler: Array<Event>,
					) {
						if (!this.chart) {
							return
						}
						for (const item of oldEventHandler) {
							// biome-ignore lint/suspicious/noExplicitAny: typed correctly the function parameters is too hard
							this.chart.off(item.event as any, item.fn as any)
						}
						for (const item of eventHandlers) {
							// biome-ignore lint/suspicious/noExplicitAny: typed correctly the function parameters is too hard
							this.chart.on(item.event as any, item.fn as any)
						}
					},
					setEventHandlers() {
						if (this.chart && this.eventHandlers) {
							for (const item of this.eventHandlers) {
								// biome-ignore lint/suspicious/noExplicitAny: typed correctly the function parameters is too hard
								this.chart.on(item.event as any, item.fn as any)
							}
						}
					},
					setNoData() {
						this.message = this.noDataOptions.message
					},
				},
				render() {
					const children = this.message || this.$slots.default || []

					return h(
						"div",
						{
							ref: "chart",
							class: [
								this.ratio,
								{ [this.noDataOptions.class]: this.hasNoData },
							],
						},
						children,
					)
				},
			}),
		)
	},
}
