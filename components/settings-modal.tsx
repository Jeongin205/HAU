import { View, Text, TouchableOpacity, Modal, StyleSheet, Switch, Platform } from 'react-native';
import { X, Bell, Moon, Crown, ChevronRight } from "lucide-react-native"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View className="w-full max-w-md bg-[#1e293b] rounded-t-[32px] overflow-hidden">
          {/* Handle bar */}
          <View className="items-center pt-3 pb-2">
            <View className="w-10 h-1 bg-white/20 rounded-full" />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <Text className="text-xl font-semibold text-white">설정</Text>
            <TouchableOpacity 
              onPress={onClose}
              className="p-2 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <X size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="px-6 pb-10 mt-2">
            {/* Notification Settings */}
            <View className="mb-6">
              <Text className="text-sm text-[#9ca3af] font-medium px-1 mb-2">알림</Text>
              <View className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                <View className="flex-row items-center justify-between p-5 border-b border-white/5">
                  <View className="flex-row items-center gap-3">
                    <Bell size={20} color="#9ca3af" />
                    <Text className="text-white text-base ml-2">일기 알림</Text>
                  </View>
                  <Switch 
                    value={true} 
                    onValueChange={() => {}} 
                    trackColor={{ false: '#3f3f46', true: '#fbbf24' }}
                    thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
                  />
                </View>
                <View className="flex-row items-center justify-between p-5">
                  <View className="flex-row items-center gap-3">
                    <Moon size={20} color="#9ca3af" />
                    <Text className="text-white text-base ml-2">다크 모드</Text>
                  </View>
                  <Switch 
                    value={true} 
                    onValueChange={() => {}} 
                    trackColor={{ false: '#3f3f46', true: '#fbbf24' }}
                    thumbColor={Platform.OS === 'ios' ? undefined : '#fff'}
                  />
                </View>
              </View>
            </View>

            {/* Account */}
            <View className="mb-6">
              <Text className="text-sm text-[#9ca3af] font-medium px-1 mb-2">계정</Text>
              <View className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                <TouchableOpacity className="flex-row items-center justify-between p-5">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-[#fbbf24]/20 items-center justify-center">
                      <Text className="text-lg text-[#fbbf24] font-medium">S</Text>
                    </View>
                    <View className="ml-2">
                      <Text className="text-white font-medium text-base">별지기</Text>
                      <Text className="text-[#9ca3af] text-sm">star@example.com</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Premium */}
            <View className="bg-[#fbbf24]/10 rounded-3xl border border-[#fbbf24]/30 p-5 mb-4">
              <View className="flex-row items-center gap-3 mb-4">
                <View className="p-2 rounded-full bg-[#fbbf24]/20">
                  <Crown size={20} color="#fbbf24" fill="#fbbf24" style={styles.glowRef} />
                </View>
                <View className="ml-2">
                  <Text className="text-white font-medium text-base">프리미엄 우주</Text>
                  <Text className="text-[#fbbf24] text-sm mt-0.5">더 많은 기능을 만나보세요</Text>
                </View>
              </View>
              <TouchableOpacity className="w-full py-3.5 bg-[#fbbf24] rounded-2xl items-center" style={styles.buttonShadow}>
                <Text className="text-[#0f172a] font-semibold text-base">업그레이드</Text>
              </TouchableOpacity>
            </View>

            {/* App Info */}
            <View className="items-center pt-2">
              <Text className="text-[#9ca3af]/60 text-xs">한 줄 힐링 일기 v1.0.0</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  glowRef: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonShadow: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  }
});
