import { Badge } from '@/components/common/ui/badge';
import { Button } from '@/components/common/ui/button';
import { Card } from '@/components/common/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/ui/dropdown-menu';
import { useCanModifyExam } from '@/hooks/api/useExamApi';
import { Role } from '@/types/enums';
import { Exam } from '@/types/exam';
import { Calendar, Clock, Edit, MoreVertical, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExamCardProps {
  exam: Exam;
  role: string;
  courseId: number;
  onDelete?: () => void;
}

const ExamCard = ({ exam, role, courseId, onDelete }: ExamCardProps) => {
  const navigate = useNavigate();
  const canModify = useCanModifyExam(exam);

  const getExamStatus = () => {
    const now = new Date();
    const startDate = new Date(exam.startDate);
    const endDate = new Date(startDate.getTime() + exam.duration * 60 * 1000);

    if (now < startDate) {
      return {
        label: 'Not Started',
        variant: 'outline' as const,
      };
    } else if (now > endDate) {
      return {
        label: 'Ended',
        variant: 'secondary' as const,
      };
    } else {
      return {
        label: 'In Progress',
        variant: 'default' as const,
      };
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const status = getExamStatus();

  return (
    <Card
      className='cursor-pointer p-6 transition-all duration-200 hover:scale-[1.01] hover:shadow-md'
      onClick={() => navigate(`/course/${courseId}/exam/${exam.examId}`)}
    >
      <div className='flex items-start justify-between'>
        <div className='space-y-3'>
          {/* Title and status */}
          <div className='flex items-center gap-2'>
            <h3 className='cursor-pointer text-xl font-semibold hover:text-blue-600'>
              {exam.name}
            </h3>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>

          {/* Metadata */}
          <div className='flex items-center gap-4 text-sm text-gray-600'>
            <div className='flex items-center gap-1'>
              <Calendar className='h-4 w-4' />
              {formatDate(exam.startDate)}
            </div>
            <div className='flex items-center gap-1'>
              <Clock className='h-4 w-4' />
              {exam.duration} minutes
            </div>
          </div>
        </div>

        {/* Actions - Only show for teachers */}
        {role === Role.Teacher && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='h-8 w-8 p-0'
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/course/${courseId}/exam/${exam.examId}/edit`)
                }
                disabled={!canModify}
                className='flex items-center gap-2'
              >
                <Edit className='h-4 w-4' />
                Edit
              </DropdownMenuItem>
              {onDelete && (
                <DropdownMenuItem
                  onClick={onDelete}
                  disabled={!canModify}
                  className='flex items-center gap-2 text-red-600'
                >
                  <Trash2 className='h-4 w-4' />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </Card>
  );
};

export default ExamCard;
