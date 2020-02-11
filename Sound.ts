namespace LastSuperBowl {

    interface Sounds {
    [id: string]: HTMLAudioElement;
    }

    export class Sound {
        public static  muted: boolean = false;
        private static sounds: Sounds = {};

        public static init(): void {
            let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
            for (let element of audioElements) {
                Sound.sounds[element.id] = element;
            }
        }

        public static play(_id: string): void {
            Sound.sounds[_id].play();
        }

        public static playMusic(): void {
            Sound.sounds["backgroundSound"].loop = true;
            Sound.sounds["backgroundSound"].play();
            Sound.sounds["backgroundSound"].volume = 0.2;
        }

        public static pauseMusic(): void {
            Sound.sounds["backgroundSound"].pause();
        }
        public static continueMusic(): void {
            Sound.sounds["backgroundSound"].play();
        }
      }
    }
}