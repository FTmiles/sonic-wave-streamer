
import { useState } from 'react';
import { useMediaPlayer } from '../contexts/MediaPlayerContext';
import { Slider } from './ui/slider';
import { cn } from '../lib/utils';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface PlayerControlsProps {
  mini?: boolean;
  className?: string;
}

const PlayerControls = ({ mini = false, className }: PlayerControlsProps) => {
  const {
    currentMedia,
    isPlaying,
    volume,
    currentTime,
    duration,
    isRadio,
    togglePlayPause,
    setVolume,
    seekTo,
    skipNext,
    skipPrevious
  } = useMediaPlayer();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Format time display (e.g., 3:45)
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentMedia) {
    return null;
  }

  return (
    <div className={cn("flex flex-col", className, {
      "p-2": mini,
      "p-4": !mini
    })}>
      {!mini && !isRadio && (
        <div className="w-full mb-4">
          <div className="flex justify-between text-xs text-player-subtext mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="progress-bar">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={(values) => seekTo(values[0])}
              disabled={isRadio}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center space-x-4">
          {!isRadio && (
            <button 
              onClick={skipPrevious}
              className="text-player-subtext hover:text-player-text transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={mini ? 20 : 24} />
            </button>
          )}
          
          <button
            onClick={togglePlayPause}
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={mini ? 18 : 24} fill="currentColor" />
            ) : (
              <Play size={mini ? 18 : 24} fill="currentColor" />
            )}
          </button>
          
          {!isRadio && (
            <button 
              onClick={skipNext}
              className="text-player-subtext hover:text-player-text transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={mini ? 20 : 24} />
            </button>
          )}
        </div>
        
        <div className="relative flex items-center">
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="text-player-subtext hover:text-player-text transition-colors p-1"
            aria-label="Volume control"
          >
            {volume === 0 ? <VolumeX size={mini ? 18 : 20} /> : <Volume2 size={mini ? 18 : 20} />}
          </button>
          
          {showVolumeSlider && (
            <div className="absolute bottom-full mb-2 bg-player-secondary p-3 rounded-md shadow-lg">
              <Slider
                orientation="vertical"
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(values) => setVolume(values[0] / 100)}
                className="h-24"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
