"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    LastSuperBowl.fudge = FudgeCore;
    window.addEventListener("load", MainGame);
    let keysPressed = {};
    LastSuperBowl.score = 0;
    function MainGame() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let imgHare = document.querySelector("img");
        let txtHare = new LastSuperBowl.fudge.TextureImage();
        txtHare.image = imgHare;
        LastSuperBowl.Hare.generateSprites(txtHare);
        LastSuperBowl.Floor.generateSprites(txtHare);
        LastSuperBowl.Item.generateSprites(txtHare);
        LastSuperBowl.Enemy.generateSprites(txtHare);
        LastSuperBowl.fudge.RenderManager.initialize(true, false);
        LastSuperBowl.game = new LastSuperBowl.fudge.Node("Game");
        // game.addComponent(new fudge.ComponentTransform());
        // game.cmpTransform.local.translateY(-1);
        LastSuperBowl.hare = new LastSuperBowl.Hare("Hare");
        LastSuperBowl.level = new LastSuperBowl.Level();
        LastSuperBowl.floorHigh = new LastSuperBowl.FloorHigh();
        LastSuperBowl.enemy = new LastSuperBowl.Enemy("Enemy");
        LastSuperBowl.game.appendChild(LastSuperBowl.hare);
        LastSuperBowl.game.appendChild(LastSuperBowl.enemy);
        LastSuperBowl.game.appendChild(LastSuperBowl.level);
        LastSuperBowl.game.appendChild(LastSuperBowl.floorHigh);
        //Hitbox für Char anzeigen
        //game.appendChild(hare.createHitbox());
        //game.appendChild(enemy.createHitbox());
        //Camera Setup
        let cmpCamera = new LastSuperBowl.fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.lookAt(LastSuperBowl.fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = LastSuperBowl.fudge.Color.CSS("aliceblue");
        //Musik
        LastSuperBowl.Sound.init();
        LastSuperBowl.Sound.playMusic();
        //Viewport Setup
        let viewport = new LastSuperBowl.fudge.Viewport();
        viewport.initialize("Viewport", LastSuperBowl.game, cmpCamera, canvas);
        viewport.draw();
        //KeyEvents
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        LastSuperBowl.fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        LastSuperBowl.fudge.Loop.start(LastSuperBowl.fudge.LOOP_MODE.TIME_GAME, 10);
        //if alive == false Game restart
        function update(_event) {
            processInput();
            viewport.draw();
            //"Fadenkreuz"
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
            //Camera fest auf Helden
            cmpCamera.pivot.translation = new LastSuperBowl.fudge.Vector3(LastSuperBowl.hare.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
            countScore();
            if (LastSuperBowl.hare.item != "None") {
                console.log(LastSuperBowl.hare.item);
                //item.cmpTransform.local.translation = new fudge.Vector3(hare.mtxWorld.translation.x, 3, 0);
            }
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (LastSuperBowl.hare.alive == true) {
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.A]) {
                LastSuperBowl.hare.act(LastSuperBowl.ACTION.WALK, LastSuperBowl.DIRECTION.LEFT);
                return;
            }
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.D]) {
                LastSuperBowl.hare.act(LastSuperBowl.ACTION.WALK, LastSuperBowl.DIRECTION.RIGHT);
                return;
            }
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.W]) {
                LastSuperBowl.hare.act(LastSuperBowl.ACTION.JUMP);
                return;
            }
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.E]) {
                LastSuperBowl.hare.act(LastSuperBowl.ACTION.SHOOT, LastSuperBowl.DIRECTION.RIGHT, LastSuperBowl.hare.item);
                return;
            }
            LastSuperBowl.hare.act(LastSuperBowl.ACTION.IDLE);
        }
    }
    function countScore() {
        if (LastSuperBowl.hare.mtxWorld.translation.x > LastSuperBowl.score) {
            LastSuperBowl.score = Math.round(LastSuperBowl.hare.cmpTransform.local.translation.x);
        }
        let sString = LastSuperBowl.score.toString();
        document.getElementById("Score").innerHTML = sString;
        console.log(LastSuperBowl.score);
    }
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Main.js.map