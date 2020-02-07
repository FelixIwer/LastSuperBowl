namespace LastSuperBowl {

    import fudge = FudgeCore;

    export enum ITEM {
        FOOTBALL = "Football",
        BILLSDILDO = "BillsDildo",
        SKITTLES = "Skittles",
        SBTROPHY = "SBTrophy"
    }

    export class Item extends fudge.Node {
        private static sprites: Sprite[];
        // public speed: fudge.Vector3 = fudge.Vector3.ZERO();
        public hitbox: Hitbox;
        public type: ITEM;
    
        public constructor(type: ITEM) {
            super("Item");
            let nodeSprite: NodeSprite = new NodeSprite("ItemSprite", Item.sprites[0]);
            nodeSprite.activate(false);
            this.appendChild(nodeSprite);

            this.type = type;
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateY(0.5);
            for (let sprite of Item.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
    
            this.show();
            this.hitbox = this.creatHitbox();
            this.appendChild(this.hitbox);
        }
    
        public static generateSprites(_txtImage: fudge.TextureImage): void {
            Item.sprites = [];
            let sprite: Sprite = new Sprite("Football");
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(402, 943, 20, 12), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite("BillsDildo");
            //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(439, 943, 27, 15), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            //Item.sprites.push(sprite);

            sprite = new Sprite("Skittles");
            //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(474, 942, 43, 17), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            //Item.sprites.push(sprite);

            sprite = new Sprite("SBTrophy");
            //sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(526, 936, 16, 26), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            //Item.sprites.push(sprite);
        }
        
        //set Hitbox of Item
        public creatHitbox(): Hitbox {

            let hitbox: Hitbox = new Hitbox("ItemHitbox");

            hitbox.cmpTransform.local.scaleX(0.2);
            hitbox.cmpTransform.local.scaleY(0.2);

            this.hitbox = hitbox;
            return hitbox;
        }

        public show(): void {
          for (let child of this.getChildren())
            child.activate(child.name == "ItemSprite");
        }
    }
}