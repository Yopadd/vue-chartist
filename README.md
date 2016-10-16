vue-chartist
==============

Plugin [Vuejs](http://vuejs.org/) for [Chartist.js](https://gionkunz.github.io/chartist-js)

## Install

```
npm install vue-chartist
```

## Setup

__This package include Chartist's javascript but not the stylesheet__
```javascript
Vue.use(require('vue-chartist'))
```

## Usage

In your HTML, add `<chartist>` tag. This tag take the following attributes :

- __ratio__ - `String`
class ratio of Chartist, see values on [Chartist web site](https://gionkunz.github.io/chartist-js/getting-started.html#as-simple-as-it-can-get)

- __type__ - `String` (required)
chart type, possible values :
    - `Line`
    - `Bar`
    - `Pie`

- __data__ -  `Object`
data object like this
```javascript
const data = {
    labels: ["A", "B", "C"],
    series:[[1, 3, 2], [4, 6, 5]]
}
```

- __options__ - `Object`
options object, see defaultOptions on [API Documentation](https://gionkunz.github.io/chartist-js/api-documentation.html)

- __event-handlers__ - `Array`
a special array to use `chart.on(event, function)`
```javascript
const eventHandlers = [{
    event: 'draw',
    fn() {
        //animation
    }
}, {
    //an other event hander
}]
```

- __responsive-options__ - `Array`
object for responsive options

## Example

```html
<chartist
    ratio="ct-major-second"
    type="Line"
    :data="chartData"
    :options="chartOptions" >
</chartist>
```

>*Note: think about using the [dynamic props](http://vuejs.org/guide/components.html#Dynamic_Props) of Vuejs to bind easliy your data or other.*

```javascript
new Vue({
    el:'#app',
    data: {
        chartData: {
            labels: ["A", "B", "C"],
            series:[[1, 3, 2], [4, 6, 5]]
        },
        chartOptions: {
            lineSmooth: false
        }
    }
})
```

## Customize chart with no data

If chart data are empty or not definied the plugin add `ct-nodata` (or a custom class, see options plugin) class and write a message on the element.
That way, you can customize your element with CSS when you have no data to display. To choose your message use the options plugin.

## Options Plugin
```javascript
Vue.use(require('vue-chartist'), {
    messageNoData: "You have not enough data",
    classNoData: "empty"
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
