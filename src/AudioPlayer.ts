import {frequencyMap, NoteName} from './frequencies'

const noteNames = Object.keys(frequencyMap)

export class AudioPlayer {
    private audioContext: AudioContext
    private oscillators: Record<string, { oscillator: OscillatorNode, gainNode: GainNode }>

    constructor() {
      this.audioContext = new window.AudioContext();
      this.oscillators = {};
      this.unlockAudioContext()
    }
  
    play(notes: string[]) {  
      notes.filter(note => note in frequencyMap).forEach(note => {
        if (!this.oscillators[note]) {
          const oscillator = this.audioContext.createOscillator();
          oscillator.type = 'sawtooth'; // You can change the waveform type if desired
          oscillator.frequency.setValueAtTime(frequencyMap[note as NoteName], this.audioContext.currentTime);
          
          const gainNode = this.audioContext.createGain();
          gainNode.gain.value = 0.3; // Reduce the volume (adjust as needed)
  
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          oscillator.start();
          this.oscillators[note] = { oscillator, gainNode };
        }
      });
    }
  
    stop(notes: string[]) {
      notes.filter(note => note in frequencyMap).forEach(note => {
        const oscillatorData = this.oscillators[note];
        if (oscillatorData) {
          const { oscillator, gainNode } = oscillatorData
          oscillator.stop()
          gainNode.disconnect()
          delete this.oscillators[note];
        }
      });
    }

    private unlockAudioContext() {
        if (this.audioContext.state !== 'suspended') return;
        const b = document.body;
        const events = ['touchstart','touchend', 'mousedown','keydown'];
        const unlock = () => { this.audioContext.resume().then(clean); }
        const clean = () => { events.forEach(e => b.removeEventListener(e, unlock)); }
        events.forEach(e => b.addEventListener(e, unlock, false));
    }
  }
  