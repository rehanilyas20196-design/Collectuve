import { useState } from 'react'
import { login, signUp } from '../auth'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    if (isLogin) {
      const { error } = await login(email, password)
      if (error) setMessage(error.message)
      else setMessage('Login successful ✅')
    } else {
      const { error } = await signUp(email, password)
      if (error) setMessage(error.message)
      else setMessage('Signup successful ✔ Check your email')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-[#1F2937] mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>

        <input
          className="w-full mb-4 p-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-medium hover:bg-[#1D4ED8] transition"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        {message && <p className="mt-4 text-sm text-[#111827]">{message}</p>}

        <div className="mt-6 text-sm text-[#6B7280]">
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}
