import * as PIXI from 'pixi.js'
import { Player } from "./player"
import { collision }  from "./index"

export class Enemy extends PIXI.Sprite {
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

    chasePlayer(player: Player) {
        if (collision(player, this) != true) {
            if (player.getX() > this.x) {
                this.x++;
            }
            if (player.getX() < this.x) {
                this.x--;
            }
            if (player.getY() > this.y) {
                this.y++;
            }

            if (player.getY() < this.y) {
                this.y--;
            } 
        }
    }
}