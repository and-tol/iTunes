import { addZero } from './helpers';
import { F, AudioProps } from './types';



/**
 * @function audioPlayerInit is the audio player
 */
export const audioPlayerInit = <F>function (): void {
  const audio: HTMLElement | null = document.querySelector('.audio');
  const audioImg: HTMLImageElement | null = document.querySelector('.audio-img');
  const audioHeader: HTMLHeadingElement | null = document.querySelector('.audio-header');
  const audioPlayer: HTMLAudioElement & AudioProps | null = document.querySelector('.audio-player');
  const audioNavigation: HTMLElement | null = document.querySelector('.audio-navigation');
  const audioButtonPlay: HTMLButtonElement | null = document.querySelector('.audio-button__play');
  const audioProgress: HTMLDivElement | null = document.querySelector('.audio-progress');
  const audioProgressTiming: HTMLDivElement | null = document.querySelector('.audio-progress__timing');
  const audioTimePassed: HTMLSpanElement | null = document.querySelector('.audio-time__passed');
  const audioTimeTotal: HTMLSpanElement | null = document.querySelector('.audio-time__total');

  /**
   * @description we have not backend, therefore we describe the playlist in the array
   */
  const playlist: string[] = ['flow', 'hello', 'speed'];
  /**
   * @variable trackIndex index which be playing track now
   */
  let trackIndex: number = 0

  /**
   * @function loadTrack load track content, track image; start and stop track playing 
   */
  const loadTrack = (): void => {
    const isPlayed: boolean | undefined = audioPlayer?.paused;
    const track: string = playlist[trackIndex];

    audioImg!.src = `./audio/${track}.jpg`;
    audioHeader!.textContent = track.toUpperCase();
    audioPlayer!.src = `./audio/${track}.mp3`;

    if (isPlayed) {
      audioPlayer?.pause();
    } else {
      audioPlayer?.play();
    }

    audioPlayer?.addEventListener('canplay', (): void => {
      updateTime()
    })
  }

  /**
   * @function prevTrack change track index - decrease and start function loadTrack
   */
  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--
    } else {
      trackIndex = playlist.length - 1
    }
    loadTrack();
  }

  /**
   * @function nextTrack change track index - increase and start function loadTrack
   */
  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  }

  // *--- Events ---*
  /**
   * @description Event control the tracks: play, stop, next
   */
  audioNavigation?.addEventListener('click', (event: MouseEvent): void => {
    const target = <HTMLElement>event.target

    if (target.classList.contains('audio-button__play')) {
      audio?.classList.toggle('play');
      audioButtonPlay?.classList.toggle('fa-play');
      audioButtonPlay?.classList.toggle('fa-pause');

      if (audioPlayer?.paused) {
        audioPlayer.play();
      } else {
        audioPlayer?.pause();
      }

      const track: string = playlist[trackIndex];
      audioHeader!.textContent = track.toUpperCase();
    }

    if (target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  });

  /**
   * @description Event when song finish start next track
   */
  audioPlayer?.addEventListener('ended', (): void => {
    nextTrack();
    audioPlayer.play();
  });

  /**
   * @function updateTime change show time in player interface
   */
  const updateTime = (): void => {
    const duration: number = audioPlayer!.duration || 0;
    const currentTime: number = audioPlayer!.currentTime || 0;
    const progress: number = (currentTime / duration) * 100;

    audioProgressTiming!.style.width = `${progress}%`;

    const minutesPassed: number = Math.floor(currentTime / 60);
    const secondsPassed: number = Math.floor(currentTime % 60);

    const minutesTotal: number = Math.floor(duration / 60);
    const secondsTotal: number = Math.floor(duration % 60);

    audioTimePassed!.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal!.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  }

  /** 
   * @description  When event happen is showing progress of playing song in the player interface
   */
  audioPlayer?.addEventListener('timeupdate', updateTime)

  /**
   * @description When event happen  progress of song playing is changing
   */
  audioProgress?.addEventListener('click', (event: MouseEvent) => {
    const x: number = event.offsetX
    const allWidth: number = audioProgress.clientWidth;
    const progress: number = (x / allWidth) * audioPlayer!.duration;

    audioPlayer!.currentTime = progress;
  });

  audioPlayerInit.stop = () => {
    if (!audioPlayer!.paused) {
      audioPlayer?.pause()
      audio?.classList.remove('play')
      audioButtonPlay?.classList.remove('fa-pause')
      audioButtonPlay?.classList.add('fa-play')
    }
  }

}
