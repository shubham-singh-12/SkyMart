import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Zap, ArrowRight, Mail, Lock } from "lucide-react";
import {
    loginUser,
    clearError,
    selectAuthError,
    selectIsAuth,
} from "../store/authSlice";
import toast from "react-hot-toast";
import LiquidEther from "../components/LiquidEther";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectAuthError);
    const isAuth = useSelector(selectIsAuth);

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuth) navigate("/home");
    }, [isAuth]);
    useEffect(() => {
        dispatch(clearError());
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error("Fill all fields");
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 600)); // fake latency
        dispatch(
            loginUser({
                email: form.email.trim().toLowerCase(),
                password: form.password,
            }),
        );
        setLoading(false);
    };

    return (
        <div className="relative isolate min-h-screen bg-ink flex overflow-hidden">
            {/* Background — sits behind both panels, full page */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <LiquidEther
                    colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>
            {/* Left Panel */}
            <div className="hidden lg:flex flex-col w-1/2 bg-[#111] border-r border-white/8 p-12 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-volt/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-volt/5 rounded-full blur-3xl pointer-events-none" />

                {/* Logo */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 bg-volt rounded-2xl flex items-center justify-center">
                        <Zap size={18} className="text-ink fill-ink" />
                    </div>
                    <span className="font-heading font-bold text-2xl">
                        Sky<span className="text-volt">Mart</span>
                    </span>
                </div>

                {/* ================================================================ HERO TEXT ================================================================ */}
                <div className="flex-1 flex flex-col justify-center relative z-10">
                    <p className="text-volt text-sm font-body font-medium mb-4 tracking-widest uppercase">
                        Welcome back
                    </p>
                    <h1 className="font-heading font-bold text-5xl leading-tight mb-6">
                        Shop the future.
                        <br />
                        <span className="text-volt">Today.</span>
                    </h1>
                    <p className="text-white/40 text-base font-body max-w-sm leading-relaxed">
                        Thousands of products, lightning-fast delivery, and
                        prices that make your wallet happy.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-12">
                        {[
                            { n: "20K+", l: "Products" },
                            { n: "50K+", l: "Users" },
                            { n: "4.9★", l: "Rating" },
                        ].map(({ n, l }) => (
                            <div
                                key={l}
                                className="bg-white/4 border border-white/8 rounded-2xl p-4 text-center"
                            >
                                <p className="font-heading font-bold text-xl text-volt">
                                    {n}
                                </p>
                                <p className="text-white/40 text-xs font-body mt-1">
                                    {l}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============================================================ RIGHT PANEL - FORM ============================================================= */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md animate-scale-in">
                    {/* ============================================================== MOBILE LOGO ============================================================== */}
                    <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                        <div className="w-9 h-9 bg-volt rounded-xl flex items-center justify-center">
                            <Zap size={16} className="text-ink fill-ink" />
                        </div>
                        <span className="font-heading font-bold text-xl">
                            Sky<span className="text-volt">Mart</span>
                        </span>
                    </div>

                    <div className="auth-card">
                        <h2 className="font-heading font-bold text-2xl mb-1">
                            Sign in
                        </h2>
                        <p className="text-white/40 text-sm font-body mb-8">
                            Enter your credentials to continue
                        </p>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 font-body">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* =============================================================== EMAIL =============================================================== */}
                            <div className="relative">
                                <Mail
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="field pl-10"
                                    autoComplete="email"
                                />
                            </div>

                            {/* ============================================================= PASSWORD ============================================================== */}
                            <div className="relative">
                                <Lock
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                                />
                                <input
                                    type={showPw ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="field pl-10 pr-10"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                                >
                                    {showPw ? (
                                        <EyeOff size={15} />
                                    ) : (
                                        <Eye size={15} />
                                    )}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-volt w-full flex items-center justify-center gap-2 py-3.5 mt-2 text-base font-heading font-bold"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="animate-spin w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    <>
                                        Sign in <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-white/30 text-sm font-body mt-6">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-volt hover:text-volt-light font-semibold transition-colors"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
