
import { useRadioStations } from '../services/mediaApi';
import RadioStationList from '../components/RadioStationList';
import RecentlyPlayed from '../components/RecentlyPlayed';
import { Radio } from 'lucide-react';

const RadioPage = () => {
  const { data: stations, isLoading, error } = useRadioStations();
  
  return (
    <div className="container mx-auto p-4 mb-20">
      <div className="flex items-center mb-6">
        <Radio size={24} className="mr-2" />
        <h1 className="text-2xl font-bold">Radio Stations</h1>
      </div>
      
      {isLoading && (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-player-accent"></div>
        </div>
      )}
      
      {error && (
        <div className="p-6 text-center bg-red-900 bg-opacity-20 rounded-lg border border-red-900">
          <p>Failed to load radio stations. Please try again later.</p>
        </div>
      )}
      
      {stations && <RadioStationList stations={stations} />}
      
      <RecentlyPlayed />
    </div>
  );
};

export default RadioPage;
