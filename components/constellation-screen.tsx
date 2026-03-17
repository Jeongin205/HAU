import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight, Star } from "lucide-react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ConstellationScreen() {
  const insets = useSafeAreaInsets();
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  // Mock recorded days
  const recordedDays = [1, 3, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 18, 19, 21, 22, 24, 25, 26]
  const today = new Date()
  const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && 
                         currentMonth.getFullYear() === today.getFullYear()

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <ScrollView 
      className="flex-1 px-6" 
      style={{ paddingTop: Math.max(insets.top, 48), paddingBottom: Math.max(insets.bottom, 96) }} 
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="pt-6 pb-8">
        <Text className="text-xl font-semibold text-white mb-1">별자리</Text>
        <Text className="text-[#9ca3af] text-sm">기록된 날들이 별이 되어 빛나요</Text>
      </View>

      {/* Month Navigator */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity 
          onPress={prevMonth}
          className="p-2 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <ChevronLeft size={20} color="#9ca3af" />
        </TouchableOpacity>
        <Text className="text-lg font-medium text-white">
          {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
        </Text>
        <TouchableOpacity 
          onPress={nextMonth}
          className="p-2 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View className="bg-white/5 rounded-3xl border border-white/10 p-5">
        {/* Day labels */}
        <View className="flex-row mb-3">
          {dayLabels.map((day, i) => (
            <View key={day} className="flex-1 items-center">
              <Text className={`text-xs font-medium py-2 ${i === 0 ? "text-rose-400" : i === 6 ? "text-blue-400" : "text-[#9ca3af]"}`}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar grid */}
        <View className="flex-row flex-wrap">
          {/* Empty cells for days before first of month */}
          {[...Array(firstDay)].map((_, i) => (
            <View key={`empty-${i}`} style={{ width: '14.28%', aspectRatio: 1 }} />
          ))}

          {/* Day cells */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1
            const isRecorded = recordedDays.includes(day)
            const isToday = isCurrentMonth && day === today.getDate()

            return (
              <View key={day} style={{ width: '14.28%', aspectRatio: 1 }} className="items-center justify-center">
                {isRecorded ? (
                  <View className="relative">
                    <Star 
                      size={20} 
                      color="#fbbf24" 
                      fill="#fbbf24" 
                      style={styles.starGlow}
                    />
                    {isToday && (
                      <View className="absolute -bottom-1 left-1/2 w-1 h-1 bg-[#fbbf24] rounded-full" style={{ transform: [{ translateX: -2 }] }} />
                    )}
                  </View>
                ) : (
                  <Text className={`text-sm ${isToday ? "text-[#fbbf24] font-medium" : "text-[#9ca3af]/50"}`}>
                    {day}
                  </Text>
                )}
              </View>
            )
          })}
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row gap-4 mt-6">
        <View className="flex-1 bg-white/5 rounded-3xl border border-white/10 p-5 items-center">
          <Text className="text-3xl font-semibold text-[#fbbf24] mb-1">{recordedDays.length}</Text>
          <Text className="text-[#9ca3af] text-sm">이번 달 기록</Text>
        </View>
        <View className="flex-1 bg-white/5 rounded-3xl border border-white/10 p-5 items-center">
          <Text className="text-3xl font-semibold text-white mb-1">7</Text>
          <Text className="text-[#9ca3af] text-sm">연속 기록</Text>
        </View>
      </View>

      {/* Legend */}
      <View className="flex-row items-center justify-center gap-6 mt-6 mb-8">
        <View className="flex-row items-center gap-2">
          <Star size={16} color="#fbbf24" fill="#fbbf24" />
          <Text className="text-sm text-[#9ca3af]">기록된 날</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="w-4 h-4 items-center justify-center">
            <Text className="text-xs text-[#9ca3af]/50">12</Text>
          </View>
          <Text className="text-sm text-[#9ca3af]">미기록</Text>
        </View>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  starGlow: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  }
});
