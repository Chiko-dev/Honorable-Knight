import * as PIXI from 'pixi.js'

export class Enemy extends PIXI.Sprite {
    constructor(x:number, y:number, texture:any) {
        super(texture);
        this.anchor.set(0.5)
        this.scale.x = 0.3;
        this.scale.y = 0.3;
        this.x = x;
        this.y = y;
        
    }

    chasePlayer() {

    }
}

