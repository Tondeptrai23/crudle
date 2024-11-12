// types.ts
export type SortConfig = {
  key: string | null;
  direction: 'asc' | 'desc' | null;
};

export type SortProps = {
  columnKey: string;
  sortConfig: SortConfig;
  onSort: (key: string, direction: 'asc' | 'desc') => void;
  sortable?: boolean;
};

// TableSort.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';

const TableSort = ({ columnKey, sortConfig, onSort, sortable }: SortProps) => {
  if (!sortable) {
    return <span>{columnKey}</span>;
  }

  const getSortIcon = () => {
    if (sortConfig.key !== columnKey)
      return <ChevronsUpDown className='h-4 w-4' />;
    if (sortConfig.direction === 'asc') return <ArrowUp className='h-4 w-4' />;
    if (sortConfig.direction === 'desc')
      return <ArrowDown className='h-4 w-4' />;
    return <ChevronsUpDown className='h-4 w-4' />;
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='flex items-center focus:outline-none'>
        {columnKey}
        {getSortIcon()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuItem onClick={() => onSort(columnKey, 'asc')}>
          <ArrowUp className='h-4 w-4' />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSort(columnKey, 'desc')}>
          <ArrowDown className='h-4 w-4' />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableSort;
