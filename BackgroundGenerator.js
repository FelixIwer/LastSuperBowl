"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    var fudge = FudgeCore;
    class BackgroundHandler extends fudge.Node {
        constructor() {
            super("BackgroundHandler");
            this.leftBackground = 0;
            this.lastAstroPos = 0;
            this.update = (_event) => {
                console.log(this.lastAstroPos, "POSITION", LastSuperBowl.player.cmpTransform.local.translation.x);
                if (this.lastAstroPos + 5 < LastSuperBowl.player.cmpTransform.local.translation.x) {
                    this.backgrounds[this.leftBackground].cmpTransform.local.translateX(10);
                    this.leftBackground += 1;
                    if (this.leftBackground == 3)
                        this.leftBackground = 0;
                    this.lastAstroPos += 1;
                }
            };
            this.backgrounds = [];
            this.backgrounds[0] = new LastSuperBowl.Background();
            this.backgrounds[1] = new LastSuperBowl.Background();
            this.backgrounds[2] = new LastSuperBowl.Background();
            this.backgrounds[0].show(LastSuperBowl.BACKGROUND.ONE);
            this.backgrounds[1].show(LastSuperBowl.BACKGROUND.TWO);
            this.backgrounds[2].show(LastSuperBowl.BACKGROUND.THREE);
            for (let bg of this.backgrounds)
                this.appendChild(bg);
            // this.backgrounds[0].cmpTransform.local.translateX(0);
            this.backgrounds[1].cmpTransform.local.translateX(10);
            // this.backgrounds[2].cmpTransform.local.translateX(10);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
    }
    LastSuperBowl.BackgroundHandler = BackgroundHandler;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=BackgroundGenerator.js.map