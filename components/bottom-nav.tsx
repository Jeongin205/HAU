import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, CalendarDays, Sparkles } from "lucide-react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export type Screen = "home" | "constellation" | "universe"

interface BottomNavProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  
  const navItems = [
    { screen: "home" as Screen, icon: Star, label: "오늘의 별" },
    { screen: "constellation" as Screen, icon: CalendarDays, label: "별자리" },
    { screen: "universe" as Screen, icon: Sparkles, label: "나의 우주" },
  ];

  return (
    <View 
      className="absolute bottom-0 left-0 right-0 z-50 bg-[#0f172a]/95 border-t border-white/5"
      style={{ paddingBottom: insets.bottom || 16 }}
    >
      <View className="flex-row items-center justify-around py-2 px-4">
        {navItems.map(({ screen, icon: Icon, label }) => {
          const isActive = currentScreen === screen;
          return (
            <TouchableOpacity
              key={screen}
              onPress={() => {
                if (!isActive) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onNavigate(screen);
              }}
              className="flex-col items-center gap-1 py-3 px-6 rounded-2xl"
            >
              <View className="relative items-center justify-center">
                <Icon 
                  size={24}
                  color={isActive ? "#fbbf24" : "#9ca3af"} 
                  fill={isActive && screen === "home" ? "#fbbf24" : "none"}
                />
                {isActive && (
                  <View 
                    className="absolute -inset-3 bg-[#fbbf24]/15 rounded-full -z-10" 
                    style={styles.glowRef} 
                  />
                )}
              </View>
              <Text className={`text-xs font-medium mt-1 ${isActive ? "text-[#fbbf24]" : "text-[#9ca3af]"}`}>
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  glowRef: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 2,
  }
});
