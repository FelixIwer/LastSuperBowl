"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class Level extends fudge.Node {
        constructor() {
            super("Level");
            let level;
            this.createLevel(level);
        }
        createLevel(_level) {
            let floorDistance = -5;
            for (let index = 0; index < 100; index++) {
                _level = new LastSuperBowl.Floor(floorDistance);
                floorDistance += 0.45;
                this.appendChild(_level);
            }
            return LastSuperBowl.level;
        }
    }
    LastSuperBowl.Level = Level;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Level.js.map