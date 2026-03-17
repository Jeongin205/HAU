import { useState } from "react"
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from "@/components/home-screen"
import ConstellationScreen from "@/components/constellation-screen"
import UniverseScreen from "@/components/universe-screen"
import BottomNav, { Screen } from "@/components/bottom-nav"
import JournalModal from "@/components/journal-modal"
import SettingsModal from "@/components/settings-modal"

export default function HealingDiary() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [isJournalOpen, setIsJournalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [hasRecordedToday, setHasRecordedToday] = useState(false)
  const [todayAchievement, setTodayAchievement] = useState("")

  const handleSaveAchievement = (achievement: string) => {
    setTodayAchievement(achievement)
    setHasRecordedToday(true)
    setIsJournalOpen(false)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen 
            onOpenJournal={() => setIsJournalOpen(true)} 
            onOpenSettings={() => setIsSettingsOpen(true)}
            hasRecordedToday={hasRecordedToday}
            todayAchievement={todayAchievement}
          />
        )
      case "constellation":
        return <ConstellationScreen />
      case "universe":
        return <UniverseScreen />
      default:
        return (
          <HomeScreen 
            onOpenJournal={() => setIsJournalOpen(true)} 
            onOpenSettings={() => setIsSettingsOpen(true)}
            hasRecordedToday={hasRecordedToday}
            todayAchievement={todayAchievement}
          />
        )
    }
  }

  return (
    <View className="flex-1 bg-[#0f172a]">
      <StatusBar style="light" />
      
      {/* Background gradient handled in _layout or can just use solid #0f172a for simplicity,
       or expo-linear-gradient if needed. We'll use a simple approach here. */}
      <View style={[StyleSheet.absoluteFillObject, { opacity: 0.5 }]} className="bg-[#1e293b]" />

      {/* Subtle star background - in React Native we might skip the animated particles 
      or use an image. For now, solid dark theme is applied */}

      {/* Main content */}
      <View className="flex-1 w-full relative z-10 z-[10]">
        {renderScreen()}
      </View>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />

      {/* Journal Modal */}
      <JournalModal 
        isOpen={isJournalOpen} 
        onClose={() => setIsJournalOpen(false)}
        onSave={handleSaveAchievement}
      />

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
      />
    </View>
  )
}
