
function getHourData() {
  var hourData = [];//allocate hour array
  for(var i = 0; i < 24; ++i) {//initialize to 0
    hourData[i] = 0;
  }

  chrome.storage.sync.get({stress_events: []}, function (result) {
      // the input argument is ALWAYS an object containing the queried keys
      var stress_events = result.stress_events;

      // set the new array value to the same key
      for(var i = 0; i < result.stress_events.length; ++i) {
        var date = new Date(result.stress_events[i].date);
        var hour = date.getHours();
        ++hourData[parseInt(hour)];
      }

        var ctx = document.getElementById("hourChart");

        var hours = [];
        for (var i = 1; i <= 24; ++i) {
          hours[i] = String(i);
        }
        var formattedHourData = {
            labels: hours,
            datasets: [{
              data: hourData,
              label: "Uses"
              // data: [3,5,6,2]
            }]
          };

        var hourChart = new Chart(ctx,{
            type: 'bar',
            data: formattedHourData
        });
    });
}

function getDayData() {
  var dayData = [];//allocate hour array
  for(var i = 0; i < 7; ++i) {//initialize to 0
    dayData[i] = 0;
  }

  chrome.storage.sync.get({stress_events: []}, function (result) {
      // the input argument is ALWAYS an object containing the queried keys
      var stress_events = result.stress_events;

      // set the new array value to the same key
      for(var i = 0; i < result.stress_events.length; ++i) {
        var date = new Date(result.stress_events[i].date);
        var day = date.getDay();
        ++dayData[parseInt(day)];
      }

        var ctx = document.getElementById("dayChart");

        var days = ["S", "M", "T", "W", "T", "F", "S"];

        var formattedDayData = {
            labels: days,
            datasets: [{
              data: dayData,
              label: "Uses"
              // data: [3,5,6,2]
            }]
          };

        var dayChart = new Chart(ctx,{
            type: 'bar',
            data: formattedDayData
        });
    });
}

function getAveragePerDay() {
  var dayData = [];//allocate hour array

  for(var i = 0; i < 7; ++i) {//initialize to 0
    dayData[i] = {count: 0, sum: 0};
  }

  chrome.storage.sync.get({stress_events: []}, function (result) {
      // the input argument is ALWAYS an object containing the queried keys
      var stress_events = result.stress_events;

      // set the new array value to the same key
      for(var i = 0; i < result.stress_events.length; ++i) {
        var date = new Date(result.stress_events[i].date);
        var day = parseInt(date.getDay());
        var rating = parseInt(result.stress_events[i].rating);
        dayData[day].count++;
        dayData[day].sum+=parseInt(rating);
      }

        var ctx = document.getElementById("avgChart");

        var days = ["S", "M", "T", "W", "T", "F", "S"];

        var avgData=[];//avg data array
        for(var i = 0; i < 7; ++i) {//initialize to 0
          avgData[i] = {count: 0, ratings: 0};
        }

        for (var i = 0; i < dayData.length; ++i) {
          console.log(dayData[i].count);
          console.log(dayData[i].sum);
          if(dayData[i].count==0) {
            avgData[i]=dayData[i].sum;
          }
          else {
            avgData[i] = parseInt(dayData[i].sum)/parseInt(dayData[i].count);
          }
          console.log(avgData[i]);
        }

        var formattedAvgData = {
            labels: days,
            datasets: [{
              data: avgData,
              label: "Average Rating"
              // data: [3,5,6,2]
            }]
          };

        var avgChart = new Chart(ctx,{
            type: 'bar',
            data: formattedAvgData
        });
    });
}


//var ctx = $("#myChart");

$(function() {
  getHourData();
  getDayData();
  getAveragePerDay();
});
