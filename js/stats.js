Chart.defaults.global.defaultColor = 'white';
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontFamily = "'Open Sans', san-serif";
Chart.defaults.global.legend.display = false;


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
              backgroundColor: 'white',
              borderColor: 'white',
              label: "Stress Events"
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

        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        var formattedDayData = {
            labels: days,
            datasets: [{
              backgroundColor: 'white',
              borderColor: 'white',
              data: dayData,
              label: "Stress Events"
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

        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
              backgroundColor: 'white',
              borderColor: 'white',
              label: "Average Rating"
            }]
          };

        var avgChart = new Chart(ctx,{
            type: 'bar',
            data: formattedAvgData
        });
    });
}

function getTagCount() {


  chrome.storage.sync.get({stress_events: []}, function (result) {
      // the input argument is ALWAYS an object containing the queried keys
      var stress_events = result.stress_events;

      var tagSet = new Set();

      // set the new array value to the same key
      for(var i = 0; i < result.stress_events.length; ++i) {

        tagSet.add(result.stress_events[i].tag);

      }
        var counts = [];
        for(var i = 0; i < tagSet.size; ++i){
          counts[i]=0;
        }

// debugger;
        let tagArray = Array.from(tagSet);
        for(var i = 0; i < result.stress_events.length; ++i){
          for(var j = 0; j< tagArray.length; ++j){
            if(result.stress_events[i].tag==tagArray[j]) {
              counts[j]++;
            }
          }
        }

        var ctx = document.getElementById("tagChart");
        console.log(tagArray);
        console.log(counts);

        var formattedTagData = {
            labels: tagArray,
            datasets: [{
              data: counts,
              backgroundColor: 'white',
              borderColor: 'white',
              label: "Tag Counts"
            }]
          };

        var tagChart = new Chart(ctx,{
            type: 'bar',
            data: formattedTagData,
            options: {
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{

                    stacked: true

                }]
            }
            }
        });
    });
}


$(function() {
  getHourData();
  getDayData();
  getAveragePerDay();
  getTagCount();
});
