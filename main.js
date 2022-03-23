var Enemy;
var Red;
var RedHealth = 10;
var time = 40;
function startGame() {
    Enemy = new component(10, 10, "black", 460, 250);
    Red = new component(10, 10, "red", 50,50);
    myGameArea.start();
}



var myGameArea = {
    canvas : document.getElementById("canvas1"),
    start : function() {
        setInterval(function(){
          RedHealth--;
        },4000);
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.color = color;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color; ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();    
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        

        
    }
    this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
    
    
}

function updateGameArea() {
    if (Red.crashWith(Enemy)) {
    myGameArea.stop();
    if(confirm("Red won the battle.\nWould you like to play another game?")){
        location.reload();
    }
    document.getElementById("Px").innerHTML = "Red Wins!";
    document.getElementById("Px").style.fontSize = "17px";
    document.getElementById("Py").style.fontSize = "12px";
    document.getElementById("Py").innerHTML = "Reload the window to play again.";
    
  } else if (RedHealth == 0){
    myGameArea.stop();
    if(confirm("The Challenger won the battle coz Red didn't tag him in time.\nWould you like to play another game?")){
        location.reload();
    } 
    document.getElementById("Px").innerHTML = "The Challenger Wins!";
    document.getElementById("Px").style.fontSize = "17px";
    document.getElementById("Py").style.fontSize = "12px";
    document.getElementById("Py").innerHTML = "Reload the window to play again.";

} else {
    myGameArea.clear();
    Red.moveAngle = 0;
    Red.speed = 0;
    Enemy.moveAngle = 0;
    Enemy.speed = 0;
    if (myGameArea.keys && myGameArea.keys[65]) {Red.moveAngle = -2; }
    if (myGameArea.keys && myGameArea.keys[68]) {Red.moveAngle = 2; }
    if (myGameArea.keys && myGameArea.keys[87]) {Red.speed= 1; }
    if (myGameArea.keys && myGameArea.keys[83]) {Red.speed= -1; }
    if (myGameArea.keys && myGameArea.keys[37]) {Enemy.moveAngle=-2; }
    if (myGameArea.keys && myGameArea.keys[39]) {Enemy.moveAngle=2; }
    if (myGameArea.keys && myGameArea.keys[38]) {Enemy.speed=1; }
    if (myGameArea.keys && myGameArea.keys[40]) {Enemy.speed=-1; }
    if (myGameArea.keys && myGameArea.keys[27]) {Red.color = lime; Enemy.color = white;}
    
    Red.newPos();   
    Red.update();
    Enemy.update();
    Enemy.newPos();
    }
    
}
