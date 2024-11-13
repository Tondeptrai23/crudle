import { SortConfig } from '@/components/admin/TableSort';
import { UseQueryResult } from 'react-query';
import { FilterOption, FilterParams } from './filter';
import { ApiResponse } from './paginationApiResponse';

export interface Column<T> {
  header: string;
  key: keyof T;
  editable?: boolean;
  isDefaultSort?: boolean;
  sortable?: boolean;
  validate?: (value: T[keyof T]) => string | null;
}

// Must use "any" here because the type of the data is not known
export interface TableActions {
  onSave: (id: string, updatedData: any) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onAdd: (data: any) => void | Promise<void>;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface ActionCellProps {
  requireDeleteConfirmation?: boolean;
  isEditing?: boolean;
  isDeleting?: boolean;
  isSaving?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  disabledActions?: {
    edit?: boolean;
    delete?: boolean;
  };
}

export type QueryHook<T> = (
  data: QueryHookParams,
) => UseQueryResult<ApiResponse<T>>;

export type QueryHookParams = {
  page: number;
  pageSize: number;
  search: string;
  filters: Record<string, FilterParams>;
  sort: SortConfig;
};

export interface GenericTableProps<T extends { id: string }> {
  data?: T[];
  columns: Column<T>[];
  actions?: TableActions;
  formComponent: React.ComponentType<{
    onSubmit: (data: any) => void;
  }>;
  requireDeleteConfirmation?: boolean;
  disabledActions: ActionCellProps['disabledActions'];
  queryHook: QueryHook<T>;
  filterOptions: FilterOption[];
}
