//create function to store number of presses in an hour (in an array)
function store(r) {
  var d = new Date();
  console.log(d.getDate());

  var x = 69;

  //var new_event = {date: d, rating: rating};
  var new_event = {date : String(d), rating : r};//must convert date to string because chrome storage only stores primitives

  console.log(new_event);
  //increment day in array

  chrome.storage.sync.get({stress_events: []}, function (result) {
      // the input argument is ALWAYS an object containing the queried keys
      // so we select the key we need
    //  console.log("Old " + stress_events);

      var stress_events = result.stress_events;
      console.log("Existing:");
      for(var i = 0; i <stress_events.length; ++i) {//old
        var tempDate = new Date(stress_events[i].date);
        console.log(tempDate.getDay());
        console.log(stress_events[i].rating);
      }

      stress_events.push(new_event);
      for(var i = 0; i <stress_events.length; ++i) {// new
        var tempDate = stress_events[i].date;
        var tempDate = new Date(stress_events[i].date);
        console.log(tempDate.getDay());
        console.log(stress_events[i].rating);
      }

      //console.log("New " + stress_events);

      // set the new array value to the same key
      chrome.storage.sync.set({"stress_events": stress_events});
  });
}

$(function() {
  console.log("FUFHFFJFFJFJ");
    $("#hitEnter").click(function(e) {
        var rating = $('input[name=level]:checked', '#input_form').val();
        console.log(rating);


//         chrome.storage.sync.clear(function() {//to clear
//     var error = chrome.runtime.lastError;
//     if (error) {
//         console.error(error);
//     }
// });
        store(rating);
        $("#input_form").hide();
        //$("#second").show();
     });
});
