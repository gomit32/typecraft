import { useCallback } from 'react';
import useStore from '../store/useStore';

const useSound = () => {
  const soundEnabled = useStore(state => state.soundEnabled);

  const playSound = useCallback((type) => {
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case 'keypress':
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.05;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
        break;
      case 'error':
        oscillator.frequency.value = 200;
        gainNode.gain.value = 0.08;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
        break;
      case 'complete':
        oscillator.frequency.value = 523;
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(() => {
          oscillator.frequency.value = 659;
        }, 150);
        setTimeout(() => {
          oscillator.frequency.value = 784;
        }, 300);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      case 'countdown':
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.08;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15);
        break;
      case 'levelup':
        oscillator.frequency.value = 400;
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(() => { oscillator.frequency.value = 500; }, 100);
        setTimeout(() => { oscillator.frequency.value = 600; }, 200);
        setTimeout(() => { oscillator.frequency.value = 800; }, 300);
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
      default:
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.05;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
    }
  }, [soundEnabled]);

  return { playSound };
};

export default useSound;