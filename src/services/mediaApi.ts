
import { useQuery } from "@tanstack/react-query";

export interface MediaItem {
  id: string;
  title: string;
  artist: string;
  streamUrl: string;
  coverArt: string;
  duration: number;
  type: 'song' | 'podcast' | 'radio';
}

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  streamUrl: string;
  logoUrl: string;
  isLive: boolean;
}

// Replace with your actual backend URL
const API_BASE_URL = "https://your-backend-api.com";

// Fetch available media items
export const fetchMediaItems = async (): Promise<MediaItem[]> => {
  try {
    // This is a placeholder - replace with actual API call
    const response = await fetch(`${API_BASE_URL}/media`);
    if (!response.ok) {
      throw new Error("Failed to fetch media items");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching media items:", error);
    // Return mock data for now
    return mockMediaItems;
  }
};

// Fetch radio stations
export const fetchRadioStations = async (): Promise<RadioStation[]> => {
  try {
    // This is a placeholder - replace with actual API call
    const response = await fetch(`${API_BASE_URL}/radio-stations`);
    if (!response.ok) {
      throw new Error("Failed to fetch radio stations");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching radio stations:", error);
    // Return mock data for now
    return mockRadioStations;
  }
};

// React Query hooks
export const useMediaItems = () => {
  return useQuery({
    queryKey: ['mediaItems'],
    queryFn: fetchMediaItems,
  });
};

export const useRadioStations = () => {
  return useQuery({
    queryKey: ['radioStations'],
    queryFn: fetchRadioStations,
  });
};

// Mock data for development
export const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Sunrise",
    artist: "Ambient Waves",
    streamUrl: "https://example.com/streams/sunrise.mp3",
    coverArt: "https://placehold.co/400x400/8B5CF6/FFFFFF/png?text=Sunrise",
    duration: 240,
    type: 'song'
  },
  {
    id: "2",
    title: "Urban Beats",
    artist: "City Sound",
    streamUrl: "https://example.com/streams/urban-beats.mp3",
    coverArt: "https://placehold.co/400x400/6366F1/FFFFFF/png?text=Urban+Beats",
    duration: 180,
    type: 'song'
  },
  {
    id: "3",
    title: "Deep Focus",
    artist: "Study Music",
    streamUrl: "https://example.com/streams/deep-focus.mp3",
    coverArt: "https://placehold.co/400x400/EC4899/FFFFFF/png?text=Deep+Focus",
    duration: 360,
    type: 'song'
  },
  {
    id: "4",
    title: "Tech Today",
    artist: "Digital Trends",
    streamUrl: "https://example.com/streams/tech-today.mp3",
    coverArt: "https://placehold.co/400x400/14B8A6/FFFFFF/png?text=Tech+Today",
    duration: 1800,
    type: 'podcast'
  },
  {
    id: "5",
    title: "Night Drive",
    artist: "Smooth Vibes",
    streamUrl: "https://example.com/streams/night-drive.mp3",
    coverArt: "https://placehold.co/400x400/F59E0B/FFFFFF/png?text=Night+Drive",
    duration: 300,
    type: 'song'
  }
];

export const mockRadioStations: RadioStation[] = [
  {
    id: "101",
    name: "Chill FM",
    genre: "Lofi & Ambient",
    streamUrl: "https://example.com/radio/chill-fm",
    logoUrl: "https://placehold.co/200x200/8B5CF6/FFFFFF/png?text=Chill+FM",
    isLive: true
  },
  {
    id: "102",
    name: "Jazz Avenue",
    genre: "Jazz & Blues",
    streamUrl: "https://example.com/radio/jazz-avenue",
    logoUrl: "https://placehold.co/200x200/6366F1/FFFFFF/png?text=Jazz+Avenue",
    isLive: true
  },
  {
    id: "103",
    name: "Rock Nation",
    genre: "Rock & Alternative",
    streamUrl: "https://example.com/radio/rock-nation",
    logoUrl: "https://placehold.co/200x200/EC4899/FFFFFF/png?text=Rock+Nation",
    isLive: false
  },
  {
    id: "104",
    name: "Classic Vibes",
    genre: "Classical",
    streamUrl: "https://example.com/radio/classic-vibes",
    logoUrl: "https://placehold.co/200x200/14B8A6/FFFFFF/png?text=Classic+Vibes",
    isLive: true
  },
  {
    id: "105",
    name: "EDM Zone",
    genre: "Electronic & Dance",
    streamUrl: "https://example.com/radio/edm-zone",
    logoUrl: "https://placehold.co/200x200/F59E0B/FFFFFF/png?text=EDM+Zone",
    isLive: true
  }
];
