import { useCustomParams } from "@/utils/helper";
import { AssignmentWorkspaceSkeleton } from "./AssignmentSessionPage";
import useAuth from "@/hooks/useAuth";
import { useGetAssignment, useSubmission } from "@/hooks/api/useAssignmentApi";
import { Card } from "@/components/common/ui/card";
import { Button } from "@/components/common/ui/button";
import LoadingButton from "@/components/common/ui/LoadingButton";
import WorkspaceQuestionCard from "@/components/assignments/WorkspaceQuestionCard";
import { cn } from "@/lib/utils";

const AssignmentSubmissionDetail : React.FC = () => {
	const { assignmentId, courseId, submissionId } = useCustomParams();
  const { role } = useAuth();

  const {
    data: assignment,
    isLoading: isAssignmentLoading,
    error: assignmentError,
  } = useGetAssignment(courseId, assignmentId, role);
  const {
    data: submission,
    isLoading: isSubmissionLoading,
    error: submissionError,
  } = useSubmission(
    courseId.toString(),
    assignmentId.toString(),
    submissionId.toString(),
  );

  const isLoading = isAssignmentLoading || isSubmissionLoading;
  const error = assignmentError || submissionError;

  if (isLoading) {
    return <AssignmentWorkspaceSkeleton />;
  }

  if (!assignment || !submission || error) {
    throw error;
  }

  return (
    <div className='container mx-auto p-4'>
      <div>
        <h1 className='text-2xl font-bold'>{assignment.name}</h1>
      </div>
      <div className='container h-[calc(100vh-4rem)] p-4'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-9 space-y-4'>
            {submission.answeredQuestions?.map((question, index) => (
              <div
                key={question.questionId}
                id={`question-${question.questionId}`}
              >
                <WorkspaceQuestionCard
                  question={question}
                  index={index}
                  selectedAnswer={question.answers[0].value}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onAnswerSelect={(_value) => {}}
                />
              </div>
            ))}
          </div>

          <div className='col-span-3'>
            <Card className='sticky top-4 p-4'>
              <h3 className='mb-4 text-lg font-semibold'>Questions</h3>
              <div className='mb-6 grid grid-cols-3 gap-2 md:grid-cols-5'>
                {submission.answeredQuestions?.map((question, index) => (
                  <div
                    key={question.questionId}
                    className={cn(
                      'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-medium transition-colors',
                      // selectedAnswers[question.questionId]
                      //   ? 'bg-green-500 text-white'
                      //   : 'bg-gray-200 text-gray-700',
                      'bg-gray-200 text-gray-700',
                    )}
                    onClick={() => {
                      document
                        .getElementById(`question-${question.questionId}`)
                        ?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className='space-y-2'>
                <LoadingButton className='w-full bg-blue-500 hover:bg-blue-700'>
                  Submit
                </LoadingButton>
                <Button variant='outline' className='w-full' onClick={() => {}}>
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentSubmissionDetail;