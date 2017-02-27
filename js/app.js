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
       if(keyPressed=='left'&& this.x>0)
        this.x-=100;
    else if (keyPressed=='up'&&this.y>0)
        this.y-=50;
    else if (keyPressed=='right'&&this.x<=300)
        this.x+=100;
    else if(keyPressed=='down'&&this.y<=300)
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
            alert('over');
            
            //alert('gameOver'+you reached level+newGame.level);            
        }



    }
}

var dist=function(x1,x2,y1,y2)
{ 
    var a=x1-x2;
    var b=y1-y2;
    return Math.sqrt( a*a + b*b );

}

var bugLine1= new Enemy(2,50);
var bugLine2=new Enemy(2,150);
var bugLine3=new Enemy(2,225);




var player= new Player((Math.floor((Math.random() * 5) )*100),350);


// NewGame.prototype.addBugs=function()
// {
//                 allEnemies.push(this.bugLine1);

//             allEnemies.push(this.bugLine2);

//             allEnemies.push(this.bugLine3)



        
            
// }
var allEnemies=[];
allEnemies.push(bugLine1)
allEnemies.push(bugLine2)
allEnemies.push(bugLine3)

//newGame.addBugs();
//allEnemies.push(player.bugLine1);





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

         //console.log(e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
});