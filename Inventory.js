"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class Inventory extends fudge.Node {
        static currentInventory(_name) {
            let Inventory = new fudge.Node("Inventory");
            return Inventory;
        }
        static action(_name) {
            switch (_name) {
                case LastSuperBowl.ITEM.FOOTBALL:
                    console.log(_name);
                //till checkCollision
                case LastSuperBowl.ITEM.BILLSDILDO:
                    console.log(_name);
            }
        }
    }
    LastSuperBowl.Inventory = Inventory;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Inventory.js.map