namespace LastSuperBowl {
  export import fudge = FudgeCore;

  window.addEventListener("load", MainGame);

  interface KeyPressed {
    [code: string]: boolean;
  }
  let keysPressed: KeyPressed = {};

  export let game: fudge.Node;
  let hare: Hare;
  export let level: Level;
  export let floorHigh: FloorHigh;


  function MainGame(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let imgHare: HTMLImageElement = document.querySelector("img");
    let txtHare: fudge.TextureImage = new fudge.TextureImage();
    txtHare.image = imgHare;
    Hare.generateSprites(txtHare);
    Floor.generateSprites(txtHare);
    Item.generateSprites(txtHare);

    fudge.RenderManager.initialize(true, false);
    game = new fudge.Node("Game");
    // game.addComponent(new fudge.ComponentTransform());
    // game.cmpTransform.local.translateY(-1);

    hare = new Hare("Hare");
    level = new Level();
    floorHigh = new FloorHigh();
    
    game.appendChild(hare);
    game.appendChild(level);
    game.appendChild(floorHigh);

    //Camera Setup
    let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");

    //Viewport Setup
    let viewport: fudge.Viewport = new fudge.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    //KeyEvents
    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);

    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
    fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);

    function update(_event: fudge.Eventƒ): void {
      processInput();

      viewport.draw();

      //"Fadenkreuz"
      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);

      //Camera fest auf Helden
      cmpCamera.pivot.translation = new fudge.Vector3 (hare.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
  }

  function processInput(): void {
    if (hare.speed.y == 0) {
      if (keysPressed[fudge.KEYBOARD_CODE.A]) {
        hare.act(ACTION.WALK, DIRECTION.LEFT);
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.D]) {
        hare.act(ACTION.WALK, DIRECTION.RIGHT);
        return;
      }
    }
    if (keysPressed[fudge.KEYBOARD_CODE.W]) {
      hare.act(ACTION.JUMP);
      return;  
    }
    if (keysPressed[fudge.KEYBOARD_CODE.E]) {
      //ändern wenn mehr Items
      Inventory.action(ITEM.FOOTBALL);
    }

    hare.act(ACTION.IDLE);
  }
}