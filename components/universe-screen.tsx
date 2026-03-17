import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Star, Flame, TrendingUp } from "lucide-react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UniverseScreen() {
  const insets = useSafeAreaInsets();
  // Mock data for word cloud
  const achievements = [
    { text: "일찍 일어났어요", size: "text-xl", opacity: 1 },
    { text: "운동했어요", size: "text-lg", opacity: 0.9 },
    { text: "감사했어요", size: "text-base", opacity: 0.8 },
    { text: "책을 읽었어요", size: "text-lg", opacity: 0.85 },
    { text: "건강하게 먹었어요", size: "text-sm", opacity: 0.7 },
    { text: "친구를 만났어요", size: "text-base", opacity: 0.75 },
    { text: "명상했어요", size: "text-sm", opacity: 0.65 },
    { text: "산책했어요", size: "text-base", opacity: 0.8 },
    { text: "충분히 쉬었어요", size: "text-lg", opacity: 0.9 },
    { text: "새로운 시도를 했어요", size: "text-sm", opacity: 0.7 },
  ]

  const stats = [
    { label: "총 별", value: 127, icon: Star, color: "#fbbf24", fill: true },
    { label: "최장 연속", value: 14, icon: Flame, color: "#fb923c", fill: false },
    { label: "이번 달", value: 19, icon: TrendingUp, color: "#34d399", fill: false },
  ]

  return (
    <ScrollView 
      className="flex-1 px-6" 
      style={{ paddingTop: Math.max(insets.top, 48), paddingBottom: Math.max(insets.bottom, 96) }} 
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="pt-6 pb-8">
        <Text className="text-xl font-semibold text-white mb-1">나의 우주</Text>
        <Text className="text-[#9ca3af] text-sm">작은 별들이 모여 우주가 되었어요</Text>
      </View>

      {/* Total Stars - Hero stat */}
      <View className="bg-[#fbbf24]/10 rounded-3xl border border-[#fbbf24]/30 p-6 mb-6 items-center relative overflow-hidden">
        {/* Background stars */}
        <View className="absolute inset-0 opacity-20">
          {[...Array(12)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-[#fbbf24] fill-[#fbbf24]"
              style={{
                width: Math.random() * 12 + 8,
                height: Math.random() * 12 + 8,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </View>
        
        <View className="relative items-center">
          <View className="flex-row items-center justify-center gap-3 mb-2">
            <Star size={32} color="#fbbf24" fill="#fbbf24" style={styles.starGlow} />
          </View>
          <Text 
            className="text-5xl font-bold mb-2 text-center"
            style={styles.heroTextGlow}
          >
            127
          </Text>
          <Text className="text-[#9ca3af]">모은 별의 개수</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View className="flex-row gap-4 mb-8">
        {stats.slice(1).map(({ label, value, icon: Icon, color, fill }) => (
          <View key={label} className="flex-1 bg-white/5 rounded-3xl border border-white/10 p-5 items-center">
            <View className="items-center justify-center mb-3">
              <Icon size={20} color={color} fill={fill ? color : "none"} />
            </View>
            <Text className="text-2xl font-semibold mb-1" style={{ color }}>{value}</Text>
            <Text className="text-[#9ca3af] text-sm">{label}</Text>
          </View>
        ))}
      </View>

      {/* Word Cloud */}
      <View className="flex-1">
        <Text className="text-sm font-medium text-[#9ca3af] mb-4 px-1">자주 기록한 성취들</Text>
        <View className="bg-white/5 rounded-3xl border border-white/10 p-6 min-h-[200px]">
          <View className="flex-row flex-wrap gap-3 justify-center items-center">
            {achievements.map((achievement, index) => (
              <View
                key={index}
                className="px-3 py-1.5 rounded-full bg-white/5"
                style={{ opacity: achievement.opacity }}
              >
                <Text className={`text-white font-medium ${achievement.size}`}>
                  {achievement.text}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Encouragement */}
      <View className="py-6 items-center">
        <Text className="text-[#9ca3af] text-sm text-center">
          꾸준히 기록하며 우주를 채워가고 있어요
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  starGlow: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 2,
  },
  heroTextGlow: {
    color: "#fbbf24",
    textShadowColor: "rgba(251, 191, 36, 0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  }
});
