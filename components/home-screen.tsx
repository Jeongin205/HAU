import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Flame, Settings, Star } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

interface HomeScreenProps {
  onOpenJournal: () => void;
  onOpenSettings: () => void;
  hasRecordedToday: boolean;
  todayAchievement: string;
}

export default function HomeScreen({
  onOpenJournal,
  onOpenSettings,
  hasRecordedToday,
  todayAchievement
}: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <View className="flex-1 px-6" style={{ paddingTop: Math.max(insets.top, 48) }}>
      {/* Header */}
      <View className="flex-row items-center justify-between pt-6 pb-4">
        {/* Left: Date and Streak */}
        <View className="flex-row items-center gap-4">
          <Text className="text-white text-lg font-medium">{formattedDate}</Text>
          <View className="flex-row items-center gap-1.5 bg-[#fbbf24]/15 px-3 py-1.5 rounded-full">
            <Flame size={16} color="#fbbf24" style={styles.glowRef} />
            <Text className="text-[#fbbf24] text-sm font-medium">7일</Text>
          </View>
        </View>

        {/* Right: Settings */}
        <TouchableOpacity 
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onOpenSettings();
          }}
          className="p-2.5 rounded-full transition-colors"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <Settings size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Hero Content */}
      <View className="flex-1 items-center justify-center -mt-8">
        {hasRecordedToday ? (
          // Recorded state: Show golden one-liner
          <View className="items-center px-4 w-full">
            
            {/* Star icon */}
            <View className="mb-8 items-center justify-center">
              <View 
                className="p-5 rounded-full bg-[#fbbf24]/15 border border-[#fbbf24]/30"
                style={styles.starShadow}
              >
                <Star size={32} color="#fbbf24" fill="#fbbf24" />
              </View>
            </View>

            {/* Main achievement text */}
            <Text 
              className="text-2xl font-semibold leading-relaxed tracking-tight text-center"
              style={styles.achievementText}
            >
              {todayAchievement || "오늘도 제시간에\n일어났어요."}
            </Text>

            {/* Subtle label */}
            <Text className="text-[#9ca3af] text-sm mt-8">
              오늘의 별이 빛나고 있어요
            </Text>
          </View>
        ) : (
          // Not recorded state: Show plant a star button
          <View className="items-center px-4 w-full">
            {/* Empty star icon */}
            <View className="mb-8 items-center justify-center">
              <View className="p-6 rounded-full bg-white/5 border border-white/10">
                <Star size={40} color="rgba(156, 163, 175, 0.5)" />
              </View>
            </View>

            <Text className="text-[#9ca3af] text-base mb-2">
              아직 오늘의 별이 없어요
            </Text>
            <Text className="text-[#9ca3af]/60 text-sm mb-10">
              오늘 하루를 기록하고 별을 심어보세요
            </Text>

            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                onOpenJournal();
              }}
              className="h-14 px-10 rounded-3xl bg-[#fbbf24] flex-row items-center justify-center gap-2.5"
              style={styles.buttonShadow}
            >
              <Star size={20} color="#0f172a" fill="#0f172a" />
              <Text className="text-[#0f172a] font-medium text-base ml-2">오늘의 별 심기</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom spacer for recorded state - add edit option */}
      {hasRecordedToday && (
        <View className="pb-8 items-center justify-center">
          <TouchableOpacity 
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              onOpenJournal();
            }}
            className="py-2 px-4"
          >
            <Text className="text-[#9ca3af] text-sm">다시 작성하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  glowRef: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  starShadow: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  achievementText: {
    color: "#fbbf24",
    textShadowColor: "rgba(251, 191, 36, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  buttonShadow: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  }
});
