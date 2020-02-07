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
        constructor(type) {
            super("Item");
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
        }
        static generateSprites(_txtImage) {
            Item.sprites = [];
            let sprite = new LastSuperBowl.Sprite(ITEM.FOOTBALL);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(402, 943, 20, 12), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite(ITEM.BILLSDILDO);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(439, 943, 27, 15), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite(ITEM.SKITTLES);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(474, 942, 43, 17), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite(ITEM.SBTROPHY);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(526, 936, 16, 26), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
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
    }
    LastSuperBowl.Item = Item;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Item.js.map