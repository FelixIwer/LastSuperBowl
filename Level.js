"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class Level extends fudge.Node {
        static createCollegeLevel() {
            let level = new fudge.Node("Level");
            let item = new LastSuperBowl.Item;
            item.cmpTransform.local.translateX(5);
            item.cmpTransform.local.translateY(-0.5);
            level.appendChild(item);
            let floor = new LastSuperBowl.Floor;
            floor.cmpTransform.local.translateX(1);
            level.appendChild(floor);
            let newFloor = 0;
            for (let i = 0; i < 100; i++) {
                let floor = new LastSuperBowl.Floor;
                console.log(newFloor);
                floor.cmpTransform.local.translateY(-1);
                floor.cmpTransform.local.translateX(newFloor);
                level.appendChild(floor);
                newFloor += 0.5;
            }
            return level;
        }
    }
    LastSuperBowl.Level = Level;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Level.js.map