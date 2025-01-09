import { AnswerResponse, Question, mapToAnswer } from '@/types/assignment';

export default interface Submission {
	answeredQuestions: AnsweredQuestion[] | null;
	submissionId: string;
	assignmentId: string;
	studentId: string;
	studentName: string;
	startedAt: Date | null;
	submittedAt: Date | null;
	score: number | null;
};

export enum SubmissionStatus {
	DONE,
	IN_PROGRESS,
	NOT_STARTED,
}

export interface SubmissionWithStatus extends Partial<Submission> {
	status: SubmissionStatus
}

interface StudentAnswer {
	submissionId: string;
	questionId: string;
	value: string;
}

interface AnsweredQuestion extends Question {
	studentsAnswers?: StudentAnswer[];
}

export interface SubmissionResponse {
  SubmissionId: string;
  AssignmentId: string;
  StudentId: string;
  StudentName: string;
  StartedAt: string | null;
  SubmittedAt: string | null;
  Score: number | null;
  QuestionWithStudentAnswer: AnsweredQuestionResponse[] | null;
}

interface AnsweredQuestionResponse {
	QuestionId: string;
	Content: string;
	Type: string;
	Answers: AnswerResponse[];
	StudentsAnswers: StudentAnswerResponse[];
}

interface StudentAnswerResponse {
	SubmissionId: string;
	QuestionId: string;
	Value: string;
}

export function mapToSubmission(response: SubmissionResponse): Submission {
	return {
    answeredQuestions:
      response.QuestionWithStudentAnswer?.map(mapToAnsweredQuestion) ?? null,
    submissionId: response.SubmissionId,
    assignmentId: response.AssignmentId,
    studentId: response.StudentId,
    studentName: response.StudentName,
    startedAt: response.StartedAt ? new Date(response.StartedAt) : null,
    submittedAt: response.SubmittedAt ? new Date(response.SubmittedAt) : null,
    score: response.Score,
  };
}

function mapToAnsweredQuestion(response: AnsweredQuestionResponse): AnsweredQuestion {
	return {
		questionId: response.QuestionId,
		assignmentId: response.QuestionId,
		content: response.Content,
		answers: response.Answers.map(mapToAnswer),
		type: response.Type as Question['type'],
		studentsAnswers: response.StudentsAnswers.map(mapToStudentAnswer),
	};
}

function mapToStudentAnswer(response: StudentAnswerResponse): StudentAnswer {
	return {
		submissionId: response.SubmissionId,
		questionId: response.QuestionId,
		value: response.Value,
	};
}
