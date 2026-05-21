import { useMemo } from 'react'
import { BarChart3, TrendingUp, Target, Calendar, Award } from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { useExamStore } from '../store/examStore'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

function AnalysisPage() {
  const stats = useExamStore((state) => state.getStats())
  const dailyStats = useExamStore((state) => state.dailyStats)

  const weeklyStats = useMemo(() => {
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const stat = dailyStats.find((s) => s.date === dateStr)
      last7Days.push({
        date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
        questionsDone: stat?.questionsDone || 0,
        correctCount: stat?.correctCount || 0,
        rate: stat && stat.questionsDone > 0 ? Math.round((stat.correctCount / stat.questionsDone) * 100) : 0,
      })
    }
    return last7Days
  }, [dailyStats])

  const lineChartData = {
    labels: weeklyStats.map((s) => s.date),
    datasets: [
      {
        label: '正确率 (%)',
        data: weeklyStats.map((s) => s.rate),
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const barChartData = {
    labels: weeklyStats.map((s) => s.date),
    datasets: [
      {
        label: '答题数',
        data: weeklyStats.map((s) => s.questionsDone),
        backgroundColor: '#3b82f6',
        borderRadius: 8,
      },
      {
        label: '正确数',
        data: weeklyStats.map((s) => s.correctCount),
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const statCards = [
    {
      icon: Target,
      label: '累计答题',
      value: stats.totalQuestions,
      unit: '题',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: TrendingUp,
      label: '平均正确率',
      value: stats.correctRate,
      unit: '%',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: Calendar,
      label: '学习天数',
      value: stats.studyDays,
      unit: '天',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      icon: Award,
      label: '连续学习',
      value: calculateStreak(dailyStats),
      unit: '天',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ]

  function calculateStreak(stats: { date: string }[]) {
    if (stats.length === 0) return 0
    
    const dates = stats.map((s) => s.date).sort()
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]
    
    if (!dates.includes(yesterdayStr) && !dates.includes(today)) return 0
    
    let streak = 0
    let checkDate = new Date(yesterday)
    
    while (dates.includes(checkDate.toISOString().split('T')[0])) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    }
    
    return streak
  }

  const todayStat = weeklyStats[weeklyStats.length - 1]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`${card.bgColor} rounded-xl p-4 flex items-center space-x-4 transition-transform hover:scale-105`}
            >
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.label}</p>
                <p className={`${card.textColor} font-bold text-xl`}>
                  {card.value}
                  <span className="text-sm font-normal ml-1">{card.unit}</span>
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-gray-800">近7日正确率趋势</h3>
          </div>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-gray-800">近7日答题情况</h3>
          </div>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-gray-800 mb-4">今日学习情况</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-600 text-3xl font-bold">{todayStat.questionsDone}</p>
            <p className="text-gray-500 text-sm mt-1">答题数</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-green-600 text-3xl font-bold">{todayStat.correctCount}</p>
            <p className="text-gray-500 text-sm mt-1">正确数</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-purple-600 text-3xl font-bold">{todayStat.rate}%</p>
            <p className="text-gray-500 text-sm mt-1">正确率</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary-600 to-blue-500 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-2">学习建议</h3>
        {stats.totalQuestions < 50 ? (
          <p className="text-white/90">
            刚开始学习，建议每天坚持练习20-30道题目，逐步建立学习习惯。可以先从"公共基础知识"章节开始，打牢基础。
          </p>
        ) : stats.correctRate < 60 ? (
          <p className="text-white/90">
            正确率有待提高，建议重点复习错题本中的题目，分析错误原因。可以尝试模拟考试来检验学习效果。
          </p>
        ) : stats.wrongCount > 10 ? (
          <p className="text-white/90">
            错题数量较多，建议定期回顾错题本，加强薄弱知识点的学习。可以按章节分类进行专项训练。
          </p>
        ) : (
          <p className="text-white/90">
            学习效果不错！继续保持，可以尝试增加题目难度，挑战更高正确率。建议定期进行模拟考试，熟悉考试节奏。
          </p>
        )}
      </div>
    </div>
  )
}

export default AnalysisPage
