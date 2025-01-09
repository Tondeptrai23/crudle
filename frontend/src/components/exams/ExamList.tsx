import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/common/ui/alert-dialog';
import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';
import { Skeleton } from '@/components/common/ui/skeleton';
import ExamCard from '@/components/exams/ExamCard';
import { useDeleteExam, useExams } from '@/hooks/api/useExamApi';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { getErrorMessage } from '@/lib/utils';
import { Role } from '@/types/enums';
import { useCustomParams } from '@/utils/helper';
import { FileText, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyState = () => (
  <div className='py-12 text-center'>
    <FileText className='mx-auto h-12 w-12 text-gray-400' />
    <h3 className='mt-2 text-sm font-semibold text-gray-900'>No exams</h3>
    <p className='mt-1 text-sm text-gray-500'>There are no exams.</p>
  </div>
);

const ExamsList = () => {
  const { courseId } = useCustomParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const deleteExam = useDeleteExam();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const {
    data: exams,
    isLoading,
    error,
  } = useExams(courseId, role, {
    page: page - 1,
    pageSize,
    filters: {
      name: debouncedSearch,
    },
    sort: {
      key: 'startDate',
      direction: 'desc',
    },
  });

  const handleDelete = async (examId: number) => {
    try {
      await deleteExam.mutateAsync({ courseId, examId });
      setShowDeleteDialog(false);
      setSelectedExamId(null);
      toast({
        title: 'Success',
        description: 'Exam deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  if (error) {
    throw error;
  }

  if (isLoading) {
    return (
      <div className='container mx-auto space-y-4 p-6'>
        <div className='flex flex-col gap-4'>
          {[1, 2].map((i) => (
            <Skeleton key={i} className='h-[100px] w-full' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-6 flex items-center gap-4'>
        <div className='flex-1'>
          <Input
            type='search'
            placeholder='Search exams...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='max-w-sm'
          />
        </div>
        {role === Role.Teacher && (
          <Button
            variant='default'
            className='inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700'
            onClick={() => navigate('add-exam')}
          >
            <Plus className='h-4 w-4' />
            Add Exam
          </Button>
        )}
      </div>

      {/* Exams list */}
      {exams?.data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='flex flex-col gap-4'>
          {exams?.data.map((exam) => (
            <ExamCard
              key={exam.examId}
              exam={exam}
              role={role}
              courseId={courseId}
              onDelete={() => {
                setSelectedExamId(exam.examId);
                setShowDeleteDialog(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {exams && exams.totalPages > 0 && (
        <div className='mt-6 flex items-center justify-between'>
          <div className='text-sm text-muted-foreground'>
            Showing {(page - 1) * pageSize + 1} to{' '}
            {Math.min(page * pageSize, exams.totalItems)} of {exams.totalItems}{' '}
            exams
          </div>
          {exams.totalPages > 1 && (
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setPage((p) =>
                    exams.totalPages
                      ? Math.min(exams.totalPages, p + 1)
                      : p + 1,
                  )
                }
                disabled={page === exams.totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Exam</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this exam? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedExamId && handleDelete(selectedExamId)}
              className='bg-red-500 hover:bg-red-600'
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamsList;
