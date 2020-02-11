namespace LastSuperBowl {
    import fudge = FudgeCore;

    export enum EACTION {
        EIDLE = "EIdle",
        EWALK = "EWalk"
    }

    export enum EDIRECTION {
        ELEFT,
        ERIGHT
      }

    export class Enemy extends fudge.Node {

        private static sprites: Sprite[];
        private static speedMax: fudge.Vector2 = new fudge.Vector2(1.5, 5);
        private static gravity: fudge.Vector2 = fudge.Vector2.Y(-3);
        public speed: fudge.Vector3 = fudge.Vector3.ZERO();
        public hitbox: Hitbox;

        constructor(_name: string = "Enemy") {
            super(_name);
            this.addComponent(new fudge.ComponentTransform());

            for (let sprite of Enemy.sprites) {
                let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
        
                nodeSprite.addEventListener(
                  "showNext",
                  (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
                  true
                );
                    
                this.cmpTransform.local.translateX(7);
                this.appendChild(nodeSprite);
            }

            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.show(EACTION.EIDLE);

            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }

        public static generateSprites(_txtImage: fudge.TextureImage): void {
            Enemy.sprites = [];
            let sprite: Sprite = new Sprite(EACTION.EWALK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(7, 96, 34, 35), 5, fudge.Vector2.X(5), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
      
            sprite = new Sprite(EACTION.EIDLE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(6, 45, 30, 35), 8, fudge.Vector2.X(5), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
        }

        public createHitbox(): Hitbox {

            let hitbox: Hitbox = new Hitbox("EnemyHitbox");
    
            //Hitbox Enemy verändern
            hitbox.cmpTransform.local.translateY(1.2);
            hitbox.cmpTransform.local.scaleX(1);
            hitbox.cmpTransform.local.scaleY(1.2);
    
            this.hitbox = hitbox;
            return hitbox;
        }

        public show(_action: EACTION): void {    
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        }

        public act(_action: EACTION, _direction?: EDIRECTION): void {
            switch (_action) {
                case EACTION.EIDLE:
                    this.speed.x = 0;
                    break;
                case EACTION.EWALK:
                    let direction: number = (_direction == EDIRECTION.ERIGHT ? 1 : -1);
                    this.speed.x = Enemy.speedMax.x;
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                    break;
            }
        }

        private update = (_event: fudge.Eventƒ): void => {
            this.broadcastEvent(new CustomEvent("showNext"));
      
            let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
            this.speed.y += Enemy.gravity.y * timeFrame;
            let distance: fudge.Vector3 = fudge.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
            
            this.checkCollision(level);
            this.checkCollision(floorHigh);
            this.walking();
        }

        private checkCollision(_checkCollision: fudge.Node): void {
            for (let floor of _checkCollision.getChildren()) {
                let rect: fudge.Rectangle = (<Floor>floor).getRectWorld();
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (hit) {
                    let translation: fudge.Vector3 = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }

        private walking(): void {
            let distance: number;
            //wenn negativ ist Char links von Enemy, wenn positiv ist Char rechts von Enemy
            distance = hare.mtxWorld.translation.x - enemy.mtxWorld.translation.x;
            if (distance > 15 ) {
                game.removeChild(enemy);
            } else if (distance >= -5) {
                console.log(distance);
                this.act(EACTION.EWALK, EDIRECTION.ELEFT);
            }
        }
    }
}