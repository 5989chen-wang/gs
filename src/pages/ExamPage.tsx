import { useState, useEffect } from 'react'
import { Play, Clock, CheckCircle, XCircle, AlertTriangle, RotateCcw } from 'lucide-react'
import { questions, type Question } from '../data/questions'
import { useExamStore } from '../store/examStore'

type ExamState = 'setup' | 'ongoing' | 'finished'

function ExamPage() {
  const [examState, setExamState] = useState<ExamState>('setup')
  const [questionCount, setQuestionCount] = useState(10)
  const [timeLimit, setTimeLimit] = useState(15)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [examQuestions, setExamQuestions] = useState<Question[]>([])
  const [showResult, setShowResult] = useState(false)

  const addWrongQuestion = useExamStore((state) => state.addWrongQuestion)
  const recordAnswer = useExamStore((state) => state.recordAnswer)

  useEffect(() => {
    let timer: number
    if (examState === 'ongoing' && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setExamState('finished')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [examState, timeRemaining])

  const startExam = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    setExamQuestions(shuffled.slice(0, questionCount))
    setTimeRemaining(timeLimit * 60)
    setCurrentIndex(0)
    setAnswers({})
    setShowResult(false)
    setExamState('ongoing')
  }

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }))
  }

  const handleSubmitExam = () => {
    setExamState('finished')
    setShowResult(true)
  }

  const calculateResult = () => {
    let correct = 0
    examQuestions.forEach((q, index) => {
      const userAnswer = answers[index]
      const isCorrect = userAnswer === q.correctIndex
      if (isCorrect) correct++
      recordAnswer(q.id, userAnswer ?? -1, isCorrect)
      if (!isCorrect && userAnswer !== undefined) {
        addWrongQuestion(q.id, userAnswer)
      }
    })
    return { correct, total: examQuestions.length, rate: Math.round((correct / examQuestions.length) * 100) }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const result = showResult ? calculateResult() : null

  if (examState === 'setup') {
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">模拟考试设置</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">题目数量</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {[5, 10, 15, 20, 30].map((num) => (
                  <option key={num} value={num}>{num} 题</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">考试时长</label>
              <select
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {[10, 15, 20, 30, 45, 60].map((num) => (
                  <option key={num} value={num}>{num} 分钟</option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-blue-700">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm">考试开始后将自动计时，请合理安排答题时间</span>
              </div>
            </div>

            <button
              onClick={startExam}
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-medium hover:bg-primary-700 transition-all duration-200 shadow-md flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>开始考试</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (examState === 'finished' && !showResult) {
    return (
      <div className="max-w-lg mx-auto animate-fade-in">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">考试时间到</h2>
          <p className="text-gray-500 mb-6">系统将自动提交您的答案</p>
          <button
            onClick={() => setShowResult(true)}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-all duration-200"
          >
            查看成绩
          </button>
        </div>
      </div>
    )
  }

  if (examState === 'finished' && showResult && result) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className={`px-6 py-8 text-center ${result.rate >= 60 ? 'bg-green-500' : 'bg-red-500'}`}>
            <div className="text-white/80 mb-2">考试成绩</div>
            <div className="text-6xl font-bold text-white mb-2">{result.rate}%</div>
            <div className="text-white/90">
              {result.correct} / {result.total} 题正确
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">答题详情</h3>
            <div className="space-y-4">
              {examQuestions.map((q, index) => {
                const userAnswer = answers[index]
                const isCorrect = userAnswer === q.correctIndex
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                  >
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-gray-800 mb-2">{q.content}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <span className="text-gray-500">
                            你的答案: {userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : '未作答'}
                          </span>
                          <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            正确答案: {String.fromCharCode(65 + q.correctIndex)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={() => setExamState('setup')}
              className="w-full mt-6 bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>重新开始</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
        <div className="bg-gradient-to-r from-primary-600 to-blue-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">模拟考试</span>
              <span className="text-white/80">
                第 {currentIndex + 1} / {examQuestions.length} 题
              </span>
            </div>
            <div className={`flex items-center space-x-2 ${timeRemaining < 300 ? 'text-red-300' : 'text-white'}`}>
              <Clock className="w-5 h-5" />
              <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-4">
        <p className="text-lg font-medium text-gray-800 mb-6">
          {examQuestions[currentIndex]?.content}
        </p>

        <div className="space-y-3">
          {examQuestions[currentIndex]?.options.map((option, index) => {
            const isSelected = answers[currentIndex] === index
            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(currentIndex, index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center space-x-3 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isSelected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">答题卡:</span>
            <div className="flex flex-wrap gap-1">
              {examQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary-600 text-white'
                      : answers[index] !== undefined
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmitExam}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200"
          >
            交卷
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExamPage
