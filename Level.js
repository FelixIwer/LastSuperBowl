"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class Level extends fudge.Node {
        static createLevel() {
            let level = new fudge.Node("Level");
            let floor = new LastSuperBowl.Floor();
            floor.cmpTransform.local.scaleY(0.5);
            level.appendChild(floor);
            floor = new LastSuperBowl.Floor();
            floor.cmpTransform.local.scaleY(0.5);
            floor.cmpTransform.local.scaleX(0.5);
            floor.cmpTransform.local.translateY(0.2);
            floor.cmpTransform.local.translateX(1.5);
            level.appendChild(floor);
            return level;
        }
    }
    LastSuperBowl.Level = Level;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Level.js.map