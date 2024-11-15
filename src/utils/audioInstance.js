// src/utils/audioInstance.js
class AudioSingleton {
  constructor() {
    if (!AudioSingleton.instance) {
      this.audio = new Audio();
      AudioSingleton.instance = this;
    }
    return AudioSingleton.instance;
  }

  play(sourceUrl) {
    if (sourceUrl && this.audio.src !== sourceUrl) {
      this.audio.src = sourceUrl;
    }
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  setVolume(volume) {
    this.audio.volume = volume;
  }

  addEventListener(event, callback) {
    this.audio.addEventListener(event, callback);
  }

  removeEventListener(event, callback) {
    this.audio.removeEventListener(event, callback);
  }
}

const instance = new AudioSingleton();
Object.freeze(instance);

export default instance;
