import { useState } from 'react'
import { Home, BookOpen, FileText, AlertCircle, BarChart3, User, LogOut, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useExamStore } from '../store/examStore'

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
  const { user, login, logout } = useExamStore()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [userName, setUserName] = useState('')

  const handleLogin = () => {
    if (userName.trim()) {
      login(userName.trim())
      setShowLoginModal(false)
      setUserName('')
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
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

            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1.5 rounded-full">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white text-sm font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">退出</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>登录</span>
                </button>
              )}
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

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">用户登录</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  请输入您的昵称
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="输入昵称开始学习"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!userName.trim()}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                登录
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              登录后可保存学习进度和答题记录
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
