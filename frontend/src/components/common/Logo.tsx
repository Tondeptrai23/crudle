import { cn } from '@/lib/utils';
import { Book } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo : React.FC< LogoProps> = (props) => {
  return (
    <div
      className={cn(
        props.className,
        'flex items-center space-x-2 text-xl font-bold'
      )}
    >
      <Book className='w-8 h-8' />
      <p>Logo</p>
    </div>
  );
}

export default Logo;