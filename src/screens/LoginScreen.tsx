import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Moon, Sparkles } from 'lucide-react-native';
import { authService } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';

// Expo 웹 브라우저 이벤트 완료 처리
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { session } = useAuth();

  // 이미 로그인되어 있으면 메인 화면으로 이동
  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  const handleGoogleLogin = async () => {
    try {
      // 1. 휴대폰/시뮬레이터에 맞는 정확한 리다이렉트 URL 생성
      const redirectUri = Linking.createURL('/login');
      // console.log("이 링크를 Supabase Redirect URLs에 추가하세요:", redirectUri);
      
      const oauthUrl = await authService.getGoogleOAuthUrl(redirectUri);

      
      if (!oauthUrl) {
         throw new Error('OAuth URL을 가져오지 못했습니다.');
      }

      const result = await WebBrowser.openAuthSessionAsync(oauthUrl, redirectUri);
      
      if (result.type === 'success' && result.url) {
        const parsedUrl = new URL(result.url);
        const hashParams = new URLSearchParams(parsedUrl.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          await authService.setSession(accessToken, refreshToken);
        }
      }
    } catch (error: any) {
      Alert.alert('로그인 오류', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0B1021]">
      {/* 장식용 배경 요소들 (별 느낌) */}
      <View className="absolute top-20 left-10 opacity-30">
        <Sparkles size={24} color="#FFF" />
      </View>
      <View className="absolute top-40 right-16 opacity-20">
        <Sparkles size={16} color="#FFF" />
      </View>
      <View className="absolute bottom-1/3 left-1/4 opacity-10">
        <Sparkles size={32} color="#FFF" />
      </View>

      <View className="flex-1 justify-center px-8">
        {/* 헤더 섹션 */}
        <View className="items-center mb-16 space-y-4">
          <View className="bg-indigo-900/40 p-4 rounded-full mb-4">
            <Moon size={48} color="#818CF8" />
          </View>
          <Text className="text-4xl font-extrabold text-white text-center tracking-tight">
            How Are U
          </Text>
          <Text className="text-lg text-indigo-200/80 text-center font-medium mt-2">
            접속 자체가 성공의 시작
          </Text>
        </View>

        {/* 폼 섹션 (구글 로그인 버튼) */}
        <View className="w-full space-y-4 mt-8">
          <TouchableOpacity 
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
            className="w-full bg-white flex-row items-center justify-center py-4 rounded-2xl shadow-lg border border-white/10"
          >
            {/* Google G Logo SVG Base64 (간단한 표시용) */}
            <Text className="text-slate-900 text-lg font-bold ml-3 tracking-wide">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* 설명 섹션 */}
        <View className="mt-12 items-center">
          <Text className="text-indigo-300/50 text-sm text-center">
            가입 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
