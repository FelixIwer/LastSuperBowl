namespace LastSuperBowl {

    import fudge = FudgeCore;

    export enum ITEM {
        NONE = "None",
        FOOTBALL = "Football",
        BILLSDILDO = "BillsDildo",
        SKITTLES = "Skittles",
        SBTROPHY = "SBTrophy",
        GATORADE = "Gatorade"
    }

    export class Item extends fudge.Node {

        private static sprites: Sprite[];
        public hitbox: Hitbox;
        public type: ITEM;
        public hit: boolean;
        private direction: DIRECTION;

        public constructor(type: ITEM, _shootable?: boolean, _consumable?: boolean) {
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
            if (_shootable == true) {
                fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
                this.direction = player.direction;
            }
        }
    
        public static generateSprites(_txtImage: fudge.TextureImage): void {
            Item.sprites = [];
            let sprite: Sprite = new Sprite(ITEM.FOOTBALL);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(6, 9, 20, 12), 1, fudge.Vector2.ZERO(), 35, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite(ITEM.BILLSDILDO);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(35, 7, 27, 15), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite(ITEM.SKITTLES);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(71, 4, 43, 17), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite(ITEM.SBTROPHY);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(123, 1, 16, 26), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
            Item.sprites.push(sprite);

            sprite = new Sprite(ITEM.GATORADE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(147, 2, 12, 27), 1, fudge.Vector2.ZERO(), 50, fudge.ORIGIN2D.TOPCENTER);
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

        public update = (_event: fudge.Eventƒ): void => {
            if (!this.hit) {
                let direction: number = (this.direction == DIRECTION.RIGHT ? 1 : -1);
                this.cmpTransform.local.translateX(0.2 * direction);
                if (this.hitbox.checkCollision(true)) {
                    this.hit = true;
                    console.log("HITTTT");
                }  
                this.checkCollision(enemy);
            }
        }

        private checkCollision(_checkCollision: fudge.Node): void {
            for (let floor of _checkCollision.getChildren()) {
                if (floor.name == "Floor") {
                    let rect: fudge.Rectangle = (<Floor>floor).getRectWorld();
                    let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    if (hit) {
                        this.hit = true;
                    }
                }
            }
        }
    }
}