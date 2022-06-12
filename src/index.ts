import * as PIXI from 'pixi.js'
import {Player} from './player'
import {Enemy} from './enemy'

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let appDimensions = {
    width: 1550,
    height: 850
}

export default appDimensions;

export let app:any;
let player:any;
let enemy:any;
let tileset:any; 
export const tileSize:number = 16;
export let SCALE = 5.4;

export let map = {
    width: 18,
    height: 12,
    tiles: [
        61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
        61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
        61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
        61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
        61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
        61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
        61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
        61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    ],
    collision: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]
}

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
        .add('ghost', 'ghost.png')
        .add('tileset', 'tiles.png')
        .add('character', 'idleCharacter.png');
    app.loader.onComplete.add(doneLoading);
    app.loader.load();
}

function doneLoading() {
    createStage();
    createPlayer();
    createEnemy();

    app.ticker.add(gameLoop);
}

function gameLoop() {
    player.keyEvents();
    player.walk(enemy);
    player.playerGravity();
    enemy.chasePlayer(player);

    collision(player, enemy);
}

function createPlayer() {
    player = new Player(80, 80 , app.loader.resources['character'].texture, 0, 0);
    app.stage.addChild(player);
}

function createEnemy() {
    enemy = new Enemy(400, 100 , app.loader.resources['ghost'].texture);
    app.stage.addChild(enemy);
}

function createStage() { 
    let tileTextures:any = [];
    
    for (let i = 0; i < 11 * 7; i++) { // width 11 , height 7
        let x = i % 11;
        let y = Math.floor(i / 11);
        
        tileTextures[i] = new PIXI.Texture(
            app.loader.resources['tileset'].texture,
            new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
        );
    }

    let background:any = new PIXI.Container();
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            let tile = map.tiles[y * map.width + x];
            let sprite = new PIXI.Sprite(tileTextures[tile]);

            sprite.x = x * tileSize;
            sprite.y = y * tileSize;

            background.addChild(sprite);
        }
    }

    background.scale.x = SCALE;
    background.scale.y = SCALE;
    app.stage.addChild(background);
}

export function collision(a:any, b:any) {
    let obj1 = a.getBounds(); 
    let obj2 = b.getBounds();

    return obj1.x < obj2.x + obj2.width
    && obj1.x + obj1.width > obj2.x
    && obj1.y < obj2.y + obj2.height
    && obj1.y + obj1.height > obj2.y;
}

export function testCollision(worldX:number, worldY:number) { 
    let mapX = Math.floor(worldX / tileSize / SCALE);// 0
    let mapY = Math.floor(worldY / tileSize / SCALE);// 8
    return map.collision[mapY * map.width + mapX];
}