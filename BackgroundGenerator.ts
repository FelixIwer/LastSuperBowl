namespace LastSuperBowl {
    import fudge = FudgeCore;

    export class BackgroundHandler extends fudge.Node {

        private backgrounds: Background[];
        private leftBackground: number = 0;
        private lastAstroPos: number = 0;

        public constructor() {
            super("BackgroundHandler");

            this.backgrounds = [];
            this.backgrounds[0] = new Background();
            this.backgrounds[1] = new Background();
            this.backgrounds[2] = new Background();

            this.backgrounds[0].show(BACKGROUND.ONE);
            this.backgrounds[1].show(BACKGROUND.TWO);
            this.backgrounds[2].show(BACKGROUND.THREE);

            for (let bg of this.backgrounds)     
                this.appendChild(bg);

            // this.backgrounds[0].cmpTransform.local.translateX(0);
            this.backgrounds[1].cmpTransform.local.translateX(10);
            // this.backgrounds[2].cmpTransform.local.translateX(10);

            fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.update);
        }

        private update = (_event: fudge.Eventƒ): void => {
            console.log(this.lastAstroPos, "POSITION", player.cmpTransform.local.translation.x);
            if (this.lastAstroPos + 5 < player.cmpTransform.local.translation.x) {
                this.backgrounds[this.leftBackground].cmpTransform.local.translateX(10);
                this.leftBackground += 1;
                if (this.leftBackground == 3)
                    this.leftBackground = 0;
                this.lastAstroPos += 1;
            }
        }
    }
}