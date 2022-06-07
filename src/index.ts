import * as PIXI from 'pixi.js'
import {Player} from './player'
import {Enemy} from './enemy'

let appDimensions = {
    width: 1600,
    height: 900
}

export default appDimensions;

let app:any;
let player:any;
let enemy:any;

window.onload = function () {
    app = new PIXI.Application({
        width: appDimensions.width,
        height: appDimensions.height,
        backgroundColor: 0xAAAAAA
    });

    document.body.appendChild(app.view);

    app.loader.baseUrl = "/src/assets";
    app.loader
        .add('knight', 'knight.png')
        .add('ghost', 'ghost.png');
    app.loader.onComplete.add(doneLoading);
    app.loader.load();
}

function doneLoading() {
    createPlayer();
    createEnemy();

    app.ticker.add(gameLoop);
}

function gameLoop() {
    player.keyEvents();
    player.walk(enemy);
    enemy.chasePlayer(player);

    collision(player, enemy);
}

function createPlayer() {
    player = new Player(400, 300 , app.loader.resources['knight'].texture);
    app.stage.addChild(player);
}

function createEnemy() {
    enemy = new Enemy(400, 100 , app.loader.resources['ghost'].texture);
    app.stage.addChild(enemy);
}

export function collision(a:any, b:any) {
    let obj1 = a.getBounds(); 
    let obj2 = b.getBounds();

    return obj1.x < obj2.x + obj2.width
    && obj1.x + obj1.width > obj2.x
    && obj1.y < obj2.y + obj2.height
    && obj1.y + obj1.height > obj2.y;
}