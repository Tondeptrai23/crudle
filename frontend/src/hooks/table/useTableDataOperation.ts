import { SortConfig } from '@/components/admin/TableSort';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import { FilterOption, FilterParams } from '@/types/filter';
import { Column, QueryHook, TableActions } from '@/types/table';
import { useCallback, useEffect, useState } from 'react';

export const useTableAdd = <T extends { id: string }>(
  actions?: TableActions,
) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = async (value: Partial<T>) => {
    try {
      setIsAdding(true);
      setDialogOpen(false);
      await actions?.onAdd?.(value);
      toast({
        title: 'Added',
        description: 'Successfully added the row',
      });
    } catch (error) {
      toast({
        title: 'Failed to add',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleShowDialog = () => {
    setDialogOpen(true);
  };

  return { isAdding, dialogOpen, setDialogOpen, handleAdd, handleShowDialog };
};

export const useTableEdit = <T extends { id: string }>(
  initialData: T[],
  columns: Column<T>[],
  actions?: TableActions,
) => {
  const { toast } = useToast();
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<T | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    columns.forEach((column) => {
      if (column.editable && column.validate) {
        const error = column.validate(editedValues?.[column.key] as T[keyof T]);
        if (error) {
          newErrors[String(column.key)] = error;
        }
      }
    });
    setFieldErrors(newErrors);
    return newErrors;
  };

  const handleEdit = (id: string) => {
    setEditingRow(id);
    const currentRow = initialData.find((row) => row.id === id);
    if (currentRow) {
      setEditedValues(currentRow);
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditedValues(null);
    setFieldErrors({});
  };

  const handleSave = async (id: string) => {
    try {
      setIsSaving(true);
      const errors = validateFields();
      if (Object.keys(errors).length > 0) {
        toast({
          title: 'Failed to save',
          description: errors[Object.keys(errors)[0]],
          variant: 'destructive',
        });
        return;
      }

      await actions?.onSave?.(id, editedValues as T);
      handleCancel();
      toast({
        title: 'Saved',
        description: 'Successfully saved the changes',
      });
    } catch (error) {
      toast({
        title: 'Failed to save',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCellValueChange = (key: keyof T, value: string) => {
    if (editedValues) {
      setEditedValues({
        ...editedValues,
        [key]: value,
      });
      // Clear error when user starts typing
      if (fieldErrors[String(key)]) {
        setFieldErrors((prev) => ({ ...prev, [String(key)]: '' }));
      }
    }
  };

  return {
    editingRow,
    editedValues,
    fieldErrors,
    isSaving,
    handleEdit,
    handleCancel,
    handleSave,
    handleCellValueChange,
  };
};

export const useTableDelete = (actions?: TableActions) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingRow, setDeletingRow] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true);
      setDeletingRow(id);
      await actions?.onDelete?.(id);
      setDeletingRow(null);
      toast({
        title: 'Deleted',
        description: 'Successfully deleted the row',
      });
    } catch (error) {
      toast({
        title: 'Failed to delete',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    deletingRow,
    handleDelete,
  };
};

export function useGenericTableData<T>({
  useQueryHook,
  filterOptions,
  defaultSortColumn,
}: {
  useQueryHook: QueryHook<T>;
  filterOptions: FilterOption[];
  defaultSortColumn?: string;
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: defaultSortColumn ?? null,
    direction: 'asc',
  });

  const [filters, setFilters] = useState<Record<string, FilterParams>>(
    filterOptions.reduce(
      (acc, option) => {
        switch (option.type) {
          case 'enum':
            acc[option.id] = [];
            break;
          case 'range':
            acc[option.id] = [option.min, option.max];
            break;
          case 'date':
            acc[option.id] = [option.minDate, option.maxDate];
            break;
          case 'search':
            acc[option.id] = option.value ?? '';
            break;

          default:
            break;
        }

        return acc;
      },
      {} as Record<string, FilterParams>,
    ),
  );

  const handleSort = useCallback(
    (key: string, forcedDirection?: 'asc' | 'desc' | null) => {
      if (forcedDirection) {
        setSortConfig({ key, direction: forcedDirection });
      } else {
        setSortConfig({ key: defaultSortColumn ?? null, direction: 'asc' });
      }
    },
    [],
  );

  const query = useQueryHook({
    page,
    pageSize,
    filters: filters,
    sort: sortConfig,
  });

  useEffect(() => {
    if (query.data?.data.length === 0 && page > 1) {
      setPage(1);
    }
  }, [query.data?.data.length, page]);

  return {
    data: query.data?.data ?? [],
    pagination: {
      currentPage: page,
      totalPages: query.data?.totalPages ?? 0,
      totalItems: query.data?.totalItems ?? 0,
      pageSize,
      onPageChange: setPage,
      onPageSizeChange: setPageSize,
    },
    state: {
      isLoading: query.isLoading,
      isError: query.isError,
      isFetching: query.isFetching,
      error: query.error,
    },
    sort: {
      sortConfig: sortConfig,
      onSort: (key: string, direction: 'asc' | 'desc' | null) => {
        handleSort(key, direction);
        setPage(1);
      },
    },
    filters: {
      value: filters,
      onChange: (key: string, value: FilterParams) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(1);
      },
    },
  };
}
