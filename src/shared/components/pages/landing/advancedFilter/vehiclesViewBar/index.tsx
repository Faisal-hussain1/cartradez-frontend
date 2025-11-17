'use client';
import {List, Grid} from 'lucide-react';

interface VehiclesViewBarProps {
  view: 'list' | 'grid';
  setView: (view: 'list' | 'grid') => void;
}

export default function VehiclesViewBar({view, setView}: VehiclesViewBarProps) {
  return (
    <div className='w-full flex items-center justify-between border border-border rounded-lg px-3 py-3 bg-card text-card-foreground shadow-sm flex-nowrap overflow-x-auto gap-2'>
      {/* Left Section */}
      <div className='flex items-center space-x-2 sm:space-x-3 flex-shrink-0'>
        <span className='text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap'>
          View by
        </span>

        <div className='flex border border-border rounded-md overflow-hidden bg-background'>
          {/* List Button */}
          <button
            onClick={() => setView('list')}
            className={`flex items-center space-x-1 px-2 py-1 text-xs sm:text-sm transition cursor-pointer
              ${
                view === 'list'
                  ? 'bg-muted text-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
          >
            <List size={16} />
            {/* hide view in Mbl view  */}
            <span className='hidden sm:inline'>List</span>
          </button>

          {/* Grid Button */}
          <button
            onClick={() => setView('grid')}
            className={`flex items-center space-x-1 px-2 py-1 text-xs sm:text-sm transition cursor-pointer
              ${
                view === 'grid'
                  ? 'bg-muted text-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
          >
            <Grid size={16} />
            {/* Hide text in mbl view */}
            <span className='hidden sm:inline'>Grid</span>
          </button>
        </div>
      </div>

      {/* Right Section */}
      {/* <div className='flex items-center space-x-1 sm:space-x-2 flex-shrink-0'>
        <span className='text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap'>
          Sort By
        </span>
        <select className='border border-border rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/30'>
          <option>Most relevant</option>
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div> */}
    </div>
  );
}
