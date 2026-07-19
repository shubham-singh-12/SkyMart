import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, EyeOff, Zap, ArrowRight, Mail, Lock, User } from 'lucide-react'
import { registerUser, clearError, selectAuthError, selectIsAuth } from '../store/authSlice'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(selectAuthError)
  const isAuth = useSelector(selectIsAuth)

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (isAuth) navigate('/login') }, [isAuth])
  useEffect(() => { dispatch(clearError()) }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) dispatch(clearError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, confirm } = form
    if (!name || !email || !password || !confirm) { toast.error('Fill all fields'); return }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    if (password !== confirm) { toast.error('Passwords do not match'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    dispatch(registerUser({ name: name.trim(), email: email.trim().toLowerCase(), password }))
    setLoading(false)
  }

  // ================================================================= PASSWORD STRENGTH ==================================================================
  const pw = form.password
  const strength = !pw ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3
  const strengthColors = ['', 'bg-red-500', 'bg-amber-400', 'bg-volt']
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong']

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-scale-in">

        {/* ================================================================== LOGO =================================================================== */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-9 h-9 bg-volt rounded-xl flex items-center justify-center">
            <Zap size={16} className="text-ink fill-ink" />
          </div>
          <span className="font-heading font-bold text-xl">Sky<span className="text-volt">Mart</span></span>
        </div>

        <div className="auth-card">
          <h2 className="font-heading font-bold text-2xl mb-1">Create account</h2>
          <p className="text-white/40 text-sm font-body mb-8">Join SkyMart and start shopping</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ================================================================ NAME ================================================================= */}
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="field pl-10"
              />
            </div>

            {/* ================================================================ EMAIL ================================================================ */}
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="field pl-10"
              />
            </div>

            {/* ============================================================== PASSWORD =============================================================== */}
            <div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  placeholder="Password (min 6 chars)"
                  value={form.password}
                  onChange={handleChange}
                  className="field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* =========================================================== STRENGTH BAR ============================================================ */}
              {pw && (
                <div className="flex gap-1.5 mt-2 items-center">
                  {[1,2,3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-white/10'}`} />
                  ))}
                  <span className={`text-xs font-body ml-1 ${strength === 3 ? 'text-volt' : strength === 2 ? 'text-amber-400' : 'text-red-400'}`}>
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
            </div>

            {/* =============================================================== CONFIRM =============================================================== */}
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type={showPw ? 'text' : 'password'}
                name="confirm"
                placeholder="Confirm password"
                value={form.confirm}
                onChange={handleChange}
                className="field pl-10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-volt w-full flex items-center justify-center gap-2 py-3.5 mt-2 text-base font-heading font-bold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="text-center text-white/30 text-sm font-body mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-volt hover:text-volt-light font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
