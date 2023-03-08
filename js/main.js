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
        this.bulletsArr = [];
        this.firstUfo = 0;
        this.secondUfo = 0;
        this.spyBalon = 0;


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

        setInterval(() => {
            this.bulletsArr.forEach((element) => {
                element.bulletMovement();
                this.detectBulletCollision(element, this.obstacleOneArr);
                this.detectBulletCollision(element, this.obstacleTwoArr);
                this.detectBulletCollision(element, this.obstacleThreeArr);

                this.removeBullet(element, this.bulletsArr);
            }, 35)
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
               // alert("Game Over")   
        }
    }
    removeObstacle(elm,arr){
        if(elm.positionY <= 0){
            elm.obstacle.remove();
            arr.shift(elm);
            
        }
    }
    shooting(){
        this.shoot = new Shooting(this.player.positionX, this.player.positionY);
        this.bulletsArr.push(this.shoot);
    }
    removeBullet(element, arr){
        if(element.positionY >= 76){
            element.bullet.remove();
            arr.shift(element);
        }
    }

    detectBulletCollision(element, arr){
        arr.forEach((obstacle, index) => {
            if(
                element.positionX < obstacle.positionX + obstacle.width &&
                element.positionX + element.width > obstacle.positionX &&
                element.positionY < obstacle.positionY + obstacle.height &&
                element.height + element.positionY > obstacle.positionY
            ){  
                arr[index].obstacle.remove();
                arr.splice(index, 1);

                if(arr === this.obstacleOneArr){
                    this.firstUfo++;
                    this.countPoints("one");
                }else if(arr === this.obstacleTwoArr){
                    this.secondUfo++;
                    this.countPoints("two");
                }else if(arr === this.obstacleThreeArr){
                    this.spyBalon++;
                    this.countPoints("three");
                } 
            }
        })
        
    }
    countPoints(value){
        if(value  === "one"){
            const ele = document.getElementById("one");
            ele.innerHTML = parseInt(this.firstUfo);
        }else if(value === "two"){
            const ele = document.getElementById("two");
            ele.innerHTML = parseInt(this.secondUfo);
        }else if(value === "three"){
            const ele = document.getElementById("three");
            ele.innerHTML = parseInt(this.spyBalon);
        }

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

class Shooting {
    constructor(positionX, positionY){
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = 2;
        this.height = 4;
        this.bullet = null;

        this.createBullet();

    }
    createBullet(){
        this.bullet = document.createElement("div");
        this.bullet.className = "bullet";
        this.bullet.style.left = this.positionX + (this.width/2) + "vw";
        this.bullet.style.bottom = this.positionY+ this.height + "vh";
        this.bullet.style.height = this.height + "vh";
        this.bullet.style.width = this.width + "vw";

        const parElm = document.getElementById("playground");
        parElm.appendChild(this.bullet);
    }
    bulletMovement(){
        this.positionY++;
        this.bullet.style.bottom = this.positionY+ this.height + "vh";
    }
}


const game = new Game();
game.start();
