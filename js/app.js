var level = 0;
// Enemies our player must avoid
var Enemy = function(xCor, yCor) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xCor;
    this.y = yCor;



};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 150 * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(xCordinate, yCordinate) {
    Enemy.call(this, xCordinate, yCordinate);
    this.sprite = 'images/char-princess-girl.png';

}
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.handleInput = function(keyPressed) {
    console.log(this.x, this.y);
    if (keyPressed == 'left' && this.x > 0 && !newGame.gameOver)
        this.x -= 100;
    else if (keyPressed == 'up' && this.y > 0 && !newGame.gameOver)
        this.y -= 25;
    else if (keyPressed == 'right' && this.x <= 300 && !newGame.gameOver)
        this.x += 100;
    else if (keyPressed == 'down' && this.y <= 300 && !newGame.gameOver)
        this.y += 25;



}


var NewGame = function() {
    this.level = 0;
    this.gameOver = false;


}





// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
NewGame.prototype.checkCollisions = function() {
    for (let i = 0; i < allEnemies.length; i++) {
        if (dist(player.x, allEnemies[i].x, player.y, allEnemies[i].y) <= 50) {
            alert('Game over!' + '\nlevel you reached is ' + this.level +'\n Press OK for a new game');
            // allEnemies = [];
            //document.getElementById("demo").style.backgroundColor = "red";
           // document.getElementById("demo").innerHTML = 'Game Over'+ '  you have reached this level '+this.level;

            player.x = (Math.floor((Math.random() * 5)) * 100);
            player.y = 350;

            this.level = 0;
            document.getElementById("demo").innerHTML = 0;


            //alert('gameOver'+you reached level+newGame.level);            
        }



    }
}

NewGame.prototype.gameWin = function() {
    if (player.y <= 0) {
        this.level++;
        //alert('Welcome to the level'+' ' + this.level);
       // levelId.innerHTML=this.level;
         document.getElementById("demo").innerHTML = this.level;
        player.x = (Math.floor((Math.random() * 5)) * 100);
        player.y = 350;
        //document.removeEventListener('keyup',function(e){keyUp(e)});
    }
}


NewGame.prototype.insertBugs = function() {
    setTimeout(function() { allEnemies.push(bugLine1) }, 1000)
    setTimeout(function() { allEnemies.push(bugLine2) }, 3000)
    setTimeout(function() { allEnemies.push(bugLine3) }, 5000)
};

NewGame.prototype.checkBugs = function() {
    if (bugLine1.x > 450 || bugLine2.x > 450 || bugLine3.x > 450) {
        bugLine1.x = ((Math.floor(Math.random() * 4)) * 50)-50;
        bugLine2.x = ((Math.floor(Math.random() * 4)) * 50)-50;
        bugLine3.x = ((Math.floor(Math.random() * 4)) * 50)-50;
    }
}


var dist = function(x1, x2, y1, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);

}



var player = new Player((Math.floor((Math.random() * 5)) * 100), 350);
var allEnemies = [];
var bugLine1 = new Enemy(1, 50);
var bugLine2 = new Enemy(1, 150);
var bugLine3 = new Enemy(1, 225);
var newGame = new NewGame();


newGame.insertBugs();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) { keyUp(e) });
var keyUp = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    //console.log(e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
};
