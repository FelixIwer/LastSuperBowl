namespace LastSuperBowl {
    
    import fudge = FudgeCore;

    export enum BACKGROUND {
        ONE = "1",
        TWO = "2",
        THREE = "3"
    }

    export class Background extends fudge.Node {

        private static sprites: Sprite[];

            constructor() {
            super("Background");

            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateZ(-5);

            for (let sprite of Background.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
        
                nodeSprite.addEventListener(
                  "showNext",
                  (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
                  true
                );
        
                this.appendChild(nodeSprite);
              }
        }

    public static generateSprites(_txtImage: fudge.TextureImage): void {
        Background.sprites = [];

        let sprite: Sprite = new Sprite(BACKGROUND.ONE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(22, 532, 910, 479), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
        Background.sprites.push(sprite);
        Background.sprites = [];

        sprite = new Sprite(BACKGROUND.TWO);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(22, 532, 910, 479), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
        Background.sprites.push(sprite);
        Background.sprites = [];

        sprite = new Sprite(BACKGROUND.THREE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(22, 532, 910, 479), 1, fudge.Vector2.ZERO(), 60, fudge.ORIGIN2D.BOTTOMCENTER);
        Background.sprites.push(sprite);
    }

    public show(_bg: BACKGROUND): void {
        for (let child of this.getChildren())
          child.activate(child.name == _bg);
      }

    }
}