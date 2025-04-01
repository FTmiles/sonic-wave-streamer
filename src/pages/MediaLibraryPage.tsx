
import { useMediaItems } from '../services/mediaApi';
import MediaList from '../components/MediaList';
import RecentlyPlayed from '../components/RecentlyPlayed';
import { Library } from 'lucide-react';

const MediaLibraryPage = () => {
  const { data: mediaItems, isLoading, error } = useMediaItems();
  
  const songs = mediaItems?.filter(item => item.type === 'song') || [];
  const podcasts = mediaItems?.filter(item => item.type === 'podcast') || [];
  
  return (
    <div className="container mx-auto p-4 mb-20">
      <div className="flex items-center mb-6">
        <Library size={24} className="mr-2" />
        <h1 className="text-2xl font-bold">Media Library</h1>
      </div>
      
      {isLoading && (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-player-accent"></div>
        </div>
      )}
      
      {error && (
        <div className="p-6 text-center bg-red-900 bg-opacity-20 rounded-lg border border-red-900">
          <p>Failed to load media library. Please try again later.</p>
        </div>
      )}
      
      {!isLoading && (
        <>
          <RecentlyPlayed />
          
          {songs.length > 0 && <MediaList items={songs} title="Songs" />}
          
          {podcasts.length > 0 && <MediaList items={podcasts} title="Podcasts" />}
          
          {!songs.length && !podcasts.length && !isLoading && (
            <div className="p-12 text-center bg-player-secondary rounded-lg">
              <p className="text-lg text-player-subtext">Your media library is empty</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MediaLibraryPage;
