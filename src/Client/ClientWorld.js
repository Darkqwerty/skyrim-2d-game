import { spriteH, spriteW } from './../const';

class ClientWorld {
    constructor(game, engine, levelCfg) {
        Object.assign(this, {
            game,
            engine,
            levelCfg,
            height: levelCfg.map.lenght,
            width: levelCfg.map[0].lenght,
        })
    }

    init() {
        this.levelCfg.map.forEach((cfgRow, y) => {
            cfgRow.forEach((cfgCell, x) => {
                const spriteGroup = 'terrain';
                const spriteName = cfgCell[0][0];

                this.engine.renderSpriteFrame({
                    sprite: [spriteGroup, spriteName],
                    frame: 0,
                    x: x * spriteW,
                    y: y * spriteH,
                    w: spriteW,
                    h: spriteH
                });
            });
        });
    }
}

export default ClientWorld;