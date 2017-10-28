
window.onload=function(){
    function animate() {
        var c=document.getElementById("circCanvas");
        var ctx=c.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, c.width, c.height);
        if(shrink) {
           ctx.beginPath();
            ctx.arc(50, 50, i-40, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#FF0033";
            ctx.fill();
            i--;
        }
        else if(i >40) {
            ctx.beginPath();
            ctx.arc(50, 50, i-40, 0, 2 * Math.PI, true);
            ctx.fillStyle = "#FF0033";
            ctx.fill();
            i++;
        }
        else{
            i++;
        }
        if(shrink && i<40){
            shrink = false;
        }
        else if(!shrink && i>80){
            shrink = true;
        }
        ctx.restore();
        setTimeout(animate, 75);
    }
    var i = 40;
    var shrink = false;
    animate();
}//]]>  
