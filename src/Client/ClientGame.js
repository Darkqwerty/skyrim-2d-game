import ClientEngine from "./ClientEngine";
import ClientWorld from "./ClientWorld";
import sprites from '../configs/sprites';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json'

class ClientGame {
    constructor(cfg) {
        Object.assign(this, {
            cfg,
            gameObjects,
            player: null,
        });

        this.engine = this.createEngine();
        this.world = this.createWorld();
        this.initEngine();
    }

    createEngine() {
        return new ClientEngine(document.getElementById(this.cfg.tagId));
    }

    createWorld() {
        return new ClientWorld(this, this.engine, levelCfg);
    }

    initEngine() {
        this.engine
            .loadSprites(sprites)
            .then(() => {
                this.world.init();
                this.engine.on('render', (_, timestamp) => {
                    this.world.render(timestamp);
                });
                this.engine.start();
                this.initKeys();
        });        
    }

    setPlayer(player) {
        this.player = player;
    }

    initKeys() {
        this.engine.input.onKey({
            ArrowLeft: (keydown) => keydown && this.playerMoveBy(-1, 0),
            ArrowRight: (keydown) => keydown && this.playerMoveBy(1, 0),
            ArrowUp: (keydown) => keydown && this.playerMoveBy(0, -1),
            ArrowDown: (keydown) => keydown && this.playerMoveBy(0, 1),
        })
    }

    playerMoveBy(mX, mY) {
        this.player.moveByCellCoord(mX, mY, (cell) => {
            return cell.findObjectsByType('grass').length;
        });
    }

    static init(cfg) {
        if (!ClientGame.game) {
            ClientGame.game = new ClientGame(cfg);
            console.log('Skyrim', 'Game INIT');
        }        
    }
}

export default ClientGame;