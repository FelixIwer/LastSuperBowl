namespace LastSuperBowl {

    import fudge = FudgeCore;

    export class Level extends fudge.Node {

    constructor() {
      super("Level");

      let level: Floor;
      this.createLevel(level);
    }
    
    private createLevel(_level: Floor): fudge.Node {
      let floorDistance: number = -5;
      
      for (let index: number = 0; index < 100; index++) {
        _level = new Floor(floorDistance);
        floorDistance += 0.45;
       
        this.appendChild(_level);        
      }

      return level;
    }
  }
}