
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { MediaItem, RadioStation } from '../services/mediaApi';
import { toast } from 'sonner';

interface MediaPlayerContextType {
  currentMedia: MediaItem | RadioStation | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isRadio: boolean;
  recentlyPlayed: (MediaItem | RadioStation)[];
  playMedia: (media: MediaItem | RadioStation, isRadioStation?: boolean) => void;
  pauseMedia: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  skipNext: () => void;
  skipPrevious: () => void;
}

const MediaPlayerContext = createContext<MediaPlayerContextType | undefined>(undefined);

export const MediaPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMedia, setCurrentMedia] = useState<MediaItem | RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRadio, setIsRadio] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState<(MediaItem | RadioStation)[]>([]);
  const [playlist, setPlaylist] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current && typeof window !== 'undefined') {
    audioRef.current = new Audio();
  }

  const audio = audioRef.current;

  useEffect(() => {
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      // Auto-play next track if not radio
      if (!isRadio) {
        skipNext();
      }
    };

    const handleError = (e: ErrorEvent) => {
      console.error('Audio playback error:', e);
      toast.error('Failed to play media. Please try again.');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError as EventListener);

    // Clean up
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError as EventListener);
    };
  }, [audio, isRadio]);

  // Set volume effect
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [audio, volume]);

  // Play/pause effect
  useEffect(() => {
    if (!audio || !currentMedia) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
        toast.error('Failed to play media');
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audio, currentMedia]);

  const addToRecentlyPlayed = (media: MediaItem | RadioStation) => {
    setRecentlyPlayed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => 
        'id' in item && 'id' in media ? item.id !== media.id : false
      );
      // Add to beginning and limit to 10 items
      return [media, ...filtered].slice(0, 10);
    });
  };

  const playMedia = (media: MediaItem | RadioStation, isRadioStation = false) => {
    if (!audio) return;

    // Determine if it's a radio station
    const isRadioType = isRadioStation || 'isLive' in media;
    setIsRadio(isRadioType);

    // Get the stream URL
    const streamUrl = 'streamUrl' in media ? media.streamUrl : '';
    
    // Only change audio source if it's different
    if (audio.src !== streamUrl) {
      audio.src = streamUrl;
      audio.load();
    }

    setCurrentMedia(media);
    addToRecentlyPlayed(media);
    
    audio.play().then(() => {
      setIsPlaying(true);
      toast.success(`Now playing: ${getMediaTitle(media)}`);
    }).catch(error => {
      console.error('Error playing media:', error);
      setIsPlaying(false);
      toast.error('Failed to play media');
    });
  };

  const getMediaTitle = (media: MediaItem | RadioStation): string => {
    if ('title' in media) {
      return `${media.title} - ${media.artist}`;
    } else {
      return media.name;
    }
  };

  const pauseMedia = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (currentMedia) {
      setIsPlaying(!isPlaying);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const seekTo = (time: number) => {
    if (audio && !isRadio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipNext = () => {
    if (isRadio || currentIndex === -1 || playlist.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    playMedia(playlist[nextIndex]);
  };

  const skipPrevious = () => {
    if (isRadio || currentIndex === -1 || playlist.length === 0) return;
    
    // If we're more than 3 seconds into the song, go back to the start
    if (currentTime > 3) {
      if (audio) {
        audio.currentTime = 0;
        setCurrentTime(0);
      }
      return;
    }
    
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    playMedia(playlist[prevIndex]);
  };

  const value = {
    currentMedia,
    isPlaying,
    volume,
    currentTime,
    duration,
    isRadio,
    recentlyPlayed,
    playMedia,
    pauseMedia,
    togglePlayPause,
    setVolume,
    seekTo,
    skipNext,
    skipPrevious
  };

  return (
    <MediaPlayerContext.Provider value={value}>
      {children}
    </MediaPlayerContext.Provider>
  );
};

export const useMediaPlayer = () => {
  const context = useContext(MediaPlayerContext);
  if (context === undefined) {
    throw new Error('useMediaPlayer must be used within a MediaPlayerProvider');
  }
  return context;
};
