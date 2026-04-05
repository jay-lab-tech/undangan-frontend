import { progress } from './progress.js';
import { util } from '../../common/util.js';

export const audio = (() => {

    const statePlay = '<i class="fa-solid fa-circle-pause spin-button"></i>';
    const statePause = '<i class="fa-solid fa-circle-play"></i>';

    /**
     * @param {boolean} [playOnOpen=true]
     * @returns {Promise<void>}
     */
    const load = async (playOnOpen = true) => {

        const url = document.body.getAttribute('data-audio');
        if (!url) {
            progress.complete('audio', true);
            return;
        }

        let isOpened = false;
        const music = document.getElementById('button-music');

        /**
         * @type {HTMLAudioElement|null}
         */
        let audioEl = null;

        /**
         * @type {() => Promise<void>}
         */
        let playOnOpenNow = async () => { };

        document.addEventListener('undangan.open', async () => {
            isOpened = true;

            if (music) {
                music.classList.remove('d-none');
            }

            await playOnOpenNow();
        });

        try {
            audioEl = new Audio(url);
            audioEl.loop = true;
            audioEl.muted = false;
            audioEl.autoplay = false;
            audioEl.controls = false;
            audioEl.preload = 'auto';

            progress.complete('audio');
        } catch {
            progress.invalid('audio');
            return;
        }

        let isPlay = false;

        /**
         * @returns {Promise<void>}
         */
        const play = async () => {
            if (!navigator.onLine || !music) {
                return;
            }

            music.disabled = true;
            try {
                await audioEl.play();
                isPlay = true;
                music.disabled = false;
                music.innerHTML = statePlay;
            } catch (err) {
                isPlay = false;
                util.notify(err).error();
            }
        };

        /**
         * @returns {void}
         */
        const pause = () => {
            isPlay = false;
            audioEl.pause();
            music.innerHTML = statePause;
        };

        playOnOpenNow = async () => {
            if (playOnOpen) {
                await play();
            }
        };

        if (isOpened && playOnOpen) {
            await play();
        }

        music.addEventListener('offline', pause);
        music.addEventListener('click', () => isPlay ? pause() : play());
    };

    /**
     * @returns {object}
     */
    const init = () => {
        progress.add();

        return {
            load,
        };
    };

    return {
        init,
    };
})();
