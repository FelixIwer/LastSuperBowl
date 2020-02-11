"use strict";
var LastSuperBowl;
(function (LastSuperBowl) {
    class Sound {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements) {
                Sound.sounds[element.id] = element;
            }
        }
        static play(_id) {
            Sound.sounds[_id].play();
        }
        static playMusic() {
            Sound.sounds["backgroundSound"].loop = true;
            Sound.sounds["backgroundSound"].play();
            Sound.sounds["backgroundSound"].volume = 0.2;
        }
        static pauseMusic() {
            Sound.sounds["backgroundSound"].pause();
        }
        static continueMusic() {
            Sound.sounds["backgroundSound"].play();
        }
    }
    Sound.muted = false;
    Sound.sounds = {};
    LastSuperBowl.Sound = Sound;
})(LastSuperBowl || (LastSuperBowl = {}));
//# sourceMappingURL=Sound.js.map