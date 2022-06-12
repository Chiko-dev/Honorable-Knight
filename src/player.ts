import * as PIXI from 'pixi.js'
import appDimensions from './index'
import { tileSize } from "./index"
import { testCollision } from "./index"
import { SCALE } from "./index"

let keys:any = {};

export class Player extends PIXI.Sprite {
    vx: number;
    vy: number;
    touchingGround: any;
    singleJump:boolean;
    constructor(x:number, y:number, texture:any, vy:number, vx:number) {
        super(texture);
        this.anchor.set(0.5)
        this.scale.x = SCALE;
        this.scale.y = SCALE;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.touchingGround = testCollision(
            this.x,
            this.y + tileSize * 2 + 1
        )
        this.singleJump == false;
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
            if (boundries.y >= 0) {
                this.singleJump = true;
                this.vy = -10;
            }
        }

        
        
        
        if (keys["39"]) { //right
            if (boundries.x <= appDimensions.width - boundries.width ){
                this.x += 5;
            }
        }

        if (this.touchingGround){
            if (keys["40"]) { //down
                if (boundries.y <= appDimensions.height - boundries.height ){
                    this.y += 5;
                }
            }
        }
    }

    playerGravity() {
        this.vy = this.vy + 1;
        this.x += this.vx;

        if (this.vy > 0) {
            for (let i = 0; i < this.vy; i++) {
                let testX1 = this.x / tileSize;
                let testX2 = this.x / tileSize - 1;
                let testY = this.y + tileSize * 2;

                if (testCollision(testX1, testY) || testCollision(testX2, testY)){
                    this.vy = 0;
                    break;
                }
                this.y = this.y + 1;
            }
        }

        if (this.vy < 0) {
            this.y += this.vy;
        }
    }

    playerWallCollision() {

    }
}

function e(e: any): any {
    throw new Error('Function not implemented.')
}
