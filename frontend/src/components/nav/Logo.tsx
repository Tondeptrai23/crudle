import { cn } from '@/lib/utils';
import { Book } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = (props) => {
  const navigate = useNavigate();

  return (
    <button
      className={cn(
        props.className,
        'flex items-center space-x-2 text-xl font-bold',
      )}
      onClick={() => navigate('/')}
    >
      <Book className='h-8 w-8' />
      <p>Logo</p>
    </button>
  );
};

export default Logo;
