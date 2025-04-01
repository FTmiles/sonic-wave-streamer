
import { Link, useLocation } from 'react-router-dom';
import { Radio, Library, Music } from 'lucide-react';
import { cn } from '../lib/utils';

const Navigation = () => {
  const location = useLocation();
  
  const routes = [
    { path: '/', label: 'Now Playing', icon: <Music size={20} /> },
    { path: '/radio', label: 'Radio', icon: <Radio size={20} /> },
    { path: '/library', label: 'Library', icon: <Library size={20} /> }
  ];
  
  return (
    <nav className="fixed bottom-16 left-0 right-0 z-10 px-4 pb-2">
      <div className="bg-black bg-opacity-70 backdrop-blur-lg rounded-full mx-auto max-w-sm flex justify-around p-2 shadow-lg">
        {routes.map((route) => {
          const isActive = location.pathname === route.path;
          
          return (
            <Link 
              key={route.path} 
              to={route.path}
              className={cn(
                "flex flex-col items-center py-1 px-4 rounded-full transition-colors",
                isActive 
                  ? "text-player-accent" 
                  : "text-player-subtext hover:text-player-text"
              )}
            >
              {route.icon}
              <span className="text-xs mt-1">{route.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
