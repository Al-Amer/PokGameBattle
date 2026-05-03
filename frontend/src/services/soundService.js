class SoundService {
  constructor() {
    this.enabled = true;
    this.audioContext = null;
    this.isInitialized = false;
  }

  // Initialize on user interaction
  init() {
    if (!this.audioContext && window.AudioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.isInitialized = true;
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  playBeep(frequency, duration, volume = 0.1) {
    try {
      this.init();
      if (!this.audioContext) return;
      
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = frequency;
      gainNode.gain.value = volume;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.00001, this.audioContext.currentTime + duration);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio error:', error);
    }
  }

  playAttackSound() {
    if (!this.enabled) return;
    this.playBeep(400, 0.15, 0.15);
    setTimeout(() => this.playBeep(300, 0.1, 0.1), 50);
  }

  playHitSound() {
    if (!this.enabled) return;
    this.playBeep(200, 0.2, 0.2);
  }

  playVictorySound() {
    if (!this.enabled) return;
    const notes = [523, 659, 784, 1047];
    notes.forEach((note, i) => {
      setTimeout(() => this.playBeep(note, 0.3, 0.15), i * 200);
    });
  }

  playDefeatSound() {
    if (!this.enabled) return;
    const notes = [440, 392, 349, 330];
    notes.forEach((note, i) => {
      setTimeout(() => this.playBeep(note, 0.3, 0.15), i * 200);
    });
  }

  playSelectSound() {
    if (!this.enabled) return;
    this.playBeep(600, 0.1, 0.1);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export default new SoundService();
