import Link from 'next/link';
import React from 'react';

interface FavsViewProps {
  onClose: () => void;
}

const FavsView: React.FC<FavsViewProps> = ({ onClose }) => {
  return (
    <div className='favs-view h-full'>
      <h3>Favorites View</h3>
      <p>This is a basic component structure for FavsView.</p>
      <Link
        onClick={onClose}
        href="/favorites"
        className="border-b border-foreground hover:pb-1 transition-all duration-300">
        Go to Favorites
      </Link>
    </div>
  );
};

export default FavsView;