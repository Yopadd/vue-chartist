# vue-chartist

Plugin [Vuejs](http://vuejs.org/) for [Chartist.js](https://gionkunz.github.io/chartist-js)

## Install

```
npm install vue-chartist
```

## Setup

**This package include Chartist's javascript but not the stylesheet**

```javascript
const Vue = require("vue")
const vueChartist = require("../../index.js")
Vue.createApp({}).use(vueChartist)
```

## Usage

In your HTML, add `<chartist>` tag. This tag take the following attributes :

- **ratio** - `String`
  class ratio of Chartist, see values on [Chartist web site](https://gionkunz.github.io/chartist-js/getting-started.html#as-simple-as-it-can-get)

- **type** - `String` (required)
  chart type, possible values : - `Line` - `Bar` - `Pie`

- **data** - `Object`
  data object like this

```javascript
const data = {
  labels: ["A", "B", "C"],
  series: [
    [1, 3, 2],
    [4, 6, 5],
  ],
}
```

- **options** - `Object`
  options object, see defaultOptions on [API Documentation](https://gionkunz.github.io/chartist-js/api-documentation.html)

- **event-handlers** - `Array`
  a special array to use `chart.on(event, function)`

```javascript
const eventHandlers = [
  {
    event: "draw",
    fn() {
      //animation
    },
  },
  {
    //an other event hander
  },
]
```

- **responsive-options** - `Array`
  object for responsive options

## Example

```html
<chartist
  ratio="ct-major-second"
  type="Line"
  :data="chartData"
  :options="chartOptions"
>
</chartist>
```

> _Note: think about using the [dynamic props](http://vuejs.org/guide/components.html#Dynamic_Props) of Vuejs to bind easliy your data or other._

```javascript
Vue.createApp({
  data: {
    chartData: {
      labels: ["A", "B", "C"],
      series: [
        [1, 3, 2],
        [4, 6, 5],
      ],
    },
    chartOptions: {
      lineSmooth: false,
    },
  },
})
  .use(vueChartist)
  .mount("#app")
```

## Customize chart with no data

If chart data are empty or not definied the plugin add `ct-nodata` (or a custom class, see options plugin) class and write a message on the element.
That way, you can customize your element with CSS when you have no data to display. To choose your message use the options plugin.

## Options Plugin

```javascript
app.use(require("vue-chartist"), {
  messageNoData: "You have not enough data",
  classNoData: "empty",
})
```

## Chartist instance

There is two way to access this Chartist's instance :
By `Vue` instance

```javascript
Vue.chartist
```

or in component

```javascript
this.$chartist
```
