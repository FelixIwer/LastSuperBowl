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
                if (index == 1) {
                    _floorhigh = new LastSuperBowl.Floor(floorDistance, 1.5, LastSuperBowl.ITEM.FOOTBALL);
                }
                else {
                    _floorhigh = new LastSuperBowl.Floor(floorDistance, 1.5);
                }
                floorDistance = floorDistance + 0.25;
                this.appendChild(_floorhigh);
            }
            for (let index = 0; index < 3; index++) {
                if (index == 1) {
                    _floorhigh = new LastSuperBowl.Floor(floorDistance, 1.5, LastSuperBowl.ITEM.BILLSDILDO);
                }
                else {
                    _floorhigh = new LastSuperBowl.Floor(floorDistance, 1.5);
                }
                floorDistance = floorDistance + 0.25;
                _floorhigh.cmpTransform.local.translateX(2);
                this.appendChild(_floorhigh);
            }
            for (let index = 0; index < 3; index++) {
                if (index == 1) {
                    _floorhigh = new LastSuperBowl.Floor(floorDistance, 1.5, LastSuperBowl.ITEM.BILLSDILDO);
                }
                else {
                    _floorhigh = new LastSuperBowl.Floor(floorDistance, 1.5);
                }
                floorDistance = floorDistance + 0.25;
                _floorhigh.cmpTransform.local.translateX(4);
                this.appendChild(_floorhigh);
            }
            return LastSuperBowl.level;
        }
    }
    LastSuperBowl.FloorHigh = FloorHigh;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=FloorHigh.js.map