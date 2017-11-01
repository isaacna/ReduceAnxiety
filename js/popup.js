

//create function to store number of presses in an hour (in an array)
function store() {
  var d = new Date();
  var day = d.getDay();
  var date = d.getDate();
  var hour = d.getHours();
  alert(date + " " + day + " " + hour);
  //increment day in array
  chrome.storage.sync.set({"dates": checkedBool});
  //to keep track of dates clear
}


document.getElementById("myBtn").addEventListener("click", function() {
  chrome.windows.create({"url": "../index.html"})
});//document.getElementById("toggle").addEventListener("change", store());
