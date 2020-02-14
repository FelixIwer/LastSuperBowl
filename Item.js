"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    let ITEM;
    (function (ITEM) {
        ITEM["NONE"] = "None";
        ITEM["FOOTBALL"] = "Football";
        ITEM["BILLSDILDO"] = "BillsDildo";
        ITEM["SKITTLES"] = "Skittles";
        ITEM["SBTROPHY"] = "SBTrophy";
    })(ITEM = LastSuperBowl.ITEM || (LastSuperBowl.ITEM = {}));
    class Item extends fudge.Node {
        constructor(type, _shootable) {
            super("Item");
            this.update = (_event) => {
                if (!this.hit) {
                    let direction = (this.direction == LastSuperBowl.DIRECTION.RIGHT ? 1 : -1);
                    this.cmpTransform.local.translateX(0.2 * direction);
                    if (this.hitbox.checkCollision(true)) {
                        this.hit = true;
                        console.log("HITTTT");
                    }
                    this.checkCollision(LastSuperBowl.enemy);
                }
            };
            this.type = type;
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateY(0.5);
            for (let sprite of Item.sprites) {
                let nodeSprite = new LastSuperBowl.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
            this.hitbox = this.creatHitbox(type);
            this.appendChild(this.hitbox);
            if (_shootable == true) {
                fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
                this.direction = LastSuperBowl.player.direction;
            }
        }
        static generateSprites(_txtImage) {
            Item.sprites = [];
            let sprite = new LastSuperBowl.Sprite(ITEM.FOOTBALL);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(6, 9, 20, 12), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite(ITEM.BILLSDILDO);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(35, 7, 27, 15), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite(ITEM.SKITTLES);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(71, 4, 43, 17), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite(ITEM.SBTROPHY);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(123, 1, 16, 26), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
        }
        //set Hitbox of Item
        creatHitbox(_item) {
            let hitbox = new LastSuperBowl.Hitbox("ItemHitbox");
            //mehr Hitboxen ergänzen
            switch (_item) {
                case ITEM.FOOTBALL:
                    hitbox.cmpTransform.local.scaleX(0.55);
                    hitbox.cmpTransform.local.scaleY(0.33);
                case ITEM.BILLSDILDO:
                    hitbox.cmpTransform.local.scaleX(0.55);
                    hitbox.cmpTransform.local.scaleY(0.33);
            }
            this.hitbox = hitbox;
            return hitbox;
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == this.type);
        }
        checkCollision(_checkCollision) {
            for (let floor of _checkCollision.getChildren()) {
                let rect = floor.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    this.hit = true;
                }
            }
        }
    }
    LastSuperBowl.Item = Item;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Item.js.map