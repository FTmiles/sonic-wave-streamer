
import { useMediaPlayer } from '../contexts/MediaPlayerContext';
import { MediaItem, RadioStation } from '../services/mediaApi';
import { Clock, Music, Radio } from 'lucide-react';

const RecentlyPlayed = () => {
  const { recentlyPlayed, playMedia, currentMedia, isPlaying } = useMediaPlayer();

  if (!recentlyPlayed.length) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Clock size={18} className="mr-2 text-player-subtext" />
        <h2 className="text-xl font-bold">Recently Played</h2>
      </div>
      
      <div className="space-y-2">
        {recentlyPlayed.map((item, index) => {
          // Determine if we're dealing with a MediaItem or RadioStation
          const isMediaItem = 'title' in item;
          const isRadio = !isMediaItem;
          
          // Extract details based on type
          const id = 'id' in item ? item.id : `recent-${index}`;
          const title = isMediaItem ? (item as MediaItem).title : (item as RadioStation).name;
          const subtitle = isMediaItem ? (item as MediaItem).artist : (item as RadioStation).genre;
          const imageUrl = isMediaItem ? (item as MediaItem).coverArt : (item as RadioStation).logoUrl;

          const isCurrentlyPlaying = 
            currentMedia && 
            'id' in currentMedia && 
            'id' in item &&
            currentMedia.id === item.id && 
            isPlaying;

          return (
            <div 
              key={id}
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                isCurrentlyPlaying ? 'bg-player-accent bg-opacity-20' : 'hover:bg-player-secondary'
              }`}
              onClick={() => playMedia(item, isRadio)}
            >
              <div className="relative flex-shrink-0 mr-3">
                <img 
                  src={imageUrl || "https://placehold.co/400/gray"} 
                  alt={title}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="absolute -top-1 -right-1 bg-player-secondary rounded-full p-1">
                  {isRadio ? (
                    <Radio size={12} className="text-player-accent" />
                  ) : (
                    <Music size={12} className="text-player-accent" />
                  )}
                </div>
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className={`text-sm font-medium truncate ${isCurrentlyPlaying ? 'text-player-accent' : ''}`}>
                  {title}
                </h3>
                <p className="text-xs text-player-subtext truncate">{subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
