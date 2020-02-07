"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class FloorHigh extends fudge.Node {
        constructor() {
            super("FloorHigh");
            let floorHigh;
            this.generateFloorHigh(floorHigh);
        }
        generateFloorHigh(_floorhigh, _item) {
            let floorDistance = 1;
            for (let index = 0; index < 3; index++) {
                console.log(index);
                if (index == 1) {
                    _floorhigh = new LastSuperBowl.Floor(floorDistance, 1, LastSuperBowl.ITEM.FOOTBALL);
                }
                else {
                    _floorhigh = new LastSuperBowl.Floor(floorDistance, 1);
                }
                floorDistance = floorDistance + 0.25;
                this.appendChild(_floorhigh);
            }
            return LastSuperBowl.level;
        }
    }
    LastSuperBowl.FloorHigh = FloorHigh;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=FloorHigh.js.map