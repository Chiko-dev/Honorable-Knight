import * as PIXI from 'pixi.js'
import appDimensions from './index'

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
        let boundries = this.getBounds();
        
        if (keys["37"]) { //left
            if (boundries.x >= 0) {
                this.x -= 5;
            }
        }
        
        if (keys["38"]) { //up
            if (boundries.y >= 0){
                this.y -= 5;
            }
        }
        
        if (keys["39"]) { //right
            if (boundries.x <= appDimensions.width - boundries.width ){
                this.x += 5;
            }
        }
        
        if (keys["40"]) { //down
            if (boundries.y <= appDimensions.height - boundries.height ){
                this.y += 5;
            }
        }
    }
}