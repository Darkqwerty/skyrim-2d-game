import './index.scss';
import person from './assets/Female-3-Walk.png';
import mapOutdoorSpring from './assets/outdoors-spring.png';
import { moveButtons, spriteW, spriteH, startCoordX, startCoordY, shots, canvasW, canvasH } from './const';
import { mapSprite } from './mapSprites';
import { getRandom } from './Util';

const canvas = document.getElementById('game');
const bgrmap = document.getElementById('map');
const ctx = [];
ctx['person'] = canvas.getContext('2d');
ctx['map'] = bgrmap.getContext('2d');

const map = document.createElement('img');
map.src = mapOutdoorSpring;

const img = document.createElement('img');
img.src = person;

let cycle = 0;
let direction = 0;
let pX = startCoordX;
let pY = startCoordY;

let upPressed = false;
let rightPressed = false;
let bottomPressed = false;
let leftPressed = false;

function changeStateMovements(key, moveState) {
    switch (key) {
        case moveButtons.Up:
        case moveButtons.AltUp:
            upPressed = moveState;
            break;
        case moveButtons.Right:
        case moveButtons.AltRight:
            rightPressed = moveState;
            break;
        case moveButtons.Down:
        case moveButtons.AltDown:
            bottomPressed = moveState;
            break;
        case moveButtons.Left:
        case moveButtons.AltLeft:
            leftPressed = moveState;
            break;
        default:
            upPressed = false;
            rightPressed = false;
            bottomPressed = false;
            leftPressed = false;
            break;
    }
}

function keyDownHandler(event) {
    changeStateMovements(event.key, true);
}

function keyUpHandler(event) {
    changeStateMovements(event.key, false);
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

img.addEventListener('load', () => {
    setInterval(() => {
        if (upPressed && pY > 0) {
            pY -= 10;
            direction = spriteH * 3;
        }

        if (rightPressed && pX < canvasW - spriteW) {
            pX += 10;
            direction = spriteH * 2;
        }

        if (bottomPressed && pY < canvasH - spriteH) {
            pY += 10;
            direction = spriteH * 0;
        }

        if (leftPressed && pX > 0) {
            pX -= 10;
            direction = spriteH * 1;
        }

        if (upPressed || rightPressed || bottomPressed || leftPressed) {
            cycle = (cycle + 1) % shots;
        }

        ctx['person'].clearRect(0, 0, canvasW, canvasH);
        ctx['person'].drawImage(img, cycle * spriteW, direction, spriteW, spriteH, pX, pY, spriteW, spriteH);
    }, 120);
});

const mapSpriteSize = 16;
const spriteCountPerSide = Math.ceil(canvasW / mapSpriteSize);
console.log(mapSprite.grass.x);

map.addEventListener('load', () => {
    for (let mX = 0; mX < spriteCountPerSide; mX++) {
        for (let mY = 0; mY < spriteCountPerSide; mY++) {
            const randomGrass = getRandom(3);
            ctx['map'].drawImage(
                map, 
                mapSprite.grass[randomGrass].x, 
                mapSprite.grass[randomGrass].y, 
                mapSpriteSize, 
                mapSpriteSize, 
                mX * mapSpriteSize, 
                mY * mapSpriteSize, 
                mapSpriteSize, 
                mapSpriteSize
            );
        }        
    }    
});


