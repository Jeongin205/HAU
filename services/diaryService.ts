import { supabase } from '../lib/supabase';
import { summaryModel } from '../lib/gemini';

export interface PostDiaryParams {
  userId: string;
  inputType: 'direct' | 'ai_summary';
  originalContent?: string;
  summary: string;
  aiTone?: string;
  moodType?: string;
}

export const diaryService = {
  /**
   * Gemini API를 사용하여 일기 내용을 3가지 톤으로 요약 제안합니다.
   */
  async getAiSummaryProposals(content: string) {
    const prompt = `
      다음은 사용자의 일기 내용입니다. 이 내용을 바탕으로 "오늘 하루를 정의하는 한 줄 요약"을 3가지 버전으로 만들어주세요.
      
      버전 1 (객관형): 사실 위주로 담백하게 요약
      버전 2 (칭찬형): 사용자의 행동이나 감정을 긍정적으로 칭찬하며 요약
      버전 3 (격려형): 따뜻하게 위로하고 응원하며 요약
      
      형식:
      {
        "objective": "한 줄 요약 내용",
        "praise": "한 줄 요약 내용",
        "encourage": "한 줄 요약 내용"
      }
      
      일기 내용: "${content}"
    `;

    try {
      const result = await summaryModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // JSON 파싱 (Gemini가 마크다운 코드 블록으로 줄 수 있으므로 정규식 처리)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('AI Summary Error:', error);
      throw error;
    }
  },

  /**
   * Supabase에 일기를 저장합니다.
   */
  async saveDiary(params: PostDiaryParams) {
    const { data, error } = await supabase
      .from('entries')
      .insert([
        {
          user_id: params.userId,
          input_type: params.inputType,
          original_content: params.originalContent,
          summary: params.summary,
          ai_tone: params.aiTone,
          mood_type: params.moodType,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  /**
   * 사용자의 일기 목록을 가져옵니다.
   */
  async getDiaries(userId: string) {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
