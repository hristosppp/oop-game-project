window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

class Game {
    constructor(){
        this.player = null;
        this.obstacleOneArr = [];
        this.obstacleTwoArr = [];
        this.obstacleThreeArr = [];
        this.newBullet = null;
        this.bulletArr = [];


    }
    start(){
        this.player = new Player();
        this.addEventList();

        setInterval(() => {
            const newObst = new Obstacle ();
            newObst.obstacleOne();
            this.obstacleOneArr.push(newObst);

        }, 2000)
        setInterval(() => {
            const newObst = new Obstacle ();
            newObst.obstacleTwo();
            this.obstacleTwoArr.push(newObst);
        }, 3500)
        setInterval(() => {
            const newObst = new Obstacle ();
            newObst.obstacleThree();
            this.obstacleThreeArr.push(newObst);

        }, 5000)

        setInterval(() => {
            this.obstacleOneArr.forEach((element) => {
                element.moveDown();
                this.detectCollision(element);
                this.removeObstacle(element, this.obstacleOneArr);
            })
        }, 30)
        setInterval(() => {
            this.obstacleTwoArr.forEach((element) => {
                element.moveDown();
                this.detectCollision(element);
                this.removeObstacle(element, this.obstacleTwoArr);
            })
        }, 70)
        setInterval(() => {
            this.obstacleThreeArr.forEach((element) => {
                element.moveDown();
                this.detectCollision(element);
                this.removeObstacle(element, this.obstacleThreeArr);
               
            })
        }, 50)
    }
    addEventList(){
        document.addEventListener("keydown", (event) => {
            if(event.code === "ArrowLeft"){
                this.player.moveLeft();
            }else if(event.code === "ArrowRight"){
                this.player.moveRight();
            }else if(event.key === "ArrowDown"){
                this.player.moveDown();
            }else if(event.key === "ArrowUp"){
                this.player.moveUp();
            }else if(event.key === "ArrowLeft" && event.key === "ArrowDown"){
                this.player.moveDiagonalyDownLeft();
            }else if(event.key === "ArrowLeft" && event.key === "ArrowUp"){
                this.player.moveDiagonalyUpLeft();
            }else if(event.key === "ArrowRight" && event.key === "ArrowDown"){
                this.player.moveDiagonalyDownRight();
            }else if(event.key === "ArrowRight" && event.key === "ArrowUp"){
                this.player.moveDiagonalyUpRight();
            }else if(event.key === " "){
                this.shooting();
            }
        })
    }
    detectCollision(obstacle){
        if(
            this.player.positionX < obstacle.positionX + obstacle.width &&
            this.player.positionX + this.player.width > obstacle.positionX &&
            this.player.positionY < obstacle.positionY + obstacle.height &&
            this.player.height + this.player.positionY > obstacle.positionY
        ){

                console.log("Game Over")
            
        }

    }
    removeObstacle(elm,arr){
        if(elm.positionY <= 0){
            elm.obstacle.remove();
            arr.shift(elm);
            
        }
    }
    shooting(){
        this.bulletArr.push(this.player.createBullet());
        setInterval(() => {
        
                this.player.bulletUp();
            

        }, 16)

    }
}

class Player {
    constructor(){
        this.positionX = 34;
        this.positionY = 0;
        this.width = 5;
        this.height= 12;
        this.playerE = document.getElementById("player");
        this.playerE.style.width = this.width +"vw";
        this.playerE.style.height = this.height +"vh";
        this.bulletPositionY =  this.positionY + (this.height/2);
      
    }
    moveLeft(){
        if(this.positionX > 0){
            this.positionX--;
            this.playerE.style.left = this.positionX + "vw";
        } 
    }
    moveRight(){
        if(this.positionX < 70 - this.width){
            this.positionX++;
            this.playerE.style.left = this.positionX + "vw";
        }
       
    }
    moveUp(){
        if(this.positionY < 70 - this.height){
            this.positionY++;
            this.playerE.style.bottom = this.positionY + "vh";
        }
       
    }
    moveDown(){
        if(this.positionY > 0){
            this.positionY--;
            this.playerE.style.bottom = this.positionY + "vh";
        }
       
    }
    moveDiagonalyUpRight(){
        this.positionX++;
        this.positionY++;
        this.playerE.style.left = this.positionX + "vw";
        this.playerE.style.bottom = this.positionY + "vh";
    }
    moveDiagonalyUpLeft(){
        this.positionX--;
        this.positionY++;
        this.playerE.style.left = this.positionX + "vw";
        this.playerE.style.bottom = this.positionY + "vh";
    }
    moveDiagonalyDownLeft(){
        this.positionX--;
        this.positionY--;
        this.playerE.style.left = this.positionX + "vw";
        this.playerE.style.bottom = this.positionY + "vh";
    }
    moveDiagonalyDownRight(){
        this.positionX++;
        this.positionY--;
        this.playerE.style.left = this.positionX + "vw";
        this.playerE.style.bottom = this.positionY + "vh";
    }
    createBullet(){
        this.bullet = document.createElement("div");
        this.bullet.className = "bullet";
        this.bullet.style.left = this.positionX + (this.width/2) + "vw";
        this.bullet.style.bottom = this.bulletPositionY + "vh";

        const parElm = document.getElementById("playground");
        parElm.appendChild(this.bullet);
      
    }
    bulletUp(){
        this.bulletPositionY++;
        this.bullet.style.bottom =  this.bulletPositionY + "vh";
    }
}


class Obstacle {
    constructor(){
        this.positionY = 70;
        this.width = 10;
        this.height = 14;
        this.positionX = Math.floor(Math.random() * (85 - 15 - this.width));
        
        this.obstacle = null;

       
    }
    obstacleOne(){
        this.createObstacle();
        
        this.obstacle.id = "obstOne";

    }
    obstacleTwo(){
        this.createObstacle();
        this.obstacle.id = "obstTwo";
        

    }
    obstacleThree(){
        this.createObstacle();
        this.obstacle.id = "obstThree";

    }
    createObstacle(){
        this.obstacle = document.createElement("div");
        this.obstacle.style.width = this.width + "vw";
        this.obstacle.style.height = this.height + "vh";
        this.obstacle.style.left = this.positionX + "vw";
        const parElm = document.getElementById("playground");
        parElm.appendChild(this.obstacle);
    }
    moveDown() {

            this.positionY--;
            this.obstacle.style.bottom = this.positionY + "vh";
    }
}

const game = new Game();
game.start();
console.log(game.bulletArr);