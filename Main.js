"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    LastSuperBowl.fudge = FudgeCore;
    window.addEventListener("load", MainGame);
    let keysPressed = {};
    LastSuperBowl.score = 0;
    LastSuperBowl.team = LastSuperBowl.TEAM.NONE;
    function MainGame() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let imgPlayer = document.querySelector("img");
        let txtPlayer = new LastSuperBowl.fudge.TextureImage();
        txtPlayer.image = imgPlayer;
        LastSuperBowl.Player.generateSprites(txtPlayer);
        LastSuperBowl.Floor.generateSprites(txtPlayer);
        LastSuperBowl.Item.generateSprites(txtPlayer);
        LastSuperBowl.Enemy.generateSprites(txtPlayer);
        LastSuperBowl.fudge.RenderManager.initialize(true, false);
        LastSuperBowl.game = new LastSuperBowl.fudge.Node("Game");
        // game.addComponent(new fudge.ComponentTransform());
        // game.cmpTransform.local.translateY(-1);
        LastSuperBowl.itemContainer = new LastSuperBowl.fudge.Node("ItemContainer");
        LastSuperBowl.player = new LastSuperBowl.Player("Player");
        LastSuperBowl.level = new LastSuperBowl.Level();
        LastSuperBowl.floorHigh = new LastSuperBowl.FloorHigh();
        LastSuperBowl.enemy = new LastSuperBowl.Enemy("Enemy");
        LastSuperBowl.game.appendChild(LastSuperBowl.player);
        LastSuperBowl.game.appendChild(LastSuperBowl.itemContainer);
        LastSuperBowl.game.appendChild(LastSuperBowl.enemy);
        LastSuperBowl.game.appendChild(LastSuperBowl.level);
        LastSuperBowl.game.appendChild(LastSuperBowl.floorHigh);
        //Hitbox für Char anzeigen
        //game.appendChild(player.createHitbox());
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
        //Draft
        LastSuperBowl.team = LastSuperBowl.player.randomTeam();
        //if alive == false Game restart
        function update(_event) {
            if (LastSuperBowl.player.alive == true) {
                processInput();
            }
            else {
                endScreen();
            }
            viewport.draw();
            //"Fadenkreuz"
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
            //Camera fest auf Helden
            cmpCamera.pivot.translation = new LastSuperBowl.fudge.Vector3(LastSuperBowl.player.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
            countScore();
            if (LastSuperBowl.player.item != "None") {
                console.log(LastSuperBowl.player.item);
                //item.cmpTransform.local.translation = new fudge.Vector3(player.mtxWorld.translation.x, 3, 0);
            }
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (LastSuperBowl.player.alive == true) {
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.A]) {
                LastSuperBowl.player.act(LastSuperBowl.ACTION.WALK, LastSuperBowl.DIRECTION.LEFT);
                return;
            }
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.D]) {
                LastSuperBowl.player.act(LastSuperBowl.ACTION.WALK, LastSuperBowl.DIRECTION.RIGHT);
                return;
            }
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.W]) {
                LastSuperBowl.player.act(LastSuperBowl.ACTION.JUMP);
                return;
            }
            if (LastSuperBowl.player.item != "None") {
                if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.E]) {
                    LastSuperBowl.player.act(LastSuperBowl.ACTION.SHOOT, LastSuperBowl.DIRECTION.RIGHT, LastSuperBowl.player.item);
                    return;
                }
            }
            LastSuperBowl.player.act(LastSuperBowl.ACTION.IDLE);
        }
    }
    // function removeFiredItem(): void{
    // }
    function countScore() {
        if (LastSuperBowl.player.mtxWorld.translation.x > LastSuperBowl.score) {
            LastSuperBowl.score = Math.round(LastSuperBowl.player.cmpTransform.local.translation.x);
        }
        let sString = LastSuperBowl.score.toString();
        document.getElementById("Score").innerHTML = sString;
        console.log(LastSuperBowl.score);
    }
    function endScreen() {
        let over = document.querySelector("div#endScreen");
        over.style.visibility = "visible";
        let sString = LastSuperBowl.score.toString();
        document.getElementById("endScore").innerHTML = sString;
        window.removeEventListener("keydown", handleKeyboard);
        window.removeEventListener("keyup", handleKeyboard);
        LastSuperBowl.Sound.pauseMusic();
        LastSuperBowl.player.speed.x = 0;
        LastSuperBowl.game.removeChild(LastSuperBowl.player);
    }
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Main.js.map