class Sound {
  constructor() {
    this._audio = new Audio();
    this._music = new Audio();
    this._music.src = './assets/sounds/music.mp3';
    this._isMusicPlay = true;
  }

  updateSetting(setting) {
    this._isSound = setting.volume.check;
    this._volumeValue = setting.volume.value;
    this._isMusic = setting.music.check;
    this._musicValue = setting.music.value;
    if (this._isMusic) {
      this._playMusic();
    } else {
      this._music.pause();
      this.__isMusicPlay = false;
    }
  }

  correctAnswer() {
    if (this._isSound) {
      this._audio.src = './assets/sounds/correct-answer.mp3';
      this._audio.volume = this._volumeValue;
      this._audio.play();
    }
  }

  wrongAnswer() {
    if (this._isSound) {
      this._audio.src = './assets/sounds/wrong_answer.mp3';
      this._audio.volume = this._volumeValue;
      this._audio.play();
    }
  }

  endOfGame() {
    if (this._isSound) {
      this._audio.src = './assets/sounds/end_of_game.mp3';
      this._audio.volume = this._volumeValue;
      this._audio.play();
    }
  }

  _playMusic() {
    if (!this._isMusicPlay) {
      this._music.currentTime = 0;
    }
    this._music.volume = this._musicValue;
    this._music.play();
    this._music.onended = () => {
      this._music.currentTime = 0;
      this._music.play();
    };
  }
}

export default new Sound();
