import { useDispatch, useSelector } from "react-redux";
import {
    X,
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowRight,
    PackageOpen,
} from "lucide-react";
import {
    selectCartItems,
    selectCartTotal,
    selectCartOpen,
    closeCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
} from "../store/cartSlice";
import toast from "react-hot-toast";

export default function CartDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectCartOpen);
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const handleCheckout = () => {
        if (!items.length) return;
        toast.success("Order placed! 🎉 (Demo)");
        dispatch(clearCart());
        dispatch(closeCart());
    };

    return (
        <>
            {/* ============================================================== BACKDROP =============================================================== */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={() => dispatch(closeCart())}
                />
            )}

            {/* =============================================================== DRAWER ================================================================ */}
            <aside
                className={`fixed top-0 right-0 h-full w-full sm:w-105 bg-[#111] border-l border-white/10
                         z-50 flex flex-col transition-transform duration-300 ease-out
                         ${isOpen ? "translate-x-0 animate-slide-in" : "translate-x-full"}`}
            >
                {/* ============================================================= HEADER ============================================================== */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={20} className="text-volt" />
                        <h2 className="font-heading font-bold text-lg">Cart</h2>
                        {items.length > 0 && (
                            <span className="badge bg-volt/15 text-volt text-xs">
                                {items.length} items
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => dispatch(closeCart())}
                        className="p-2 hover:bg-white/8 rounded-xl transition-colors text-white/50 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* ============================================================== ITEMS ============================================================== */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
                            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
                                <PackageOpen
                                    size={36}
                                    className="text-white/20"
                                />
                            </div>
                            <div>
                                <p className="font-heading font-semibold text-white/70 text-lg">
                                    Cart is empty
                                </p>
                                <p className="text-white/30 text-sm mt-1">
                                    Go shop something cool!
                                </p>
                            </div>
                            <button
                                onClick={() => dispatch(closeCart())}
                                className="btn-volt mt-2"
                            >
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 p-3 bg-white/4 border border-white/8 rounded-2xl animate-fade-in"
                            >
                                {/* ===================================================== IMAGES ====================================================== */}
                                <div className="w-18 h-18 bg-white rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* =================================================== INFORMATION =================================================== */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white/80 font-body clamp-2 leading-snug">
                                        {item.title}
                                    </p>
                                    <p className="text-volt font-heading font-bold text-base mt-1">
                                        ₹
                                        {(item.price * item.quantity).toFixed(
                                            2,
                                        )}
                                    </p>
                                    <p className="text-white/30 text-xs">
                                        ${item.price.toFixed(2)} each
                                    </p>

                                    {/* ============================================== QUANTITY CONTROLS ============================================== */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() =>
                                                dispatch(decrement(item.id))
                                            }
                                            className="w-7 h-7 flex items-center justify-center bg-white/8 hover:bg-white/15 rounded-lg transition-colors border border-white/10"
                                        >
                                            <Minus size={11} />
                                        </button>
                                        <span className="text-sm font-bold font-body w-5 text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                dispatch(increment(item.id))
                                            }
                                            className="w-7 h-7 flex items-center justify-center bg-white/8 hover:bg-white/15 rounded-lg transition-colors border border-white/10"
                                        >
                                            <Plus size={11} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    removeFromCart(item.id),
                                                )
                                            }
                                            className="ml-auto text-red-400/60 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ========================================================= FOOTER SECTION ========================================================== */}
                {items.length > 0 && (
                    <div className="px-6 py-5 border-t border-white/8 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-white/50 text-sm font-body">
                                Total
                            </span>
                            <span className="font-heading font-bold text-2xl text-white">
                                ₹{total.toFixed(2)}
                            </span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full btn-volt flex items-center justify-center gap-2 py-3.5 text-base font-heading font-bold"
                        >
                            Checkout <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => dispatch(clearCart())}
                            className="w-full text-center text-xs text-white/25 hover:text-red-400 transition-colors py-1"
                        >
                            Clear cart
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}
