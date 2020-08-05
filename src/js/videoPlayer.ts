import { addZero } from './helpers';
import { F } from './types';


export const videoPlayerInit = <F>function() {
  const videoPlayer: HTMLVideoElement | null = document.querySelector('.video-player')
  const videoButtonPlay: HTMLButtonElement | null = document.querySelector('.video-button__play')
  const videoButtonStop: HTMLButtonElement | null = document.querySelector('.video-button__stop');
  const videoTimePassed: HTMLElement | null = document.querySelector('.video-time__passed');
  const videoProgress: HTMLInputElement | null = document.querySelector('.video-progress');
  const videoTimeTotal: HTMLElement | null = document.querySelector('.video-time__total');

  /**
   * @function toggleIcon toggle icons when are clicking on icon play/pause in player's interface
   */
  const toggleIcon = (): void => {
    if (videoPlayer!.paused) {
      videoButtonPlay!.classList.remove('fa-pause');
      videoButtonPlay!.classList.add('fa-play');
    } else {
      videoButtonPlay!.classList.remove('fa-play');
      videoButtonPlay!.classList.add('fa-pause');
    }
  }

  /**
   * @function togglePlay implement play/stop of player
   */
  const togglePlay = (): void => {
    if (videoPlayer!.paused) {
      videoPlayer!.play();
    } else if (videoPlayer!.paused === false) {
      videoPlayer!.pause();
    }
    // toggleIcon();
  }

  /**
   * @function stopPlay set player on pause & return time in start position
   */
  const stopPlay = () => {
    videoPlayer!.pause();
    videoPlayer!.currentTime = 0;
  }

  // *--- Events ---*
  /**
   * @description Event start or stop video when is clicking on player
   */
  videoPlayer?.addEventListener('click', () => {
    togglePlay();
  });
  /**
   * @description Event start or stop video when is clicking on button in player's interface
   */
  videoButtonPlay?.addEventListener('click', togglePlay)
  /**
   * @description Events change icon on interface of player
   */
  videoPlayer?.addEventListener('play', toggleIcon)
  videoPlayer?.addEventListener('pause', toggleIcon)
  /**
   * @description event stop play
   */
  videoButtonStop?.addEventListener('click', stopPlay)
  /**
   * @description event happen when change time of video
   * @callback anonymous show duration & progress time of video
   */
  videoPlayer?.addEventListener('timeupdate', () => {
    const currentTime: number = videoPlayer.currentTime
    const duration: number = videoPlayer!.duration;

    videoProgress!.value = (currentTime / duration) * 100;

    let minutesPassed: number = Math.floor(currentTime / 60);
    let secondsPassed: number = Math.floor(currentTime % 60);

    let minuteTotal: number = Math.floor(duration / 60);
    let secondsTotal: number = Math.floor(duration % 60);

    videoTimePassed!.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
    videoTimeTotal!.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
  })

  videoProgress?.addEventListener('change', () => {
    const duration: number = videoPlayer!.duration;
    const value: number = Number.parseInt(videoProgress.value);

    videoPlayer!.currentTime = (value * duration) / 100;
  });

  videoPlayerInit.stop = () => {
    if (!videoPlayer!.paused) {
      stopPlay()
    }
  }
};
