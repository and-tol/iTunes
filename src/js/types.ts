/**
 * @interface F add method to function = extends function proto
 */
export interface F {
  (): void;
  stop: () => void;
}

/**
  * @interface AudioProps for extends of Audio() constructor and extends HTMLAudioElement
  */
export interface AudioProps {
  type?: string | undefined,
  src?: string | undefined,
}
