import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { questions, type WrongRecord, type DailyStat, type Question } from '../data/questions'

interface User {
  id: string
  name: string
  avatar: string
}

interface ExamStore {
  user: User | null
  wrongBook: WrongRecord[]
  dailyStats: DailyStat[]
  currentQuestionIndex: number
  userAnswers: Record<string, number>
  lastChapterId: string
  login: (name: string) => void
  logout: () => void
  addWrongQuestion: (questionId: string, userAnswer: number) => void
  removeWrongQuestion: (questionId: string) => void
  clearWrongBook: () => void
  recordAnswer: (questionId: string, answer: number, isCorrect: boolean) => void
  setCurrentQuestionIndex: (index: number) => void
  setLastChapterId: (chapterId: string) => void
  resetUserAnswers: () => void
  getStats: () => { totalQuestions: number; correctRate: number; wrongCount: number; studyDays: number }
  getQuestionsByChapter: (chapterId: string) => Question[]
}

const STORAGE_KEY = 'exam-practice-storage'

export const useExamStore = create<ExamStore>()(
  persist(
    (set, get) => ({
      user: null,
      wrongBook: [],
      dailyStats: [],
      currentQuestionIndex: 0,
      userAnswers: {},
      lastChapterId: 'all',

      login: (name: string) => {
        set({
          user: {
            id: Date.now().toString(),
            name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
          }
        })
      },

      logout: () => {
        set({ user: null })
      },

      addWrongQuestion: (questionId: string, userAnswer: number) => {
        set((state) => {
          const existing = state.wrongBook.find(w => w.questionId === questionId)
          if (existing) {
            return {
              wrongBook: state.wrongBook.map(w =>
                w.questionId === questionId
                  ? { ...w, wrongCount: w.wrongCount + 1, lastWrongDate: new Date().toISOString(), userAnswer }
                  : w
              )
            }
          }
          return {
            wrongBook: [
              ...state.wrongBook,
              { questionId, wrongCount: 1, lastWrongDate: new Date().toISOString(), userAnswer }
            ]
          }
        })
      },

      removeWrongQuestion: (questionId: string) => {
        set((state) => ({
          wrongBook: state.wrongBook.filter(w => w.questionId !== questionId)
        }))
      },

      clearWrongBook: () => {
        set({ wrongBook: [] })
      },

      recordAnswer: (questionId: string, answer: number, isCorrect: boolean) => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0]
          const todayStat = state.dailyStats.find(s => s.date === today)
          
          let newStats = [...state.dailyStats]
          if (todayStat) {
            newStats = newStats.map(s =>
              s.date === today
                ? {
                    ...s,
                    questionsDone: s.questionsDone + 1,
                    correctCount: s.correctCount + (isCorrect ? 1 : 0)
                  }
                : s
            )
          } else {
            newStats = [...newStats, { date: today, questionsDone: 1, correctCount: isCorrect ? 1 : 0 }]
          }

          return {
            userAnswers: { ...state.userAnswers, [questionId]: answer },
            dailyStats: newStats
          }
        })
      },

      setCurrentQuestionIndex: (index: number) => {
        set({ currentQuestionIndex: index })
      },

      setLastChapterId: (chapterId: string) => {
        set({ lastChapterId: chapterId })
      },

      resetUserAnswers: () => {
        set({ userAnswers: {}, currentQuestionIndex: 0 })
      },

      getStats: () => {
        const state = get()
        const totalQuestions = state.dailyStats.reduce((sum, s) => sum + s.questionsDone, 0)
        const totalCorrect = state.dailyStats.reduce((sum, s) => sum + s.correctCount, 0)
        const correctRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
        const studyDays = state.dailyStats.length
        const wrongCount = state.wrongBook.length

        return { totalQuestions, correctRate, wrongCount, studyDays }
      },

      getQuestionsByChapter: (chapterId: string) => {
        if (chapterId === 'all') return questions
        const chapterMap: Record<string, string> = {
          'public': '公共基础知识',
          'admin': '行政能力测试',
          'comprehensive': '综合应用能力',
          'current': '时事政治',
          'law': '法律法规'
        }
        return questions.filter(q => q.chapter === chapterMap[chapterId])
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        wrongBook: state.wrongBook,
        dailyStats: state.dailyStats,
        userAnswers: state.userAnswers,
        lastChapterId: state.lastChapterId,
        currentQuestionIndex: state.currentQuestionIndex
      })
    }
  )
)
