
//create function to store number of presses in an hour (in an array)
function store(r,t) {
  var d = new Date();
 
  var new_event = {date : String(d), rating : r, tag : t};//must convert date to string because chrome storage only stores primitives


  //increment day in array

  chrome.storage.sync.get({stress_events: []}, function (result) {


      var stress_events = result.stress_events;

      stress_events.push(new_event);


      // set the new array value to the same key
      chrome.storage.sync.set({"stress_events": stress_events});
  });
}

function generateTags() {
  chrome.storage.sync.get({stress_events: []}, function (result) {

      var tagSet = new Set();

      var stress_events = result.stress_events;



      for(var i = 0; i <stress_events.length; ++i) {//
        var tag = stress_events[i].tag;

        tagSet.add(tag);
      }

      let tagArray = Array.from(tagSet); //array allows random access but duplicates removed because of set
    


      for(var i = 0; i < tagArray.length; ++i) {

        var gg = document.getElementById("tags").appendChild(document.createElement('input')); //add input
        gg.setAttribute("type", "radio"); //set type
        gg.setAttribute("name","tag"); //set name
        var id = "id" + String(i);
        gg.setAttribute("id",id);//set unique id
        if(i ==0) {
          gg.setAttribute("checked", "checked");
        }

          gg.setAttribute("value",tagArray[i]);



        var span = document.getElementById("tags").appendChild(document.createElement('span'));
        var tagName = document.createTextNode(tagArray[i]);

        span.appendChild(tagName);
      }


  });
}

$(function() {
        generateTags();
});

$(function() {
    $("#hitEnter").click(function(e) {
        var rating = $('input[name=level]:checked', '#input_form').val();
        chrome.storage.sync.get({stress_events: []}, function (result) {
            if(result.stress_events.length==0) {//if no datapoints yet

              var x1 = String(new Date());
              var x2 = String(new Date());
              var x3 = String(new Date());
              var x4 = String(new Date());
              var testData = [{date : x1, rating: 1, tag:"stress"},{date :x2, rating:10, tag:"work"},{date:x3, rating:8, tag:"javascript"},{date:x4,rating: 4,tag: "github"},{date:x4,rating: 8,tag: "github"}];
              chrome.storage.sync.set({"stress_events" :  testData});

             }
            else {
              var tag = $('input[name=tag]:checked', '#input_form').val();
              if(tag!=undefined) {
                store(rating,tag);
              }

            }
        });

        //Uncomment to erase data set
    // chrome.storage.sync.clear(function() {//to clear
    // var error = chrome.runtime.lastError;
    // if (error) {
    //     console.error(error);
    // }
    // });

        
     });
});
