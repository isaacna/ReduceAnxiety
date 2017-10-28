function isAnxious() {
  var checkedBool = document.getElementById("toggle").checked;
  if(checkedBool) {
    //window.open("calm.html", "_new");
    chrome.windows.create({"url": "calm.html"}) //https://stackoverflow.com/questions/2228118/how-to-open-new-incognito-window-with-javascript-google-chrome
    store();
  }

}

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


document.getElementById("toggle").addEventListener("change", isAnxious);
//document.getElementById("toggle").addEventListener("change", store());
