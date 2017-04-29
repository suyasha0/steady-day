document.addEventListener('DOMContentLoaded', main);


const data = {
  labels: [".", "TODO", "Completed"],
  series: [0]
}; 
/*
const data = {
  labels: ['Task1', 'Task2', 'Task3'],
  series: [20, 15, 40]
}; */


function main(){
  const notElems = document.getElementsByClassName('not');
  data.series.push(notElems.length);
  const doneElems = document.getElementsByClassName('done');
  const fraction = doneElems.length/(notElems.length+doneElems.length);
  data.series.push(doneElems.length);
  new Chartist.Pie('.ct-chart', data, {
    donut: true,
    donutWidth: 60,
    donutSolid: true,
    startAngle: 360*fraction,
    showLabel: true
  });
}