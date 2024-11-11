export interface Column<T> {
  header: string;
  key: keyof T;
  editable?: boolean;
  validate?: (value: any) => string | null;
}

export interface TableState {
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
}

export interface TableActions {
  onSave: (id: string, updatedData: any) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onAdd: (data: any) => void | Promise<void>;
  onSearch: (query: string) => void | Promise<void>;
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

export interface GenericTableProps<T extends { id: string }> {
  data?: T[];
  columns: Column<T>[];
  state: TableState;
  actions?: TableActions;
  pagination: TablePaginationProps;
  formComponent: React.ComponentType<{
    onSubmit: (data: any) => void;
  }>;
  disabledActions: ActionCellProps['disabledActions'];
}
