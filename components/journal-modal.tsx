import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { X, Sparkles, Sun, Eye, Heart, Check } from "lucide-react-native"

type SummaryType = "positive" | "objective" | "encouraging"

interface Summary {
  type: SummaryType
  icon: React.ReactNode
  title: string
  content: string
  bgColor: string
  borderColor: string
}

interface JournalModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (achievement: string) => void
}

export default function JournalModal({ isOpen, onClose, onSave }: JournalModalProps) {
  const [journalText, setJournalText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [summaries, setSummaries] = useState<Summary[] | null>(null)
  const [selectedSummary, setSelectedSummary] = useState<SummaryType | null>(null)

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setJournalText("")
      setSummaries(null)
      setSelectedSummary(null)
      setIsLoading(false)
    }
  }, [isOpen])

  const handleGetSummary = async () => {
    if (!journalText.trim()) return

    setIsLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      setSummaries([
        {
          type: "positive",
          icon: <Sun size={20} color="#f59e0b" />,
          title: "긍정적 시선",
          content: "오늘 하루 정말 열심히 보내셨네요.",
          bgColor: "rgba(245, 158, 11, 0.1)",
          borderColor: "rgba(245, 158, 11, 0.2)",
        },
        {
          type: "objective",
          icon: <Eye size={20} color="#94a3b8" />,
          title: "객관적 시선",
          content: "균형 잡힌 하루를 보냈어요.",
          bgColor: "rgba(148, 163, 184, 0.1)",
          borderColor: "rgba(148, 163, 184, 0.2)",
        },
        {
          type: "encouraging",
          icon: <Heart size={20} color="#fb7185" />,
          title: "응원의 시선",
          content: "당신만의 속도로 잘 걸어가고 있어요.",
          bgColor: "rgba(251, 113, 133, 0.1)",
          borderColor: "rgba(251, 113, 133, 0.2)",
        },
      ])
      setIsLoading(false)
    }, 2000)
  }

  const handleSelectAndSave = (summary: Summary) => {
    setSelectedSummary(summary.type)
    setTimeout(() => {
      onSave(summary.content)
    }, 500)
  }

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
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
            <Text className="text-xl font-semibold text-white">오늘의 일기</Text>
            <TouchableOpacity 
              onPress={onClose}
              className="p-2 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <X size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView 
            className="px-6 pb-8" 
            style={{ maxHeight: '80%' }}
            showsVerticalScrollIndicator={false}
          >
            {!summaries ? (
              <View>
                <Text className="text-[#9ca3af] text-sm mb-4">
                  자유롭게 적어주세요. AI가 한 문장으로 요약해드릴게요.
                </Text>

                {/* Text Area */}
                <TextInput
                  value={journalText}
                  onChangeText={setJournalText}
                  placeholder="오늘 하루는 어땠나요? 기분, 있었던 일, 감사한 것들... 무엇이든 좋아요."
                  placeholderTextColor="rgba(156, 163, 175, 0.5)"
                  multiline
                  className="w-full min-h-[200px] bg-white/5 border border-white/10 rounded-3xl p-5 text-white text-base leading-relaxed"
                  style={{ textAlignVertical: 'top' }}
                />

                {/* Get Summary Button */}
                <TouchableOpacity
                  onPress={handleGetSummary}
                  disabled={!journalText.trim() || isLoading}
                  className={`mt-6 w-full h-14 rounded-3xl flex-row items-center justify-center gap-2 ${!journalText.trim() || isLoading ? 'bg-[#fbbf24]/50' : 'bg-[#fbbf24]'}`}
                  style={!journalText.trim() || isLoading ? {} : styles.buttonShadow}
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator color="#0f172a" size="small" />
                      <Text className="text-[#0f172a] font-medium text-base ml-2">AI가 분석 중이에요...</Text>
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} color="#0f172a" fill="#0f172a" />
                      <Text className="text-[#0f172a] font-medium text-base ml-2">AI 요약 받기</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text className="text-[#9ca3af] text-sm mb-5">
                  마음에 드는 한 문장을 선택해주세요
                </Text>

                {/* Summary Cards */}
                <View className="gap-3">
                  {summaries.map((summary, index) => {
                    const isSelected = selectedSummary === summary.type
                    return (
                      <TouchableOpacity
                        key={summary.type}
                        onPress={() => handleSelectAndSave(summary)}
                        className="w-full py-5 px-5 rounded-3xl"
                        style={{
                          backgroundColor: summary.bgColor,
                          borderWidth: 1,
                          borderColor: isSelected ? "#fbbf24" : summary.borderColor,
                          ...(isSelected ? styles.selectedRing : {})
                        }}
                      >
                        <View className="flex-row items-center justify-between mb-2">
                          <View className="flex-row items-center gap-2.5">
                            {summary.icon}
                            <Text className="font-medium text-white text-sm ml-2">{summary.title}</Text>
                          </View>
                          {isSelected && (
                            <View className="w-6 h-6 rounded-full bg-[#fbbf24] items-center justify-center">
                              <Check size={16} color="#0f172a" />
                            </View>
                          )}
                        </View>
                        <Text 
                          className="text-white/90 leading-relaxed mt-2"
                          style={isSelected ? { color: "#fbbf24" } : {}}
                        >
                          {summary.content}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>

                {/* Reset option */}
                <TouchableOpacity 
                  onPress={() => {
                    setSummaries(null)
                    setSelectedSummary(null)
                  }}
                  className="w-full mt-6 py-3 items-center"
                >
                  <Text className="text-[#9ca3af] text-sm">다시 작성하기</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
  buttonShadow: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedRing: {
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  }
});
