export type SortConfig = {
  key: string | null;
  direction: 'asc' | 'desc' | null;
};

export type SortProps = {
  columnKey: string;
  columnHeader: string;
  sortConfig: SortConfig;
  onSort: (key: string, direction: 'asc' | 'desc') => void;
  sortable?: boolean;
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';

const TableSort = ({
  columnKey,
  columnHeader,
  sortConfig,
  onSort,
  sortable,
}: SortProps) => {
  if (!sortable) {
    return <span>{columnHeader}</span>;
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
        {columnHeader}
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
