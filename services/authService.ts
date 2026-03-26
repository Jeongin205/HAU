import { supabase } from '../lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

// Setup for Expo WebBrowser to handle the OAuth redirect
WebBrowser.maybeCompleteAuthSession();

export const authService = {
  /**
   * Google 로그인을 위한 OAuth URL을 가져옵니다.
   */
  async getGoogleOAuthUrl(redirectUri: string) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true, // Expo에서 수동으로 제어하기 위해 true 설정
      },
    });

    if (error) {
      console.error('getGoogleOAuthUrl Error:', error.message);
      throw error;
    }
    
    return data?.url;
  },

  /**
   * 사용자의 세션을 설정합니다. (OAuth 리다이렉트 이후 호출)
   */
  async setSession(access_token: string, refresh_token: string) {
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
       console.error('setSession Error:', error.message);
       throw error;
    }
    return data.session;
  },

  /**
   * 현재 로그인된 세션을 가져옵니다.
   */
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * 로그아웃
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};
