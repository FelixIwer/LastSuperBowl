namespace LastSuperBowl {

    import fudge = FudgeCore;

    export enum ITEM {
        NONE = "None",
        FOOTBALL = "Football",
        BILLSDILDO = "BillsDildo",
        SKITTLES = "Skittles",
        SBTROPHY = "SBTrophy"
    }

    export class Item extends fudge.Node {

        private static sprites: Sprite[];
        public hitbox: Hitbox;
        public type: ITEM;
    
        public constructor(type: ITEM) {
            super("Item");

            this.type = type;
            this.addComponent(new fudge.ComponentTransform());
            this.cmpTransform.local.translateY(0.5);

            for (let sprite of Item.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                this.appendChild(nodeSprite);
            }
    
            this.show();
            this.hitbox = this.creatHitbox(type);
            this.appendChild(this.hitbox);
        }
    
        public static generateSprites(_txtImage: fudge.TextureImage): void {
            Item.sprites = [];
            let sprite: Sprite = new Sprite(ITEM.FOOTBALL);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(402, 943, 20, 12), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite(ITEM.BILLSDILDO);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(439, 943, 27, 15), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite(ITEM.SKITTLES);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(474, 942, 43, 17), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite(ITEM.SBTROPHY);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(526, 936, 16, 26), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);
        }
        
        //set Hitbox of Item
        public creatHitbox(_item: ITEM): Hitbox {

            let hitbox: Hitbox = new Hitbox("ItemHitbox");

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

        public show(): void {
          for (let child of this.getChildren())
            child.activate(child.name == this.type);
        }
    }
}