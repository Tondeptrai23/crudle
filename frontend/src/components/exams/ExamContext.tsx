import { ExamAnswerSubmitDto, ExamQuestion } from '@/types/exam';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface ExamContextType {
  timeRemaining: number; // in seconds
  answers: Record<number, string>;
  examStartTime: Date | null;
  examDuration: number; // in minutes
  questions: ExamQuestion[];
  setInitialState: (
    startTime: Date,
    duration: number,
    questions: ExamQuestion[],
  ) => void;
  setAnswer: (questionId: number, value: string) => void;
  getRemainingTime: () => number;
  getFormattedTime: () => string;
  getAnswersForSubmission: () => ExamAnswerSubmitDto[];
  isPastDue: boolean;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [examStartTime, setExamStartTime] = useState<Date | null>(null);
  const [examDuration, setExamDuration] = useState<number>(0);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [isPastDue, setIsPastDue] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const setInitialState = useCallback(
    (startTime: Date, duration: number, examQuestions: ExamQuestion[]) => {
      setExamStartTime(startTime);
      setExamDuration(duration);
      setQuestions(examQuestions);

      // Calculate initial remaining time
      const now = new Date();
      const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
      const remaining = Math.max(
        0,
        Math.floor((endTime.getTime() - now.getTime()) / 1000),
      );
      setTimeRemaining(remaining);
    },
    [],
  );

  const setAnswer = useCallback((questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }, []);

  const getRemainingTime = useCallback(() => {
    if (!examStartTime || !examDuration) return 0;

    const now = new Date();
    const endTime = new Date(
      examStartTime.getTime() + examDuration * 60 * 1000,
    );
    return Math.max(0, Math.floor((endTime.getTime() - now.getTime()) / 1000));
  }, [examStartTime, examDuration]);

  const getFormattedTime = useCallback(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [timeRemaining]);

  const getAnswersForSubmission = useCallback((): ExamAnswerSubmitDto[] => {
    return questions.map((question) => ({
      questionId: question.questionId,
      value: answers[question.questionId] || '',
    }));
  }, [questions, answers]);

  // Set up timer
  useEffect(() => {
    if (examStartTime && examDuration) {
      timerRef.current = setInterval(() => {
        const remaining = getRemainingTime();
        setTimeRemaining(remaining);

        if (remaining <= 0) {
          setIsPastDue(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        }
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [examStartTime, examDuration, getRemainingTime]);

  // Auto-save answers to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(
        `exam-answers-${questions[0]?.examId}`,
        JSON.stringify(answers),
      );
    }
  }, [answers, questions]);

  const value = {
    timeRemaining,
    answers,
    examStartTime,
    examDuration,
    questions,
    setInitialState,
    setAnswer,
    getRemainingTime,
    getFormattedTime,
    getAnswersForSubmission,
    isPastDue,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
