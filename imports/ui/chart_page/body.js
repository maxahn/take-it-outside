import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { Chart } from '../../../node_modules/chart.js/src/chart.js';
import { Meteor } from 'meteor/meteor';
//import { Router } from '../../../client/routes';
import './body.html';


Template.chart.events({

})


function resetCanvas(){
 $('#myChart').remove(); // this is my <canvas> element
  $('#Container-lineGraph').append('<canvas id="myChart"><canvas>');
  canvas = document.querySelector('#myChart');
  ctx = canvas.getContext('2d');
  ctx.canvas.width = $('#Container-lineGraph').width(); // resize to parent width
  ctx.canvas.height = $('#Container-lineGraph').height(); // resize to parent height
  var x = canvas.width/2;
  var y = canvas.height/2;
  ctx.font = '10pt Verdana';
  ctx.textAlign = 'center';
  ctx.fillText('This text is centered on the canvas', x, y);
}

  
function drawChart(){
 resetCanvas();
  
 var ctx = $('#myChart');


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],   // x-cordinate
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3], // y-cordinate
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}


Template.chart.rendered = function(){
  if (!this.rendered){
        
    this.rendered = true;
  }
  
  drawChart();
 
}





