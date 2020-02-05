"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class Level extends fudge.Node {
        static createCollegeLevel() {
            let level = new fudge.Node("Level");
            let newFloor = 0;
            for (let i = 0; i < 100; i++) {
                let floor = new LastSuperBowl.Floor;
                console.log(newFloor);
                floor.cmpTransform.local.translateY(-1);
                floor.cmpTransform.local.translateX(newFloor);
                level.appendChild(floor);
                newFloor += 0.2;
            }
            return level;
        }
    }
    LastSuperBowl.Level = Level;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Level.js.map