import { Home, BookOpen, FileText, AlertCircle, BarChart3 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { path: '/', name: '首页', icon: Home },
  { path: '/practice', name: '题库练习', icon: BookOpen },
  { path: '/exam', name: '模拟考试', icon: FileText },
  { path: '/wrong', name: '错题本', icon: AlertCircle },
  { path: '/analysis', name: '数据分析', icon: BarChart3 },
]

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="bg-primary-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
            <span className="text-white font-bold text-lg">兰州事业编考试</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-primary-600 shadow-md'
                      : 'text-white hover:bg-primary-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </div>

          <div className="md:hidden">
            <button className="text-white p-2 rounded-lg hover:bg-primary-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
