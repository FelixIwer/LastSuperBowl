namespace LastSuperBowl {

    import fudge = FudgeCore;

    export class Level extends fudge.Node {

    public static createLevel(): fudge.Node {
        let level: fudge.Node = new fudge.Node("Level");
        let floor: Floor = new Floor();
        floor.cmpTransform.local.scaleY(0.5);
        level.appendChild(floor);
    
        floor = new Floor();
        floor.cmpTransform.local.scaleY(0.5);
        floor.cmpTransform.local.scaleX(0.5);
        floor.cmpTransform.local.translateY(0.2);
        floor.cmpTransform.local.translateX(1.5);
        level.appendChild(floor);
    
        return level;
      }

    }
}