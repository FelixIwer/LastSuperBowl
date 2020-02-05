"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class Floor extends fudge.Node {
        constructor() {
            super("Floor");
            let nodeSprite = new LastSuperBowl.NodeSprite("FloorSprite", Floor.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);
            this.addComponent(new fudge.ComponentTransform());
            this.addComponent(new fudge.ComponentMaterial(Floor.material));
            let cmpMesh = new fudge.ComponentMesh(Floor.mesh);
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Floor.pivot;
            this.addComponent(cmpMesh);
            this.show();
        }
        static generateSprites(_txtImage) {
            Floor.sprites = [];
            let sprite = new LastSuperBowl.Sprite("FloorSprite");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(17, 995, 220, 77), 1, fudge.Vector2.ZERO(), 220, fudge.ORIGIN2D.TOPCENTER);
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