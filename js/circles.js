function colorCalc(i){
    var reds = 0x43;
    var greens = 0xBF;
    var blues = 0xB0;
    var rede = 0xE3;
    var greene = 0xD5;
    var blue = 0x7B;
    var weight =(i-59)/30;
    weight = .01*Math.round(weight*100);
    var r = Math.round((reds*weight + rede*(1-weight))/2);
    var g = Math.round((blues*weight + blue*(1-weight))/2);
    var b = Math.round((greens*weight + greene*(1-weight))/2);
    var s = 'rgb(' + r.toString(16) +','+ g.toString(16) + ','+b.toString(16)+')';
    return s;
}

function topCircle(ctx, i, col){
    ctx.beginPath();
    ctx.arc(150, 150-40+i*.9, i-40, 0, 2 * Math.PI, true);
    ctx.stroke();
}

function bottomCircle(ctx, i, col){
    ctx.beginPath();
    ctx.arc(150, 150+40-i*.9, i-40, 0, 2 * Math.PI, true);
    ctx.stroke();
}

function leftCircle(ctx, i, col){
    ctx.beginPath();
    ctx.arc(150+40-i*.9, 150, i-40, 0, 2 * Math.PI, true);
    ctx.stroke();
}

function rightCircle(ctx, i, col){
    ctx.beginPath();
    ctx.arc(150-40+i*.9, 150, i-40, 0, 2 * Math.PI, true);
    ctx.color = col;
    ctx.stroke();
}

function centerCircle(ctx, i, col){
    ctx.beginPath();
    ctx.arc(150, 150, 2*(i-40), 0, 2 * Math.PI, true);
    ctx.fillStyle = col;
}

window.onload=function(){
    function animate() {

        var c=document.getElementById("circCanvas");
        var ctx=c.getContext("2d");
        ctx.save();
        ctx.clearRect(0, 0, c.width, c.height);
       
        ctx.translate(150,150);
        ctx.rotate(2*Math.PI*(30/(30-i)));
        ctx.translate(-150, -150);
        
        // var col = colorCalc(i);
        var col = 0x8D9887;
        

        centerCircle(ctx, i, col);
        leftCircle(ctx, i, col);
        rightCircle(ctx, i, col);
        topCircle(ctx, i, col);
        bottomCircle(ctx, i, col);
        
        
        if(shrink) {
            
            i--;
        }
        else{
            i++;
        }
        var extra = 0;
        if(i <= 60){
            extra = 1;
            shrink = false;
            document.getElementById("some1").innerHTML = '<p class="in" ></p><br>';

        }
        else if (i >= 90){
            extra = 1.5;
            shrink = true;
            document.getElementById("some1").innerHTML = '<p class="in" ></p><br>';
        }
        if(i == 62 && !shrink){
            document.getElementById("some1").innerHTML = '<p class="in" >inhale..</p><br>';
        }
        if(i == 89 && shrink){
            document.getElementById("some1").innerHTML = '<p class="in" >and exhale..</p><br>';
        }
        ctx.restore();
        setTimeout(animate, 75 + 1000*extra);
        
        
    }
    var i = 60;
    var shrink = false;
    animate();
}//]]>