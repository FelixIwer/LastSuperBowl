namespace LastSuperBowl {

    import fudge = FudgeCore;
  
    export class FloorHigh extends fudge.Node {
  
      constructor() {
        super("FloorHigh");
  
        let floorHigh: Floor;
  
        this.generateFloorHigh(floorHigh);
      }
  
      public generateFloorHigh(_floorhigh: Floor, _item?: ITEM): fudge.Node {
        let floorDistance: number = 1;
        
        for (let index: number = 0; index < 3; index++) {
            if (index == 1) {
                _floorhigh = new Floor(floorDistance, 1.5, ITEM.FOOTBALL);
            } else {
                _floorhigh = new Floor(floorDistance, 1.5);
            }
            floorDistance = floorDistance + 0.25;

            this.appendChild(_floorhigh);
        }

        for (let index: number = 0; index < 3; index++) {
          if (index == 1) {
              _floorhigh = new Floor(floorDistance, 1.5, ITEM.BILLSDILDO);
          } else {
              _floorhigh = new Floor(floorDistance, 1.5);
          }
          floorDistance = floorDistance + 0.25;

          _floorhigh.cmpTransform.local.translateX(2);
          this.appendChild(_floorhigh);
        }

        for (let index: number = 0; index < 3; index++) {
          if (index == 1) {
              _floorhigh = new Floor(floorDistance, 1.5, ITEM.BILLSDILDO);
          } else {
              _floorhigh = new Floor(floorDistance, 1.5);
          }
          floorDistance = floorDistance + 0.25;

          _floorhigh.cmpTransform.local.translateX(4);
          this.appendChild(_floorhigh);
        }

        return level;
      }
    }
}