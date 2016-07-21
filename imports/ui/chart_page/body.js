import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { RoomUsers } from '../../api/rooms';
import { Votes } from '../../api/rooms';
import { Chart } from '../../../node_modules/chart.js/src/chart.js';
import { Meteor } from 'meteor/meteor';
import './body.html';

var roomId,creatorId,challengedId,creatorName,challengedName;

// function resetCanvas(){
//  $('#myChart').remove(); 
//   $('#Container-lineGraph').append('<canvas id="myChart"><canvas>');
//   canvas = document.querySelector('#myChart');
//   ctx = canvas.getContext('2d');
//   ctx.canvas.width = $('#Container-lineGraph').width(); 
//   ctx.canvas.height = $('#Container-lineGraph').height(); 
//   var x = canvas.width/2;
//   var y = canvas.height/2;
//   ctx.font = '10pt Verdana';
//   ctx.textAlign = 'center';
//   ctx.fillText('This text is centered on the canvas', x, y);
// }

  
function drawChart(label,dataSet1,dataSet2){
 
  
  var ctx = $('#myChart');

  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: label,
          datasets: [{
              label: creatorName,
              data: dataSet1,
              backgroundColor: [
                  
                  'rgba(149, 238, 236, 0.3)'
              ],
              borderColor: [
                
                  'rgba(67, 248, 245, 1)'
              ],
              borderWidth: 1
          },
        {
              label: challengedName,
              data: dataSet2,
              backgroundColor: [
                
                  'rgba(240, 127, 224, 0.3)'
              ],
              borderColor: [
                  
                  'rgba(229, 50, 205, 1)'
              ],
              borderWidth: 1
          }

          ]
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
  setInterval(function(){

    var result = getChartData();

    myChart.data.labels = result.label;
    myChart.data.datasets[0].data = result.dataset1;
    myChart.data.datasets[1].data = result.dataset2;
    myChart.update();


  }, 5000);


}





Template.chart.rendered = function(){

    
    roomId = Session.get('roomId');
    var creator =RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'creator'}]});
    creatorId = creator._id;
    creatorName = creator.name;
    var challenged = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'challenged'}]});
    challengedId = challenged._id;
    challengedName = challenged.name;

    var result = getChartData();

    drawChart(result.label,result.dataset1,result.dataset2);

}

function getChartData(){

    var dataSet1 = [];
    var dataSet2 = [];
    var label = [];
    var fromDate;
    
    var currentdateMili = new Date().getTime(); 
    var MS_PER_MINUTE = 60000;

     
    for(i=10; i>0; i--){
      var newMiliSec = currentdateMili - (i * MS_PER_MINUTE);    
      fromDate = new Date(newMiliSec);

      var positiveVotesCreator  = Votes.find({$and: [{createdAt: {$lt: fromDate}}, {vote: true}, {voteDebaterId: creatorId}]}).count();
      var negativeVotesCreator  = Votes.find({$and: [{createdAt: {$lt: fromDate}}, {vote: false}, {voteDebaterId: creatorId}]}).count();
      var creatorTotalVote = (positiveVotesCreator - negativeVotesCreator);
      // 
      var positiveVotesChallenged  = Votes.find({$and: [{createdAt: {$lt: fromDate}}, {vote: true}, {voteDebaterId: challengedId}]}).count();
      var negativeVotesChallenged  = Votes.find({$and: [{createdAt: {$lt: fromDate}}, {vote: false}, {voteDebaterId: challengedId}]}).count();
      var challengedTotalVote = positiveVotesChallenged - negativeVotesChallenged

  
      // var dateFormat = require('dateformat');     
      // dateFormat(fromDate, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      label.push(fromDate);
      dataSet1.push(creatorTotalVote);
      dataSet2.push(challengedTotalVote);

    }

var result = {"label": label, "dataset1": dataSet1, "dataset2": dataSet2};

return result;


}





