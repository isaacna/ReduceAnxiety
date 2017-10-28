
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


//var ctx = $("#myChart");

$(function() {
  getHourData();
  getDayData();
});
