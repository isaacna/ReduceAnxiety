//create function to store number of presses in an hour (in an array)
function store(rating) {
  var d = new Date();
  console.log(d.getDate());

  //var new_event = {date: d, rating: rating};
  var new_event = {date : d, rating : rating};

  console.log(new_event);
  //increment day in array

  chrome.storage.sync.get({stress_events: []}, function (result) {
      // the input argument is ALWAYS an object containing the queried keys
      // so we select the key we need
    //  console.log("Old " + stress_events);

      var stress_events = result.stress_events;
      console.log("Existing:");
      for(var i = 0; i <stress_events.length; ++i) {//old
        console.log(stress_events[i].date + " " + stress_events[i].rating);
      }

      stress_events.push(new_event);
      for(var i = 0; i <stress_events.length; ++i) {// new
        console.log(stress_events[i].date + " " + stress_events[i].rating);
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
