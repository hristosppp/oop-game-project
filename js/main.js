class Game {
    constructor(){
        this.player = null;
        
    }
    start(){
        this.player = new Player();
        this.addEventList();
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
            }   
        })
    }
}

class Player {
    constructor(){
        this.positionX = 38;
        this.positionY = 0;
        this.width = 5;
        this.height= 5;
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
        if(this.positionX < 80 - this.width){
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

const game = new Game();
game.start();

console.log("hello")