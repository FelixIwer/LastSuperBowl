namespace LastSuperBowl {

    import fudge = FudgeCore;

    export enum ITEM {
        FOOTBALL = "Football",
        BILLSDILDO = "BillsDildo",
        SKITTLES = "Skittles",
        SBTROPHY = "SBTrophy"
    }

    export class Item extends fudge.Node {
        private static mesh: fudge.MeshSprite = new fudge.MeshSprite();
        private static material: fudge.Material = new fudge.Material("Item", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("red", 0.5)));
        private static readonly pivot: fudge.Matrix4x4 = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
        private static sprites: Sprite[];
        public speed: fudge.Vector3 = fudge.Vector3.ZERO();
    
        public constructor() {
          super("Item");
          let nodeSprite: NodeSprite = new NodeSprite("ItemSprite", Item.sprites[0]);
          nodeSprite.activate(false);
          this.appendChild(nodeSprite);
    
          this.addComponent(new fudge.ComponentTransform());
          //this.addComponent(new fudge.ComponentMaterial(Item.material));
          let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Item.mesh);
          //cmpMesh.pivot.translateY(-0.5);
          cmpMesh.pivot = Item.pivot;
          this.addComponent(cmpMesh);
          this.show();
        }
    
        public static generateSprites(_txtImage: fudge.TextureImage): void {
          Item.sprites = [];
          let sprite: Sprite = new Sprite("Football");
          //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(402, 943, 20, 12), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
          //Item.sprites.push(sprite);

          sprite = new Sprite("BillsDildo");
          //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(439, 943, 27, 15), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
          //Item.sprites.push(sprite);

          sprite = new Sprite("Skittles");
          //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(474, 942, 43, 17), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
          //Item.sprites.push(sprite);

          sprite = new Sprite("SBTrophy");
          sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(526, 936, 16, 26), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
          Item.sprites.push(sprite);
        }
    
        public show(): void {
          for (let child of this.getChildren())
            child.activate(child.name == "ItemSprite");
        }
    }
}