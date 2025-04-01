
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MediaPlayerProvider } from '../contexts/MediaPlayerContext';
import NowPlaying from '../components/NowPlaying';
import MiniPlayer from '../components/MiniPlayer';
import Navigation from '../components/Navigation';
import RecentlyPlayed from '../components/RecentlyPlayed';
import { useMediaItems, useRadioStations } from '../services/mediaApi';
import MediaList from '../components/MediaList';
import RadioStationList from '../components/RadioStationList';

const Index = () => {
  const { data: mediaItems } = useMediaItems();
  const { data: radioStations } = useRadioStations();
  
  const songs = mediaItems?.filter(item => item.type === 'song') || [];
  const podcasts = mediaItems?.filter(item => item.type === 'podcast') || [];
  
  return (
    <MediaPlayerProvider>
      <div className="min-h-screen bg-player-bg text-white pb-24">
        <div className="container mx-auto p-4">
          <header className="py-4 mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-player-accent to-blue-500 bg-clip-text text-transparent">
              Sonic Wave Streamer
            </h1>
            <p className="text-player-subtext">Your personal media streaming app</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="recommended" className="mb-8">
                <TabsList className="bg-player-secondary text-player-subtext border-b border-gray-800 p-0 rounded-none mb-4">
                  <TabsTrigger 
                    value="recommended" 
                    className="py-3 px-6 rounded-none data-[state=active]:text-player-accent data-[state=active]:border-b-2 data-[state=active]:border-player-accent"
                  >
                    Recommended
                  </TabsTrigger>
                  <TabsTrigger 
                    value="radio" 
                    className="py-3 px-6 rounded-none data-[state=active]:text-player-accent data-[state=active]:border-b-2 data-[state=active]:border-player-accent"
                  >
                    Radio
                  </TabsTrigger>
                  <TabsTrigger 
                    value="podcasts" 
                    className="py-3 px-6 rounded-none data-[state=active]:text-player-accent data-[state=active]:border-b-2 data-[state=active]:border-player-accent"
                  >
                    Podcasts
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="recommended">
                  <RecentlyPlayed />
                  {songs && songs.length > 0 && (
                    <MediaList items={songs} title="Recommended Songs" />
                  )}
                </TabsContent>
                
                <TabsContent value="radio">
                  {radioStations && radioStations.length > 0 && (
                    <RadioStationList stations={radioStations} />
                  )}
                </TabsContent>
                
                <TabsContent value="podcasts">
                  {podcasts && podcasts.length > 0 && (
                    <MediaList items={podcasts} title="Podcasts" />
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <NowPlaying />
            </div>
          </div>
        </div>

        <Navigation />
        <MiniPlayer />
      </div>
    </MediaPlayerProvider>
  );
};

export default Index;
