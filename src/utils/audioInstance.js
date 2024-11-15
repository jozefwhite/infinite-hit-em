// src/utils/audioInstance.js
class AudioSingleton {
  constructor() {
    if (!AudioSingleton.instance) {
      this.audio = new Audio();
      AudioSingleton.instance = this;
    }
    return AudioSingleton.instance;
  }

  getAudio() {
    return this.audio;
  }
}

const instance = new AudioSingleton();
Object.freeze(instance);

export default instance.getAudio();
