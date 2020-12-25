class Arrow {
    constructor(x, y){
        this.laser = createSprite(x, y);
        this.laser.y += -6;
    }
    display(){
        drawSprites();
    }
}