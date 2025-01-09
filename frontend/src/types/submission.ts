import { AnswerResponse, Question, mapToAnswer } from '@/types/assignment';

export default interface Submission {
	answeredQuestions: AnsweredQuestion[] | null;
	submissionId: number;
	assignmentId: number;
	studentId: number;
	studentName: string;
	startedAt: Date | null;
	submittedAt: Date | null;
	score: number | null;
};

interface StudentAnswer {
	submissionId: number;
	questionId: number;
	value: string;
}

interface AnsweredQuestion extends Question {
	studentsAnswers?: StudentAnswer[];
}

export interface SubmissionResponse {
	SubmissionId: number;
	AssignmentId: number;
	StudentId: number;
	StudentName: string;
	StartedAt: string | null;
	SubmittedAt: string | null;
	Score: number | null;
	AnsweredQuestions: AnsweredQuestionResponse[] | null;
}

interface AnsweredQuestionResponse {
	QuestionId: number;
	Content: string;
	Type: string;
	Answers: AnswerResponse[];
	StudentsAnswers: StudentAnswerResponse[];
}

interface StudentAnswerResponse {
	SubmissionId: number;
	QuestionId: number;
	Value: string;
}

export function mapToSubmission(response: SubmissionResponse): Submission {
	return {
		answeredQuestions: response.AnsweredQuestions?.map(mapToAnsweredQuestion) ?? null,
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
