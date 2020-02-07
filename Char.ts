namespace LastSuperBowl {
    import fudge = FudgeCore;
  
    export enum ACTION {
      IDLE = "Idle",
      WALK = "Walk",
      JUMP = "Jump"
    }
    export enum DIRECTION {
      LEFT, RIGHT
    }
  
    export class Hare extends fudge.Node {
      private static sprites: Sprite[];
      private static speedMax: fudge.Vector2 = new fudge.Vector2(1.5, 5);
      private static gravity: fudge.Vector2 = fudge.Vector2.Y(-3);
      public speed: fudge.Vector3 = fudge.Vector3.ZERO();
      public hitbox: Hitbox;
  
      constructor(_name: string = "Hare") {
        super(_name);
        this.addComponent(new fudge.ComponentTransform());
  
        for (let sprite of Hare.sprites) {
          let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
          nodeSprite.activate(false);
  
          nodeSprite.addEventListener(
            "showNext",
            (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
            true
          );
  
          this.appendChild(nodeSprite);
        }
        this.hitbox = this.createHitbox();
        this.appendChild(this.hitbox);
        this.show(ACTION.IDLE);


        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
      }
  
      public static generateSprites(_txtImage: fudge.TextureImage): void {
        Hare.sprites = [];
        let sprite: Sprite = new Sprite(ACTION.WALK);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(2, 104, 68, 64), 6, fudge.Vector2.ZERO(), 64, fudge.ORIGIN2D.BOTTOMCENTER);
        Hare.sprites.push(sprite);
  
        sprite = new Sprite(ACTION.IDLE);
        sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(8, 20, 45, 72), 4, fudge.Vector2.ZERO(), 64, fudge.ORIGIN2D.BOTTOMCENTER);
        Hare.sprites.push(sprite);
      }
  
      public createHitbox(): Hitbox {

        let hitbox: Hitbox = new Hitbox("PlayerHitbox");
        hitbox.cmpTransform.local.translateY(0.6);
        hitbox.cmpTransform.local.scaleX(0.2);
        hitbox.cmpTransform.local.scaleY(0.5);
        this.hitbox = hitbox;
        return hitbox;
      }

      public show(_action: ACTION): void {
        if (_action == ACTION.JUMP) {
          return;
        }
        for (let child of this.getChildren())
          child.activate(child.name == _action);
        // this.action = _action;
      }
  
      public act(_action: ACTION, _direction?: DIRECTION): void {
        switch (_action) {
          case ACTION.IDLE:
            this.speed.x = 0;
            break;
          case ACTION.WALK:
            let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
            this.speed.x = Hare.speedMax.x; // * direction;
            this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
            // console.log(direction);
            break;
          case ACTION.JUMP:
            //Abfrage für einfachen Jump
            if (this.speed.y != 0) {
              break;
            } else {
              this.speed.y = 2;
            }
        }
        this.show(_action);
      }
  
      private update = (_event: fudge.Eventƒ): void => {
        this.broadcastEvent(new CustomEvent("showNext"));
  
        let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
        this.speed.y += Hare.gravity.y * timeFrame;
        let distance: fudge.Vector3 = fudge.Vector3.SCALE(this.speed, timeFrame);
        this.cmpTransform.local.translate(distance);
        
        this.checkCollision(level);
        this.checkCollision(floorHigh);
        this.hitbox.checkCollision();
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
    }
}