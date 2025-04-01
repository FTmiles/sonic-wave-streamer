
import { useMediaPlayer } from '../contexts/MediaPlayerContext';
import { RadioStation } from '../services/mediaApi';
import { Radio, Pause } from 'lucide-react';

interface RadioStationListProps {
  stations: RadioStation[];
}

const RadioStationList = ({ stations }: RadioStationListProps) => {
  const { playMedia, currentMedia, isPlaying, togglePlayPause } = useMediaPlayer();

  if (!stations || stations.length === 0) {
    return <div className="p-4 text-player-subtext">No radio stations found</div>;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Radio Stations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((station) => {
          const isCurrentlyPlaying = 
            currentMedia && 
            'id' in currentMedia && 
            currentMedia.id === station.id && 
            isPlaying;

          return (
            <div 
              key={station.id} 
              className={`flex items-center p-3 rounded-lg transition-all ${
                isCurrentlyPlaying 
                  ? 'bg-player-accent bg-opacity-20 border border-player-accent' 
                  : 'bg-player-secondary hover:bg-opacity-70'
              }`}
              onClick={() => {
                if (currentMedia && 'id' in currentMedia && currentMedia.id === station.id) {
                  togglePlayPause();
                } else {
                  playMedia(station, true);
                }
              }}
            >
              <div className="relative flex-shrink-0 mr-4">
                <img 
                  src={station.logoUrl || "https://placehold.co/80/gray"} 
                  alt={station.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                {station.isLive && (
                  <div className="absolute top-0 right-0 bg-red-600 w-3 h-3 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className="font-medium truncate">{station.name}</h3>
                <p className="text-sm text-player-subtext truncate">{station.genre}</p>
              </div>
              
              <div className="ml-4">
                <button className={`p-2 rounded-full ${
                  isCurrentlyPlaying ? 'bg-player-accent text-white' : 'bg-white bg-opacity-10'
                }`}>
                  {isCurrentlyPlaying ? (
                    <Pause size={20} />
                  ) : (
                    <Radio size={20} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioStationList;
