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
        this.bulletArr = [];
        this.bullet.positionX = this.player.positionX + (this.player.width/ 2) + "vw";
        this.bullet.positionY = this.player.positionY + this.player.height + "vh";
    }
    start(){
        this.player = new Player();
        this.addEventList();

        setInterval(() => {
            const newObst = new Obstacle ();
            newObst.createObstacleOne();
            this.obstacleOneArr.push(newObst);

        }, 2000)
        setInterval(() => {
            const newObst = new Obstacle ();
            newObst.createObstacleTwo();
            this.obstacleTwoArr.push(newObst);
        }, 3500)
        setInterval(() => {
            const newObst = new Obstacle ();
            newObst.createObstacleThree();
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
        setInterval(() => {
            this.bulletArr.forEach((element) => {
                console.log("so weit bin ich schon mal")
                element.this.moveUp();
            }, 12)
        })
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
                this.shoot();
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
            if(this.player.health > 1){
                this.player.health--;
                
            }else{
                console.log("Game Over")
            }
        }

    }
    removeObstacle(elm,arr){
        if(elm.positionY <= 0){
            elm.obstacle.remove();
            arr.shift(elm);
            
        }
    }
    shoot(){
        this.bullet = document.createElement("div");
        this.bullet.className = "bullet";
        this.bullet.style.left = this.bullet.positionX;
        this.bullet.style.bottom = this.bullet.positionY;
        const parElement = document.getElementById("playground");
        parElement.appendChild(this.bullet);
        this.bulletArr.push(this.bullet);
    }
    moveUp(){
        this.bullet.positionY++;
        this.bullet.style.bottom = this.bullet.positionY + "vh";
    }
}

class Player {
    constructor(){
        this.positionX = 34;
        this.positionY = 0;
        this.width = 7;
        this.height= 7;
        this.playerE = document.getElementById("player");
        this.playerE.style.width = this.width +"vw";
        this.playerE.style.height = this.height +"vh";
        this.health = 3;


       
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
    
}


class Obstacle {
    constructor(){
        this.positionY = 70;
        this.width = 10;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (85 - 15 - this.width));
        
        this.obstacle = null;

       
    }
    createObstacleOne(){
        this.obstacle = document.createElement("div");

        this.obstacle.className = "obstacles";
    
        this.obstacle.style.width = this.width + "vw";
        this.obstacle.style.height = this.height + "vh";
        this.obstacle.style.left = this.positionX + "vw";

        const parElm = document.getElementById("playground");
        parElm.appendChild(this.obstacle);
    }
    createObstacleTwo(){
        this.obstacle = document.createElement("div");

        this.obstacle.className = "obstacles";

        this.obstacle.style.width = this.width + "vw";
        this.obstacle.style.height = this.height + "vh";
        this.obstacle.style.left = this.positionX + "vw";
        this.obstacle.style.backgroundColor = "white";
        

        const parElm = document.getElementById("playground");
        parElm.appendChild(this.obstacle);
    }
    createObstacleThree(){
        this.obstacle = document.createElement("div");

        this.obstacle.className = "obstacles";

        this.obstacle.style.width = this.width + "vw";
        this.obstacle.style.height = this.height + "vh";
        this.obstacle.style.left = this.positionX + "vw";
        this.obstacle.style.backgroundColor = "pink";
        

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