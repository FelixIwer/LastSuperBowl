"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    let BACKGROUND;
    (function (BACKGROUND) {
        BACKGROUND["ONE"] = "1";
        BACKGROUND["TWO"] = "2";
        BACKGROUND["THREE"] = "3";
    })(BACKGROUND = LastSuperBowl.BACKGROUND || (LastSuperBowl.BACKGROUND = {}));
    class Background extends fudge.Node {
        constructor() {
            super("Background");
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateZ(-5);
            for (let sprite of Background.sprites) {
                let nodeSprite = new LastSuperBowl.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
        }
        static generateSprites(_txtImage) {
            Background.sprites = [];
            let sprite = new LastSuperBowl.Sprite(BACKGROUND.ONE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(22, 532, 910, 479), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
            Background.sprites.push(sprite);
            Background.sprites = [];
            sprite = new LastSuperBowl.Sprite(BACKGROUND.TWO);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(22, 532, 910, 479), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
            Background.sprites.push(sprite);
            Background.sprites = [];
            sprite = new LastSuperBowl.Sprite(BACKGROUND.THREE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(22, 532, 910, 479), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
            Background.sprites.push(sprite);
        }
        show(_bg) {
            for (let child of this.getChildren())
                child.activate(child.name == _bg);
        }
    }
    LastSuperBowl.Background = Background;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Background.js.map