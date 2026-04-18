import type { QuestionTag, TagReason } from './interview';

export interface QuestionEvaluation {
  questionId: string;
  suggestedTag: QuestionTag;
  suggestedReason?: TagReason;
  explanation: string;
  improvedVersion?: string;
}
