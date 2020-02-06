"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    LastSuperBowl.fudge = FudgeCore;
    window.addEventListener("load", MainGame);
    let keysPressed = {};
    let hare;
    function MainGame() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let imgHare = document.querySelector("img");
        let txtHare = new LastSuperBowl.fudge.TextureImage();
        txtHare.image = imgHare;
        LastSuperBowl.Hare.generateSprites(txtHare);
        LastSuperBowl.Floor.generateSprites(txtHare);
        LastSuperBowl.Item.generateSprites(txtHare);
        LastSuperBowl.fudge.RenderManager.initialize(true, false);
        LastSuperBowl.game = new LastSuperBowl.fudge.Node("Game");
        hare = new LastSuperBowl.Hare("Hare");
        LastSuperBowl.level = LastSuperBowl.Level.createCollegeLevel();
        LastSuperBowl.game.appendChild(LastSuperBowl.level);
        LastSuperBowl.game.appendChild(hare);
        let cmpCamera = new LastSuperBowl.fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(LastSuperBowl.fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = LastSuperBowl.fudge.Color.CSS("aliceblue");
        let viewport = new LastSuperBowl.fudge.Viewport();
        viewport.initialize("Viewport", LastSuperBowl.game, cmpCamera, canvas);
        viewport.draw();
        //let button: HTMLButtonElement = document.getElementById("startLevel1");
        //button.addEventListener("test",loadLevel);
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        LastSuperBowl.fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        LastSuperBowl.fudge.Loop.start(LastSuperBowl.fudge.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            processInput();
            viewport.draw();
            //"Fadenkreuz"
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
            //Camera fest auf Helden
            cmpCamera.pivot.translation = new LastSuperBowl.fudge.Vector3(hare.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
        }
    }
    function handleKeyboard(_event) {
        keysPressed[_event.code] = (_event.type == "keydown");
    }
    function processInput() {
        if (hare.speed.y == 0) {
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.A]) {
                hare.act(LastSuperBowl.ACTION.WALK, LastSuperBowl.DIRECTION.LEFT);
                return;
            }
            if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.D]) {
                hare.act(LastSuperBowl.ACTION.WALK, LastSuperBowl.DIRECTION.RIGHT);
                return;
            }
        }
        if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.W]) {
            hare.act(LastSuperBowl.ACTION.JUMP);
            return;
        }
        if (keysPressed[LastSuperBowl.fudge.KEYBOARD_CODE.E]) {
            //ändern wenn mehr Items
            LastSuperBowl.Inventory.action(LastSuperBowl.ITEM.FOOTBALL);
        }
        hare.act(LastSuperBowl.ACTION.IDLE);
    }
    //function loadLevel(){
    //  console.log("Test");
    //}
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Main.js.map