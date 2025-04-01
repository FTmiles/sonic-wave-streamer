
import { useState } from 'react';
import { useMediaPlayer } from '../contexts/MediaPlayerContext';
import { MediaItem, RadioStation } from '../services/mediaApi';
import PlayerControls from './PlayerControls';
import { ChevronUp } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import NowPlaying from './NowPlaying';

const MiniPlayer = () => {
  const { currentMedia, isPlaying } = useMediaPlayer();
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  if (!currentMedia) {
    return null;
  }

  // Determine if we're dealing with a MediaItem or RadioStation
  const isMediaItem = 'title' in currentMedia;
  
  // Extract details based on type
  const title = isMediaItem ? (currentMedia as MediaItem).title : (currentMedia as RadioStation).name;
  const subtitle = isMediaItem ? (currentMedia as MediaItem).artist : (currentMedia as RadioStation).genre;
  const imageUrl = isMediaItem ? (currentMedia as MediaItem).coverArt : (currentMedia as RadioStation).logoUrl;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-player-secondary border-t border-gray-800 px-4 py-2 flex items-center shadow-lg">
        <div className="flex-shrink-0 mr-3">
          <img 
            src={imageUrl || "https://placehold.co/400/gray"} 
            alt={title}
            className="w-12 h-12 object-cover rounded"
          />
        </div>
        
        <div className="flex-grow min-w-0 mr-4">
          <h3 className="text-sm font-medium truncate">{title}</h3>
          <p className="text-xs text-player-subtext truncate">{subtitle}</p>
        </div>
        
        <div className="flex-shrink-0 flex items-center">
          <PlayerControls mini />
          
          <button 
            onClick={() => setShowFullPlayer(true)}
            className="ml-3 text-player-subtext hover:text-player-text"
            aria-label="Expand player"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </div>

      <Dialog open={showFullPlayer} onOpenChange={setShowFullPlayer}>
        <DialogContent className="bg-player-bg border-gray-800 max-w-md p-0">
          <NowPlaying />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MiniPlayer;
