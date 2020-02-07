namespace LastSuperBowl {

    import fudge = FudgeCore;
  
    export class FloorHigh extends fudge.Node {
  
      constructor() {
        super("FloorHigh");
  
        let floorHigh: Floor;
  
        this.generateFloorHigh(floorHigh);
      }
  
      private generateFloorHigh(_floorhigh: Floor, _item?: ITEM): fudge.Node {
        let floorDistance: number = 1;
  
        for (let index: number = 0; index < 3; index++) {
            console.log(index);
            if (index == 1) {
                _floorhigh = new Floor(floorDistance, 1, ITEM.FOOTBALL);
            } else {
                _floorhigh = new Floor(floorDistance, 1);
            }
            floorDistance = floorDistance + 0.25;

            this.appendChild(_floorhigh);
        }
  
        return level;
      }
    }
}