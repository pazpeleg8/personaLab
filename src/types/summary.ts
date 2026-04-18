import type { QuestionEvaluation } from './evaluation';

export type SignalDirection = 'for' | 'against' | 'neutral';

export interface HypothesisSignal {
  direction: SignalDirection;
  quote: string;
  messageId: string;
  interpretation: string;
}

export interface NotableQuote {
  messageId: string;
  quote: string;
  personaName: string;
  significance: string;
}

export interface InterviewSummary {
  sessionId: string;
  executiveSummary: string;
  hypothesisSignals: HypothesisSignal[];
  notableQuotes: NotableQuote[];
  questionQualityReview: QuestionEvaluation[];
  keyThemes: string[];
  recommendedNextSteps: string[];
  generatedAt: string;
}
