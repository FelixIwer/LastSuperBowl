namespace LastSuperBowl {

    import fudge = FudgeCore;

    export class Inventory extends fudge.Node {

        public static currentInventory(_name: ITEM): fudge.Node {
            let Inventory: fudge.Node = new fudge.Node("Inventory");

            return Inventory;
        }

        public static action(_name: ITEM): void {
            switch (_name) {
                case ITEM.FOOTBALL:
                    console.log(_name);
                    //till checkCollision
                case ITEM.BILLSDILDO:
                    console.log(_name);
            }
        }
    }
}