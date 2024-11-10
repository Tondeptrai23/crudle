export interface Column<T> {
  header: string;
  key: keyof T;
  editable?: boolean;
  validate?: (value: any) => string | null;
}

export interface TableState {
  isLoading?: boolean;
  isError?: boolean;
}

export interface TableActions {
  onSave: (id: string, updatedData: any) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onAdd: (data: any) => void | Promise<void>;
}

export interface GenericTableProps<T extends { id: string }> {
  data?: T[];
  columns: Column<T>[];
  state: TableState;
  actions?: TableActions;
  formComponent: React.ComponentType<{
    onSubmit: (data: any) => void;
  }>;
}
