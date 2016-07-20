import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms';
import { RoomUsers } from '../../api/rooms';
import { Votes } from '../../api/rooms';
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

  
function drawChart(label,dataSet1,dataSet2){
 resetCanvas();
  
 var ctx = $('#myChart');


var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: label,//["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],   // x-cordinate
        datasets: [{
            label: '# of Votes',
            data: dataSet1,//[12, 19, 3, 5, 2, 3], // y-cordinate
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 212, 86, 0.2)',
                'rgba(75, 192, 342, 0.2)',
                'rgba(103, 102, 255, 0.2)',
                'rgba(105, 159, 64, 0.2)'
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
        },
      {
            label: '# of Votes',
            data: dataSet2,//[2, 17, 13, 25, 12, 35], // y-cordinate
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
}


Template.chart.rendered = function(){
  // if (!this.rendered){
        
  //   this.rendered = true;
  // }
  alert("chart");
    // go to roomUser table and grab creator and challenged based on room id
    var roomId = Session.get('roomId');
    var creatorId = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'creator'}]})._id;
    var ChallengedId = RoomUsers.findOne({$and: [{userRoomId: roomId}, {userType: 'challenged'}]})._id;
    var dataSet1 = [];
    var dataSet2 = [];
    var label = [];
    var fromDate,toDate;
    var currentDate = new Date();
    
    var currentdateMili = new Date().getTime();
    
    var MS_PER_MINUTE = 60000;
    //{createdAt : {$gte: ISODate("2016-07-19T15:51:13.382Z")}}
    //debugger;
    //work on that
    // var positiveVotesCreator  = Votes.find({'createdAt' : ISODate("2016-07-20T15:51:13.382Z") }).count();
     
    // debugger;
    for(i=10; i>0; i--){
      var a = currentdateMili - (i * MS_PER_MINUTE);
      var b = a+MS_PER_MINUTE;
      fromDate = new Date(a);
      toDate = new Date(b);
      var fDate = fromDate;//.toISOString();//.toUTCString();
      var tDate = toDate;//.toISOString();//.toUTCString();
      // alert(fDate);
      // alert(tDate);// var min = currentMinute-i;
      
      var creatorId = Session.get('creatorId');
      var positiveVotesCreator  = Votes.find({$and: [{createdAt: {$lt: tDate}}, {vote: true}, {voteDebaterId: creatorId}]}).count();
      var negativeVotesCreator  = Votes.find({$and: [{createdAt: {$lt: tDate}}, {vote: false}, {voteDebaterId: creatorId}]}).count();//Votes.find({$and: [{voteDebaterId: creatorId},{vote:true},{createdAt:{$gte:fDate,$lt: tDate}}]}).count();
      //var negativeVotesCreator  = Votes.find({$and: [{voteDebaterId: creatorId},{vote:false},{createdAt:{$gte:fDate,$lt: tDate}}]}).count();
      // debugger;
      // var postiveVotesCreator = Votes.find({$and: [{created_at: {$lt: new Date()}},{}]}).count();
      // debugger;
      var creatorTotalVote = (positiveVotesCreator - negativeVotesCreator);
      // debugger;
      var positiveVotesChallenged  = Votes.find({$and: [{voteDebaterId: ChallengedId},{vote:true},{createdAt:{$gte:fDate,
      $lt: tDate}}]}).count();
      var negativeVotesChallenged  = Votes.find({$and: [{voteDebaterId: ChallengedId},{vote:false},{createdAt:{$gte:fDate,
      $lt: tDate}}]}).count();
      var challengedTotalVote = positiveVotesChallenged - negativeVotesChallenged

      dataSet1.push(creatorTotalVote);
      dataSet2.push(challengedTotalVote);
      // dataSet1.push(i);
      // dataSet2.push(i-1);

      label.push(fromDate);

    }
// console.log("dataSet1",dataSet1);
// console.log("dataSet2",dataSet2);



  alert(Session.get('roomId'));
  drawChart(label,dataSet1,dataSet2);
 
}





