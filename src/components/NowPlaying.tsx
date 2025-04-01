
import { useMediaPlayer } from '../contexts/MediaPlayerContext';
import PlayerControls from './PlayerControls';
import { MediaItem, RadioStation } from '../services/mediaApi';

const NowPlaying = () => {
  const { currentMedia, isPlaying, isRadio } = useMediaPlayer();

  if (!currentMedia) {
    return (
      <div className="flex items-center justify-center h-96 bg-player-secondary rounded-lg">
        <p className="text-player-subtext text-lg">Select something to play</p>
      </div>
    );
  }

  // Determine if we're dealing with a MediaItem or RadioStation
  const isMediaItem = 'title' in currentMedia;
  
  // Extract details based on type
  const title = isMediaItem ? (currentMedia as MediaItem).title : (currentMedia as RadioStation).name;
  const subtitle = isMediaItem ? (currentMedia as MediaItem).artist : (currentMedia as RadioStation).genre;
  const imageUrl = isMediaItem ? (currentMedia as MediaItem).coverArt : (currentMedia as RadioStation).logoUrl;

  // Animated bars for the "now playing" indicator
  const NowPlayingAnimation = () => (
    <div className="flex items-end h-4 space-x-[1px]">
      <div className={`now-playing-animation ${isPlaying ? 'animate-pulse-light' : ''}`} style={{ height: '40%', animationDelay: '0ms' }}></div>
      <div className={`now-playing-animation ${isPlaying ? 'animate-pulse-light' : ''}`} style={{ height: '80%', animationDelay: '300ms' }}></div>
      <div className={`now-playing-animation ${isPlaying ? 'animate-pulse-light' : ''}`} style={{ height: '60%', animationDelay: '600ms' }}></div>
      <div className={`now-playing-animation ${isPlaying ? 'animate-pulse-light' : ''}`} style={{ height: '100%', animationDelay: '900ms' }}></div>
    </div>
  );

  return (
    <div className="bg-player-secondary rounded-lg p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <div className="relative mb-6">
          <img 
            src={imageUrl || "https://placehold.co/400x400/8B5CF6/FFFFFF/png?text=No+Image"} 
            alt={title}
            className="w-64 h-64 object-cover rounded-md shadow-md"
          />
          {isPlaying && (
            <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 p-2 rounded-full">
              <NowPlayingAnimation />
            </div>
          )}
        </div>
        
        <div className="text-center mb-6 w-full">
          <h2 className="text-2xl font-bold text-white truncate">{title}</h2>
          <p className="text-player-subtext">{subtitle}</p>
          {isRadio && (currentMedia as RadioStation).isLive && (
            <span className="inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs bg-red-600 text-white">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>
        
        <PlayerControls className="w-full" />
      </div>
    </div>
  );
};

export default NowPlaying;
