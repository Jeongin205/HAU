import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { diaryService, PostDiaryParams } from '../services/diaryService';

/**
 * 일기 목록을 가져오는 훅 (TanStack Query)
 */
export const useDiaries = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['diaries', userId],
    queryFn: () => (userId ? diaryService.getDiaries(userId) : Promise.resolve([])),
    enabled: !!userId,
  });
};

/**
 * 일기를 저장하는 훅 (TanStack Query Mutation)
 */
export const useSaveDiary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostDiaryParams) => diaryService.saveDiary(params),
    onSuccess: (_, variables) => {
      // 해당 사용자의 일기 목록 쿼리 무효화 (캐시 업데이트)
      queryClient.invalidateQueries({ queryKey: ['diaries', variables.userId] });
    },
  });
};

/**
 * AI 요약 제안을 받는 훅
 */
export const useAiSummary = () => {
  return useMutation({
    mutationFn: (content: string) => diaryService.getAiSummaryProposals(content),
  });
};
