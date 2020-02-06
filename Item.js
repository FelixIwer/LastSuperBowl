"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    let ITEM;
    (function (ITEM) {
        ITEM["FOOTBALL"] = "Football";
        ITEM["BILLSDILDO"] = "BillsDildo";
        ITEM["SKITTLES"] = "Skittles";
        ITEM["SBTROPHY"] = "SBTrophy";
    })(ITEM = LastSuperBowl.ITEM || (LastSuperBowl.ITEM = {}));
    class Item extends fudge.Node {
        constructor() {
            super("Item");
            this.speed = fudge.Vector3.ZERO();
            let nodeSprite = new LastSuperBowl.NodeSprite("ItemSprite", Item.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            //this.addComponent(new fudge.ComponentMaterial(Item.material));
            let cmpMesh = new fudge.ComponentMesh(Item.mesh);
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Item.pivot;
            this.addComponent(cmpMesh);
            this.show();
        }
        static generateSprites(_txtImage) {
            Item.sprites = [];
            let sprite = new LastSuperBowl.Sprite("Football");
            //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(402, 943, 20, 12), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            //Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite("BillsDildo");
            //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(439, 943, 27, 15), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            //Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite("Skittles");
            //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(474, 942, 43, 17), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            //Item.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite("SBTrophy");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(526, 936, 16, 26), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "ItemSprite");
        }
    }
    Item.mesh = new fudge.MeshSprite();
    Item.material = new fudge.Material("Item", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("red", 0.5)));
    Item.pivot = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    LastSuperBowl.Item = Item;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Item.js.map