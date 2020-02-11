namespace LastSuperBowl {

  import fudge = FudgeCore;

  export class Floor extends fudge.Node {
    private static mesh: fudge.MeshSprite = new fudge.MeshSprite();
    private static material: fudge.Material = new fudge.Material("Floor", fudge.ShaderUniColor, new fudge.CoatColored(fudge.Color.CSS("red", 0.5)));
    private static readonly pivot: fudge.Matrix4x4 = fudge.Matrix4x4.TRANSLATION(fudge.Vector3.Y(-0.5));
    private static sprites: Sprite[];
    public item: Item;

    public constructor(_distance: number, _translateY?: number, _item?: ITEM) {
      super("Floor");
      let nodeSprite: NodeSprite = new NodeSprite("FloorSprite", Floor.sprites[0]);
      nodeSprite.activate(false);
      this.appendChild(nodeSprite);

      this.addComponent(new fudge.ComponentTransform());
      this.addComponent(new fudge.ComponentMaterial(Floor.material));
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Floor.mesh);
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
        let item: Item = new Item(_item);
        this.item = item;
        this.appendChild(this.item);
      }
    }

    public static generateSprites(_txtImage: fudge.TextureImage): void {
      Floor.sprites = [];
      let sprite: Sprite = new Sprite("FloorSprite");
      sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(272, 420, 215, 71), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.TOPCENTER);
      Floor.sprites.push(sprite);
    }

    public show(): void {
      for (let child of this.getChildren())
        child.activate(child.name == "FloorSprite");
    }


    public getRectWorld(): fudge.Rectangle {
      let rect: fudge.Rectangle = fudge.Rectangle.GET(0, 0, 100, 100);
      let topleft: fudge.Vector3 = new fudge.Vector3(-0.5, 0.5, 0);
      let bottomright: fudge.Vector3 = new fudge.Vector3(0.5, -0.5, 0);
      
      //let pivot: fudge.Matrix4x4 = this.getComponent(fudge.ComponentMesh).pivot;
      let mtxResult: fudge.Matrix4x4 = fudge.Matrix4x4.MULTIPLICATION(this.mtxWorld, Floor.pivot);
      topleft.transform(mtxResult, true);
      bottomright.transform(mtxResult, true);

      let size: fudge.Vector2 = new fudge.Vector2(bottomright.x - topleft.x, bottomright.y - topleft.y);
      rect.position = topleft.toVector2();
      rect.size = size;

      return rect;
    }
  }
}