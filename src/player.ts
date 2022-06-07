import * as PIXI from 'pixi.js'

let keys:any = {};

export class Player extends PIXI.Sprite {
    constructor(x:number, y:number, texture:any) {
        super(texture);
        this.anchor.set(0.5)
        this.scale.x = 0.3;
        this.scale.y = 0.3;
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    keyEvents() {
        window.addEventListener("keydown", this.keyDown)
        window.addEventListener("keyup", this.keyUp)
    }

    keyDown(e:any) {
        keys[e.keyCode] = true;
    }

    keyUp(e:any) {
        keys[e.keyCode] = false;
    }

    walk() {
        //left
        if (keys["37"]) {
            if (this.x >= 25) {
                this.x -= 5;
            }
        }
        //up
        if (keys["38"]) {
            if (this.y >= 25){
                this.y -= 5;
            }
        }
        //right
        if (keys["39"]) {
            if (this.x <= (800 - 25 )){
                this.x += 5;
            }
        }
        //down
        if (keys["40"]) {
            if (this.y <= (600 - 25 )){
                this.y += 5;
            }
        }
    }
}

