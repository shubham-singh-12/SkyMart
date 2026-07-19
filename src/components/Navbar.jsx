import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, LogOut, Menu, X, Zap, User } from "lucide-react";
import { logoutUser, selectUser } from "../store/authSlice";
import { selectCartCount, toggleCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const links = [
    { to: "/home", label: "Home" },
    { to: "/products", label: "Shop" },
    { to: "/about", label: "About" },
];

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const cartCount = useSelector(selectCartCount);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logged out. See you soon! 👋");
        navigate("/login");
    };

    return (
        <header
            className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? "bg-ink/90 backdrop-blur-xl border-b border-white/8" : "bg-transparent"}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
                {/* ============================================================== LOGO =============================================================== */}
                <NavLink
                    to="/home"
                    className="flex items-center gap-2 shrink-0"
                >
                    <div className="w-8 h-8 bg-volt rounded-xl flex items-center justify-center">
                        <Zap size={15} className="text-ink fill-ink" />
                    </div>
                    <span className="font-heading font-bold text-lg">
                        Sky<span className="text-volt">Mart</span>
                    </span>
                </NavLink>

                {/* ========================================================= DESKTOP NAVBAR ========================================================== */}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                {/* =========================================================== RIGHT SIDE ============================================================ */}
                <div className="flex items-center gap-2 shrink-0">
                    {user && (
                        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl cursor-pointer">
                            <div className="w-6 h-6 bg-volt rounded-lg flex items-center justify-center text-ink text-xs font-bold">
                                {user.avatar || user.name?.[0]?.toUpperCase()}
                            </div>
                            <span className="text-sm text-white/70 font-body max-w-25 truncate">
                                {user.name}
                            </span>
                        </div>
                    )}

                    {/* ============================================================ CART ============================================================= */}
                    <button
                        onClick={() => dispatch(toggleCart())}
                        className="relative p-2.5 bg-white/8 hover:bg-white/12 border border-white/10 rounded-xl transition-all cursor-pointer"
                    >
                        <ShoppingCart size={18} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-volt text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                                {cartCount > 9 ? "9+" : cartCount}
                            </span>
                        )}
                    </button>

                    {/* ======================================================== LOGOUT BUTTON ======================================================== */}
                    <button
                        onClick={handleLogout}
                        title="Logout"
                        className="p-2.5 bg-white/8 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 rounded-xl transition-all text-white/60 hover:text-red-400 cursor-pointer"
                    >
                        <LogOut size={16} />
                    </button>

                    {/* ========================================================= MOBILE MENU ========================================================= */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2.5 bg-white/8 border border-white/10 rounded-xl"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-white/8 bg-[#111] px-4 py-4 flex flex-col gap-3 animate-fade-in">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `nav-link text-base py-2 ${isActive ? "active" : ""}`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-400 text-sm mt-2"
                    >
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            )}
        </header>
    );
}
