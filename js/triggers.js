var triggers = [];

document.getElementById("hitEnter").addEventListener("click", addTrigger);
document.getElementById("iDone").addEventListener("click", iDone);


function addTrigger(){
    var c = document.getElementById("trigger").value;
    if (c == ""){
        return
    }
    else{
        for(s in triggers){
            if (triggers[s] == c){
                return;
            }
        }
        triggers.push(c);
        var ans = "";
        for(s in triggers){
            ans += triggers[s];
        }
        document.getElementById("trigger_list").innerHTML = ans;
    }
}

