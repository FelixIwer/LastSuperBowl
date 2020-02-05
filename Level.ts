namespace LastSuperBowl {

    import fudge = FudgeCore;

    export class Level extends fudge.Node {

    public static createCollegeLevel(): fudge.Node {
        let level: fudge.Node = new fudge.Node("Level");
        let newFloor: number = 0;

        for ( let i:number = 0; i < 100; i++) {
          let floor: Floor = new Floor;
          console.log(newFloor);
          floor.cmpTransform.local.translateY(-1);
          floor.cmpTransform.local.translateX(newFloor);
          level.appendChild(floor);
          newFloor += 0.2;
        }

        return level;
      }

    }
}