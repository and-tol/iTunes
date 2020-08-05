import { F, AudioProps } from './types'

/**
 * @function radioPlayerInit is the radio player
 */
export const radioPlayerInit = <F>function (): void {
  const radio: HTMLElement | null = document.querySelector('.radio')
  const radioCoverImg: HTMLImageElement | null = document.querySelector('.radio-cover__img')
  const radioHeaderBig: HTMLElement | null = document.querySelector('.radio-header__big')
  const radioNavigation: HTMLFormElement | null = document.querySelector('.radio-navigation')
  const radioItems: NodeListOf<HTMLLIElement> = document.querySelectorAll('.radio-item')
  const radioStop: HTMLButtonElement | null = document.querySelector('.radio-stop')

 

  /**
   * @constructor Audio
   */
  const audio: HTMLAudioElement & AudioProps = new Audio();
  audio.type = 'audio/aac';

  radioStop!.disabled = true;

  /**
   * @function changeIconPlay toggle icon of radio player interface
   */
  const changeIconPlay = (): void => {
    if (audio.paused) {
      radio?.classList.remove('play')
      radioStop?.classList.add('fa-play')
      radioStop?.classList.remove('fa-stop')
    } else {
      radio?.classList.add('play')
      radioStop?.classList.add('fa-stop')
      radioStop?.classList.remove('fa-play')
    }
  }

  /**
   * @function selectItem remove & add class from DOM element
   * @param element DOM element
   */
  const selectItem = (element: HTMLElement, className: string = 'select') => {
    radioItems.forEach(item => item.classList.remove(className));
    element?.classList.add(className);
  }

  /**
   * @description event happen when change radio station
   */
  radioNavigation?.addEventListener('change', (event: Event): void => {
    const target = <HTMLElement>event.target;
    // const target = event.target as HTMLElement;
    const parent: HTMLElement | null = target!.closest('.radio-item');
    /**
     * @description Call function selectItem for toggle circle decoration with click
     */
    selectItem(parent!);

    /**
     * @constant title get radio station name
     */
    const title: string | null | undefined = parent?.querySelector('.radio-name')?.textContent;
    radioHeaderBig!.textContent = <string>title;

    const urlImg: string = (<HTMLImageElement>parent!.querySelector('.radio-img')).src;
    radioCoverImg!.src = urlImg;

    radioStop!.disabled = false;
    audio.src = <string>target!.dataset.radioStation

    audio.play();
    changeIconPlay();
  })

  radioStop?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }

    changeIconPlay();
  })

  radioPlayerInit.stop = () => {
    audio.pause();
    changeIconPlay();
  }
}
