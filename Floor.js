"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class Floor extends fudge.Node {
        constructor(_distance, _translateY, _item) {
            super("Floor");
            let nodeSprite = new LastSuperBowl.NodeSprite("FloorSprite", Floor.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            this.addComponent(new fudge.ComponentMaterial(Floor.material));
            let cmpMesh = new fudge.ComponentMesh(Floor.mesh);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
            this.show();
            this.cmpTransform.local.scaleX(0.5);
            this.cmpTransform.local.scaleY(0.5);
            this.cmpTransform.local.translateX(_distance);
            if (_translateY) {
                this.cmpTransform.local.translateY(_translateY);
            }
            if (_item) {
                let item = new LastSuperBowl.Item(_item);
                this.item = item;
                this.appendChild(this.item);
            }
        }
        static generateSprites(_txtImage) {
            Floor.sprites = [];
            let sprite = new LastSuperBowl.Sprite("FloorSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(272, 420, 215, 71), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.TOPCENTER);
            Floor.sprites.push(sprite);
        }
        show() {
            for (let child of this.getChildren())
                child.activate(child.name == "FloorSprite");
        }
        getRectWorld() {
            let rect = fudge.Rectangle.GET(0, 0, 100, 100);
            let topleft = new fudge.Vector3(-0.5, 0.5, 0);
            let bottomright = new fudge.Vector3(0.5, -0.5, 0);
            //let pivot: fudge.Matrix4x4 = this.getComponent(fudge.ComponentMesh).pivot;
            let mtxResult = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
            topleft.transform(mtxResult, true);
            bottomright.transform(mtxResult, true);
            let size = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
            rect.position = topleft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Floor.mesh = new fudge.MeshSprite();
    Floor.material = new fudge.Material("Floor", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("red", 0.5)));
    Floor.pivot = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    LastSuperBowl.Floor = Floor;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Floor.js.map