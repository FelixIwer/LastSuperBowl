"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    let EACTION;
    (function (EACTION) {
        EACTION["EIDLE"] = "EIdle";
        EACTION["EWALK"] = "EWalk";
    })(EACTION = LastSuperBowl.EACTION || (LastSuperBowl.EACTION = {}));
    let EDIRECTION;
    (function (EDIRECTION) {
        EDIRECTION[EDIRECTION["ELEFT"] = 0] = "ELEFT";
        EDIRECTION[EDIRECTION["ERIGHT"] = 1] = "ERIGHT";
    })(EDIRECTION = LastSuperBowl.EDIRECTION || (LastSuperBowl.EDIRECTION = {}));
    class Enemy extends fudge.Node {
        constructor(_name = "Enemy") {
            super(_name);
            this.speed = fudge.Vector3.ZERO();
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.speed.y += Enemy.gravity.y * timeFrame;
                let distance = fudge.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(LastSuperBowl.level);
                this.checkCollision(LastSuperBowl.floorHigh);
                this.walking();
            };
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Enemy.sprites) {
                let nodeSprite = new LastSuperBowl.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.cmpTransform.local.translateX(7);
                this.appendChild(nodeSprite);
            }
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.show(EACTION.EIDLE);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Enemy.sprites = [];
            let sprite = new LastSuperBowl.Sprite(EACTION.EWALK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(7, 96, 35, 35), 5, fudge.Vector2.X(8), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite(EACTION.EIDLE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(6, 45, 30, 35), 8, fudge.Vector2.X(5), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Enemy.sprites.push(sprite);
        }
        createHitbox() {
            let hitbox = new LastSuperBowl.Hitbox("EnemyHitbox");
            //Hitbox Enemy verändern
            hitbox.cmpTransform.local.translateY(1.2);
            hitbox.cmpTransform.local.scaleX(1);
            hitbox.cmpTransform.local.scaleY(1.2);
            this.hitbox = hitbox;
            return hitbox;
        }
        show(_action) {
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        }
        act(_action, _direction) {
            switch (_action) {
                case EACTION.EIDLE:
                    this.speed.x = 0;
                    break;
                case EACTION.EWALK:
                    let direction = (_direction == EDIRECTION.ERIGHT ? 1 : -1);
                    this.speed.x = Enemy.speedMax.x;
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                    break;
            }
            this.show(_action);
        }
        checkCollision(_checkCollision) {
            for (let floor of _checkCollision.getChildren()) {
                if (floor.name == "Floor") {
                    let rect = floor.getRectWorld();
                    let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    if (hit) {
                        let translation = this.cmpTransform.local.translation;
                        translation.y = rect.y;
                        this.cmpTransform.local.translation = translation;
                        this.speed.y = 0;
                    }
                }
            }
        }
        walking() {
            let distance;
            //wenn negativ ist Char links von Enemy, wenn positiv ist Char rechts von Enemy
            distance = LastSuperBowl.player.mtxWorld.translation.x - LastSuperBowl.enemy.mtxWorld.translation.x;
            if (distance > 15) {
                LastSuperBowl.game.removeChild(LastSuperBowl.enemy);
            }
            else if (distance >= -5) {
                if (LastSuperBowl.player.alive == true) {
                    this.act(EACTION.EWALK, EDIRECTION.ELEFT);
                }
                else {
                    this.act(EACTION.EIDLE);
                }
            }
        }
    }
    Enemy.speedMax = new fudge.Vector2(1.5, 5);
    Enemy.gravity = fudge.Vector2.Y(-3);
    LastSuperBowl.Enemy = Enemy;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Enemy.js.map