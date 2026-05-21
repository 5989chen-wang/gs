import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Lightbulb, BookOpen, BookMarked, Briefcase, FileText, Newspaper, Scale } from 'lucide-react'
import { chapters } from '../data/questions'
import { useExamStore } from '../store/examStore'

const iconMap: Record<string, typeof BookOpen> = {
  BookOpen,
  BookMarked,
  Briefcase,
  FileText,
  Newspaper,
  Scale,
}

type AnswerState = 'unanswered' | 'correct' | 'wrong'

function PracticePage() {
  const [selectedChapter, setSelectedChapter] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered')
  const [showAnalysis, setShowAnalysis] = useState(false)

  const questionsList = useExamStore((state) => state.getQuestionsByChapter(selectedChapter))
  const addWrongQuestion = useExamStore((state) => state.addWrongQuestion)
  const recordAnswer = useExamStore((state) => state.recordAnswer)

  const currentQuestion = questionsList[currentIndex]

  if (!currentQuestion) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">该章节暂无题目</p>
      </div>
    )
  }

  const handleSelectAnswer = (index: number) => {
    if (answerState !== 'unanswered') return
    
    setSelectedAnswer(index)
    const isCorrect = index === currentQuestion.correctIndex
    setAnswerState(isCorrect ? 'correct' : 'wrong')
    
    recordAnswer(currentQuestion.id, index, isCorrect)
    
    if (!isCorrect) {
      addWrongQuestion(currentQuestion.id, index)
    }
    
    setTimeout(() => setShowAnalysis(true), 500)
  }

  const handleNext = () => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setAnswerState('unanswered')
      setShowAnalysis(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setSelectedAnswer(null)
      setAnswerState('unanswered')
      setShowAnalysis(false)
    }
  }

  const handleChapterChange = (chapterId: string) => {
    setSelectedChapter(chapterId)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setAnswerState('unanswered')
    setShowAnalysis(false)
  }

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index)
  }

  const getOptionStyle = (index: number) => {
    const baseStyle = 'w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center space-x-3'
    
    if (answerState === 'unanswered') {
      return selectedAnswer === index
        ? `${baseStyle} border-primary-500 bg-primary-50`
        : `${baseStyle} border-gray-200 hover:border-primary-300 hover:bg-gray-50`
    }
    
    if (index === currentQuestion.correctIndex) {
      return `${baseStyle} border-green-500 bg-green-50 text-green-700`
    }
    
    if (selectedAnswer === index && answerState === 'wrong') {
      return `${baseStyle} border-red-500 bg-red-50 text-red-700`
    }
    
    return `${baseStyle} border-gray-200 opacity-50`
  }

  const getDifficultyBadge = (difficulty: string) => {
    const styles: Record<string, string> = {
      easy: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      hard: 'bg-red-100 text-red-700',
    }
    const labels: Record<string, string> = {
      easy: '简单',
      medium: '中等',
      hard: '困难',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[difficulty]}`}>
        {labels[difficulty]}
      </span>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap gap-2">
          {chapters.map((chapter) => {
            const Icon = iconMap[chapter.icon]
            return (
              <button
                key={chapter.id}
                onClick={() => handleChapterChange(chapter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedChapter === chapter.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{chapter.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-blue-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-white/80">第 {currentIndex + 1} / {questionsList.length} 题</span>
              {getDifficultyBadge(currentQuestion.difficulty)}
            </div>
            <span className="text-white/80">{currentQuestion.chapter}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              {currentQuestion.content}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={answerState !== 'unanswered'}
                className={getOptionStyle(index)}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  answerState === 'unanswered' 
                    ? 'bg-gray-100 text-gray-600' 
                    : index === currentQuestion.correctIndex 
                      ? 'bg-green-500 text-white' 
                      : selectedAnswer === index && answerState === 'wrong'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                }`}>
                  {getOptionLabel(index)}
                </span>
                <span className="flex-1">{option}</span>
                {answerState !== 'unanswered' && index === currentQuestion.correctIndex && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {answerState === 'wrong' && selectedAnswer === index && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </button>
            ))}
          </div>

          {showAnalysis && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <span className="font-medium text-amber-800">答案解析</span>
              </div>
              <p className="text-amber-900 leading-relaxed">{currentQuestion.analysis}</p>
            </div>
          )}

          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>上一题</span>
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentIndex === questionsList.length - 1}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200 ${
                currentIndex === questionsList.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
              }`}
            >
              <span>下一题</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticePage
