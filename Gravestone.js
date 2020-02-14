"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    let STATUS;
    (function (STATUS) {
        STATUS["DEAD"] = "DEAD";
    })(STATUS = LastSuperBowl.STATUS || (LastSuperBowl.STATUS = {}));
    class Gravestone extends fudge.Node {
        constructor(_position) {
            super("Gravestone");
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateX(_position);
            this.cmpTransform.local.translateY(0);
            for (let sprite of Gravestone.sprites) {
                let nodeSprite = new LastSuperBowl.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
        }
        static generateSprites(_txtImage) {
            Gravestone.sprites = [];
            let sprite = new LastSuperBowl.Sprite(STATUS.DEAD);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(287, 9, 13, 19), 1, fudge.Vector2.ZERO(), 20, fudge.ORIGIN2D.BOTTOMCENTER);
            Gravestone.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == STATUS.DEAD);
        }
    }
    LastSuperBowl.Gravestone = Gravestone;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Gravestone.js.map