
import { useMediaPlayer } from '../contexts/MediaPlayerContext';
import { MediaItem } from '../services/mediaApi';
import { Play, Pause, Music } from 'lucide-react';

interface MediaListProps {
  items: MediaItem[];
  title: string;
}

const MediaList = ({ items, title }: MediaListProps) => {
  const { playMedia, currentMedia, isPlaying, togglePlayPause } = useMediaPlayer();

  if (!items || items.length === 0) {
    return <div className="p-4 text-player-subtext">No media found</div>;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const isCurrentlyPlaying = 
            currentMedia && 
            'id' in currentMedia && 
            currentMedia.id === item.id && 
            isPlaying;

          return (
            <div key={item.id} className="media-card">
              <div className="relative group cursor-pointer" onClick={() => {
                if (currentMedia && 'id' in currentMedia && currentMedia.id === item.id) {
                  togglePlayPause();
                } else {
                  playMedia(item);
                }
              }}>
                <img 
                  src={item.coverArt || "https://placehold.co/400/gray"}
                  alt={item.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button className="bg-player-accent p-3 rounded-full text-white transform transition-transform group-hover:scale-110">
                    {isCurrentlyPlaying ? (
                      <Pause size={24} />
                    ) : (
                      <Play size={24} fill="white" />
                    )}
                  </button>
                </div>
                {isCurrentlyPlaying && (
                  <div className="absolute bottom-2 right-2 bg-player-accent p-1 rounded-full">
                    <Music size={16} />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium truncate">{item.title}</h3>
                <p className="text-sm text-player-subtext truncate">{item.artist}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaList;
