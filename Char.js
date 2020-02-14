"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
        ACTION["SHOOT"] = "Shoot";
    })(ACTION = LastSuperBowl.ACTION || (LastSuperBowl.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = LastSuperBowl.DIRECTION || (LastSuperBowl.DIRECTION = {}));
    let TEAM;
    (function (TEAM) {
        TEAM["NONE"] = "None";
        TEAM["BENGALS"] = "Bengals";
        TEAM["REDSKINS"] = "Redskins";
        TEAM["LIONS"] = "Lions";
    })(TEAM = LastSuperBowl.TEAM || (LastSuperBowl.TEAM = {}));
    class Player extends fudge.Node {
        constructor(_name = "Player") {
            super(_name);
            this.speed = fudge.Vector3.ZERO();
            this.item = LastSuperBowl.ITEM.NONE;
            this.alive = true;
            this.team = TEAM.NONE;
            this.update = (_event) => {
                this.broadcastEvent(new CustomEvent("showNext"));
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.speed.y += Player.gravity.y * timeFrame;
                let distance = fudge.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(LastSuperBowl.level);
                this.checkCollision(LastSuperBowl.floorHigh);
                this.hitbox.checkCollision();
            };
            this.addComponent(new fudge.ComponentTransform());
            for (let sprite of Player.sprites) {
                let nodeSprite = new LastSuperBowl.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(false);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
            this.hitbox = this.createHitbox();
            this.appendChild(this.hitbox);
            this.show(ACTION.IDLE);
            //löschen wenn er nicht mehr da ist fudge.Loop.removeEventListener(fudge.Event.Loop_Frame, this.update);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_txtImage) {
            Player.sprites = [];
            let sprite = new LastSuperBowl.Sprite(ACTION.WALK);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(7, 96, 34, 35), 5, fudge.Vector2.X(5), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Player.sprites.push(sprite);
            sprite = new LastSuperBowl.Sprite(ACTION.IDLE);
            sprite.generateByGrid(_txtImage, fudge.Rectangle.GET(6, 45, 30, 35), 1, fudge.Vector2.X(5), 30, fudge.ORIGIN2D.BOTTOMCENTER);
            Player.sprites.push(sprite);
        }
        createHitbox() {
            let hitbox = new LastSuperBowl.Hitbox("PlayerHitbox");
            //Hitbox Player verändern
            hitbox.cmpTransform.local.translateY(1.2);
            hitbox.cmpTransform.local.scaleX(1);
            hitbox.cmpTransform.local.scaleY(1.2);
            this.hitbox = hitbox;
            return hitbox;
        }
        show(_action) {
            if (_action == ACTION.JUMP) {
                console.log("W");
                return;
            }
            for (let child of this.getChildren())
                child.activate(child.name == _action);
        }
        act(_action, _direction, _item) {
            this.direction = _direction;
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Player.speedMax.x;
                    this.cmpTransform.local.rotation = fudge.Vector3.Y(90 - 90 * direction);
                    break;
                case ACTION.JUMP:
                    //Abfrage für einfachen Jump
                    if (this.speed.y != 0) {
                        break;
                    }
                    else {
                        this.speed.y = 3.5;
                    }
                    break;
                case ACTION.SHOOT:
                    // console.log("SHOOOOOOOT");
                    let item = new LastSuperBowl.Item(_item, true);
                    LastSuperBowl.itemContainer.appendChild(item);
                    item.cmpTransform.local.translation = LastSuperBowl.player.cmpTransform.local.translation;
                    if (LastSuperBowl.player.direction == DIRECTION.RIGHT) {
                        item.cmpTransform.local.translateX(1);
                    }
                    else {
                        item.cmpTransform.local.translateX(-1);
                    }
                    item.cmpTransform.local.translateY(0.5);
                    LastSuperBowl.player.item = LastSuperBowl.ITEM.NONE;
                    break;
            }
            this.show(_action);
        }
        randomTeam() {
            let random = Math.random();
            let newTeam = TEAM.NONE;
            if (random > 0.67) {
                newTeam = TEAM.BENGALS;
            }
            else if (random < 0.67 && random > 0.34) {
                newTeam = TEAM.REDSKINS;
            }
            else if (random < 0.34) {
                newTeam = TEAM.LIONS;
            }
            return newTeam;
        }
        checkCollision(_checkCollision) {
            for (let floor of _checkCollision.getChildren()) {
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
    Player.speedMax = new fudge.Vector2(1.5, 5);
    Player.gravity = fudge.Vector2.Y(-3);
    LastSuperBowl.Player = Player;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Char.js.map