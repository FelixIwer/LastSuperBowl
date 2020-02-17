namespace LastSuperBowl {
  export import fudge = FudgeCore;

  window.addEventListener("load", MainGame);

  interface KeyPressed {
    [code: string]: boolean;
  }
  
  let keysPressed: KeyPressed = {};

  export let game: fudge.Node;
  export let player: Player;
  export let level: Level;
  export let floorHigh: FloorHigh;
  export let enemy: Enemy;

  export let score: number = 0;
  export let team: TEAM = TEAM.NONE;
  export let itemContainer: fudge.Node;


  function MainGame(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let imgPlayer: HTMLImageElement = document.querySelector("img");
    let txtPlayer: fudge.TextureImage = new fudge.TextureImage();
    txtPlayer.image = imgPlayer;
    Player.generateSprites(txtPlayer);
    Floor.generateSprites(txtPlayer);
    Item.generateSprites(txtPlayer);
    Enemy.generateSprites(txtPlayer);
    Gravestone.generateSprites(txtPlayer);
    Background.generateSprites(txtPlayer);

    fudge.RenderManager.initialize(true, false);
    game = new fudge.Node("Game");
    // game.addComponent(new fudge.ComponentTransform());
    // game.cmpTransform.local.translateY(-1);

    itemContainer = new fudge.Node("ItemContainer");
    player = new Player("Player");
    level = new Level();
    floorHigh = new FloorHigh();
    enemy = new Enemy("Enemy");

    game.appendChild(player);
    game.appendChild(itemContainer);
    game.appendChild(enemy);
    game.appendChild(level);
    game.appendChild(floorHigh);

    game.appendChild(new BackgroundHandler());

    //Hitbox für Char anzeigen
    //game.appendChild(player.createHitbox());
    //game.appendChild(enemy.createHitbox());

    //Camera Setup
    let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translateZ(20);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");

    //Musik
    Sound.init();
    Sound.playMusic();

    //Viewport Setup
    let viewport: fudge.Viewport = new fudge.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    //KeyEvents
    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);

    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
    fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);


    //Draft
    team = player.randomTeam();

    //if alive == false Game restart

    function update(_event: fudge.Eventƒ): void {
      if (player.alive == true) {
        processInput();
      } else {
        endScreen();
      }

      viewport.draw();

      //"Fadenkreuz"
      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);

      //Camera fest auf Helden
      cmpCamera.pivot.translation = new fudge.Vector3 (player.cmpTransform.local.translation.x, cmpCamera.pivot.translation.y, cmpCamera.pivot.translation.z);

      countScore();

      if (player.item != "None") {
        console.log(player.item);
        //item.cmpTransform.local.translation = new fudge.Vector3(player.mtxWorld.translation.x, 3, 0);
      }
    }
  }

  function handleKeyboard(_event: KeyboardEvent): void {
    keysPressed[_event.code] = (_event.type == "keydown");
  }

  function processInput(): void {
    if (player.alive == true) {
      if (keysPressed[fudge.KEYBOARD_CODE.A]) {
        player.act(ACTION.WALK, DIRECTION.LEFT);
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.D]) {
        player.act(ACTION.WALK, DIRECTION.RIGHT);
        return;
      }
      if (keysPressed[fudge.KEYBOARD_CODE.W]) {
        player.act(ACTION.JUMP);
        return;  
      }
      if (player.item != "None") {
        if (keysPressed[fudge.KEYBOARD_CODE.E]) {
          if (player.item == "Skittles" || player.item == "SBTrophy" || player.item == "Gatorade"){
            player.act(ACTION.USE, null, null, false);
          } else {
            player.act(ACTION.USE, DIRECTION.RIGHT, player.item, true);
          }
          return;
        }
      }

      player.act(ACTION.IDLE);
    }
  }

  // function removeFiredItem(): void{

  // }

  function countScore(): void {
    if (player.mtxWorld.translation.x > score) {
      score = Math.round(player.cmpTransform.local.translation.x);
    }
    let sString: string = score.toString();
    document.getElementById("Score").innerHTML = sString;
  }

  function endScreen(): void {
    let over: HTMLElement = document.querySelector("div#endScreen");
    over.style.visibility = "visible";
    let sString: string = score.toString();
    document.getElementById("endScore").innerHTML = sString;

    //remove Movement, Player and Pause Music
    window.removeEventListener("keydown", handleKeyboard);
    window.removeEventListener("keyup", handleKeyboard);
    Sound.pauseMusic();
    player.speed.x = 0;
    player.speed.y = 0;

    game.removeChild(player);
  }
}