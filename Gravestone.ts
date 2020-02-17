namespace LastSuperBowl {

    import fudge = FudgeCore;

    export class Gravestone extends fudge.Node {

        private static sprites: Sprite[];

        constructor(_position: number) {
            super("Gravestone");

            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateX(_position);
            this.cmpTransform.local.translateY(0);

            for (let sprite of Gravestone.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
            this.show();
        }

    public static generateSprites(_txtImage: fudge.TextureImage): void {
        Gravestone.sprites = [];
        let sprite: Sprite = new Sprite("Gravestonesprite");
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(287, 9, 13, 19), 1, fudge.Vector2.ZERO(), 20, fudge.ORIGIN2D.BOTTOMCENTER);
        Gravestone.sprites.push(sprite);
    }

    public show(): void {
        for (let child of this.getChildren())
          child.activate(child.name == "Gravestonesprite");
      }

    }
}