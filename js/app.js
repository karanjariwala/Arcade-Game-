var level=0;
// Enemies our player must avoid
var Enemy = function(xCor,yCor) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=xCor;
    this.y=yCor;

        

    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x += 100*dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player=function(xCordinate,yCordinate)
{
       Enemy.call(this,xCordinate,yCordinate);
        this.sprite='images/char-boy.png';

}
Player.prototype=Object.create(Enemy.prototype);
Player.prototype.constructor=Player;
Player.prototype.update=function(){};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.handleInput=function(keyPressed){
    console.log(this.x,this.y);
       if(keyPressed=='left'&& this.x>0&&!gameOver)
        this.x-=100;
    else if (keyPressed=='up'&&this.y>0&&!gameOver)
        this.y-=50;
    else if (keyPressed=='right'&&this.x<=300&&!gameOver)
        this.x+=100;
    else if(keyPressed=='down'&&this.y<=300&&!gameOver)
        this.y+=50;
     


}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var checkCollisions=function(){
    for(let i=0;i<allEnemies.length;i++)
    {
        if(dist(player.x,allEnemies[i].x,player.y,allEnemies[i].y)<=50)
        {
            alert('over'+'level you reached is '+level);
            allEnemies=[];
            player=null;
            level=0;
            gameOver=true;
            
            //alert('gameOver'+you reached level+newGame.level);            
        }



    }
}

var gameWin=function()
{
    if(player.y==0)
    {   

        alert('win');
        level++;
        player.x=(Math.floor((Math.random() * 5) )*100);
        player.y=350;
        //document.removeEventListener('keyup',function(e){keyUp(e)});
    }
}

var dist=function(x1,x2,y1,y2)
{ 
    var a=x1-x2;
    var b=y1-y2;
    return Math.sqrt( a*a + b*b );

}

var bugLine1= new Enemy(1,50);
var bugLine2=new Enemy(1,150);
var bugLine3=new Enemy(1,225);


var gameOver=false;

var player= new Player((Math.floor((Math.random() * 5) )*100),350);
var allEnemies=[];

var insertBugs=function()
{
setTimeout(function(){allEnemies.push(bugLine1)},1000)
setTimeout(function(){allEnemies.push(bugLine2)},2000)
setTimeout(function(){allEnemies.push(bugLine3)},3000)
};

var checkBugs=function()
{
    if(bugLine1.x>400||bugLine2.x>400||bugLine3.x>400)
        {   bugLine1.x=(Math.floor(Math.random()*4))*50;
            bugLine2.x=(Math.floor(Math.random()*4))*50;
            bugLine3.x=(Math.floor(Math.random()*4))*50;
            }
}


insertBugs();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e){keyUp(e)});
    var keyUp=function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

         //console.log(e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
};
