import { BookOpen, Target, Clock, TrendingUp, ChevronRight, Calendar } from 'lucide-react'
import { useExamStore } from '../store/examStore'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const stats = useExamStore((state) => state.getStats())
  const navigate = useNavigate()

  const examDate = new Date('2026-06-15')
  const today = new Date()
  const diffTime = examDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const quickActions = [
    { icon: BookOpen, label: '题库练习', path: '/practice', color: 'bg-blue-500' },
    { icon: Target, label: '模拟考试', path: '/exam', color: 'bg-green-500' },
    { icon: Calendar, label: '错题本', path: '/wrong', color: 'bg-orange-500' },
    { icon: TrendingUp, label: '数据分析', path: '/analysis', color: 'bg-purple-500' },
  ]

  const statCards = [
    { label: '已做题目', value: stats.totalQuestions, icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: '正确率', value: `${stats.correctRate}%`, icon: Target, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: '错题数', value: stats.wrongCount, icon: Calendar, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: '学习天数', value: stats.studyDays, icon: Clock, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-blue-500 rounded-2xl p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            兰州市2026年事业编考试
          </h1>
          <p className="text-lg text-white/90 mb-6">
            综合管理类 · 刷题与分析平台
          </p>
          
          <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 inline-flex">
            <Clock className="w-6 h-6 text-white" />
            <div>
              <p className="text-white/80 text-sm">距离考试还有</p>
              <p className="text-white font-bold text-xl">{diffDays} 天</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`${card.bgColor} rounded-xl p-4 flex items-center space-x-4 transition-transform hover:scale-105`}
            >
              <div className={`${card.color} bg-white p-3 rounded-lg shadow-md`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.label}</p>
                <p className={`${card.color} font-bold text-xl`}>{card.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`${action.color} text-white rounded-xl p-6 flex flex-col items-center space-y-3 transition-all duration-200 hover:shadow-lg hover:scale-105`}
            >
              <Icon className="w-8 h-8" />
              <span className="font-medium">{action.label}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )
        })}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">考试须知</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
            <p className="text-gray-600">考试科目：综合管理类（公共基础知识、行政能力测试、综合应用能力）</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
            <p className="text-gray-600">考试时间：2026年6月15日（具体时间以准考证为准）</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
            <p className="text-gray-600">考试地点：兰州市内指定考点（详见准考证）</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
            <p className="text-gray-600">请提前做好复习准备，合理安排学习计划</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
