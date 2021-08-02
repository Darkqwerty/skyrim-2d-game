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
        return new ClientEngine(document.getElementById(this.cfg.tagId), this);
    }

    createWorld() {
        return new ClientWorld(this, this.engine, levelCfg);
    }

    getWorld() {
        return this.world;
    }

    initEngine() {
        this.engine
            .loadSprites(sprites)
            .then(() => {
                this.world.init();
                this.engine.on('render', (_, timestamp) => {
                    this.engine.camera.focusAtGameObject(this.player);
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
            ArrowLeft: (keydown) => keydown && this.playerMoveBy('left'),
            ArrowRight: (keydown) => keydown && this.playerMoveBy('right'),
            ArrowUp: (keydown) => keydown && this.playerMoveBy('up'),
            ArrowDown: (keydown) => keydown && this.playerMoveBy('down'),
        })
    }

    playerMoveBy(dir) {
        const dirs = {
            left: [-1, 0],
            right: [1, 0],
            up: [0, -1],
            down: [0, 1],
        }

        const { player } = this;

        if (player && player.motionProgress === 1) {
            const canMove = player.moveByCellCoord(dirs[dir][0], dirs[dir][1], (cell) => {
                return cell.findObjectsByType('grass').length;
            });

            if (canMove) {
                player.setState(dir);
                player.once('motion-stopped', () => player.setState('main'));
            }
        }
    }

    static init(cfg) {
        if (!ClientGame.game) {
            ClientGame.game = new ClientGame(cfg);
            console.log('Skyrim', 'Game INIT');
        }
    }
}

export default ClientGame;