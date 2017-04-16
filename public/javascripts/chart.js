const data = {
  labels: ['Task1', 'Task2', 'Task3'],
  series: [20, 15, 40]
};

const options = {
  labelInterpolationFnc: function(value) {
    return value[0]
  }
};

const responsiveOptions = [
  ['screen and (min-width: 640px)', {
    chartPadding: 30,
    labelOffset: 50,
    labelDirection: 'explode',
    labelInterpolationFnc: function(value) {
      return value;
    }
  }],
  ['screen and (min-width: 1024px)', {
    labelOffset: 80,
    chartPadding: 20
  }]
];

new Chartist.Pie('.ct-chart', data, options, responsiveOptions);