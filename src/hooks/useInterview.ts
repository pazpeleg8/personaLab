import { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppContext } from './useAppContext';
import type { QuestionTag, TagReason } from '../types';

export function useInterview() {
  const { state, dispatch, services } = useAppContext();
  const { session, selectedPersona, context, pendingResponse } = state;

  const usedQuestions = useMemo(
    () => new Set(session?.messages.filter((m) => m.role === 'researcher').map((m) => m.content) ?? []),
    [session?.messages]
  );

  const suggestedQuestions = useMemo(() => {
    if (!selectedPersona) return [];
    return selectedPersona.suggestedQuestions.filter((q) => !usedQuestions.has(q));
  }, [selectedPersona, usedQuestions]);

  const sendQuestion = useCallback(
    async (text: string) => {
      if (!session || !selectedPersona || !context || pendingResponse) return;

      const questionMsg = {
        id: uuid(),
        role: 'researcher' as const,
        content: text,
        timestamp: new Date().toISOString(),
        tag: 'untagged' as QuestionTag,
      };

      dispatch({ type: 'ADD_MESSAGE', payload: questionMsg });
      dispatch({ type: 'SET_PENDING_RESPONSE', payload: true });

      try {
        const response = await services.personaResponder.respond(
          selectedPersona,
          text,
          [...session.messages, questionMsg],
          context
        );

        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            id: uuid(),
            role: 'persona',
            content: response,
            timestamp: new Date().toISOString(),
          },
        });
      } finally {
        dispatch({ type: 'SET_PENDING_RESPONSE', payload: false });
      }
    },
    [session, selectedPersona, context, pendingResponse, dispatch, services]
  );

  const tagMessage = useCallback(
    (messageId: string, tag: QuestionTag, reason?: TagReason, note?: string) => {
      dispatch({ type: 'TAG_MESSAGE', payload: { messageId, tag, reason, note } });
    },
    [dispatch]
  );

  const endInterview = useCallback(async () => {
    if (!session) return;
    dispatch({ type: 'END_SESSION' });
    dispatch({ type: 'SET_SUMMARY_LOADING', payload: true });
    dispatch({ type: 'NAVIGATE', payload: 'summary' });

    const endedSession = {
      ...session,
      status: 'ended' as const,
      endedAt: new Date().toISOString(),
    };

    try {
      const [summary, playbook] = await Promise.all([
        services.interviewSummary.summarize(endedSession),
        services.playbookGenerator.generate(endedSession),
      ]);
      dispatch({ type: 'SET_SUMMARY', payload: summary });
      dispatch({ type: 'SET_PLAYBOOK', payload: playbook });
    } catch {
      dispatch({ type: 'SET_SUMMARY_LOADING', payload: false });
    }
  }, [session, dispatch, services]);

  return { sendQuestion, tagMessage, endInterview, suggestedQuestions };
}
