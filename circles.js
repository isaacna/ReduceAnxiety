function topCircle(ctx, i){
    ctx.beginPath();
    ctx.arc(150, 150-41+i, i-40, 0, 2 * Math.PI, true);
    ctx.stroke();
}

function bottomCircle(ctx, i){
    ctx.beginPath();
    ctx.arc(150, 150+41-i, i-40, 0, 2 * Math.PI, true);
    ctx.stroke();
}

function leftCircle(ctx, i){
    ctx.beginPath();
    ctx.arc(150+41-i, 150, i-40, 0, 2 * Math.PI, true);
    ctx.stroke();
}

function rightCircle(ctx, i){
    ctx.beginPath();
    ctx.arc(150-41+i, 150, i-40, 0, 2 * Math.PI, true);
    ctx.stroke();
}

function centerCircle(ctx, i){
    ctx.beginPath();
    ctx.arc(150, 150, i-40, 0, 2 * Math.PI, true);
    ctx.stroke();
    //ctx.fillStyle = "#FF0033";
    //ctx.fill();
}

window.onload=function(){
    function animate() {
        var c=document.getElementById("circCanvas");
        var ctx=c.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, c.width, c.height);
        centerCircle(ctx, i);
            leftCircle(ctx, i);
            rightCircle(ctx, i);
            topCircle(ctx, i);
            bottomCircle(ctx, i);
        if(shrink) {
            
            i--;
        }
        else{
            i++;
        }
        var extra = 0;
        if(i <= 40){
            shrink = false;
        }
        else if (i >= 80){
            extra = 1;
            shrink = true;
        }
        ctx.restore();
        setTimeout(animate, 75 + 2000*extra);
        
    }
    var i = 40;
    var shrink = false;
    animate();
}//]]>  
