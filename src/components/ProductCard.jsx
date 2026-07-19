import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Star, Check } from "lucide-react";
import { addToCart, openCart, selectInCart } from "../store/cartSlice";

const CATEGORY_COLORS = {
    electronics: "#3B82F6",
    clothing: "#F59E0B",
    furniture: "#8B5CF6",
    home: "#10B981",
    sports: "#EF4444",
    accessories: "#06B6D4",
};

export default function ProductCard({ product, style }) {
    const dispatch = useDispatch();
    const inCart = useSelector(selectInCart(product.id));
    const color = CATEGORY_COLORS[product.category] || "#c8f400";

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product));
        dispatch(openCart());
    };

    const handleCardMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };

    return (
        <Link
            to={`/products/${product.id}`}
            onMouseMove={handleCardMove}
            className="chroma-card animate-fade-up cursor-default"
            style={{
                ...style,
                "--card-border": color,
                "--card-gradient": `linear-gradient(160deg, ${color}33, #111 65%)`,
            }}
        >
            {/* ================================================================ IMAGE ================================================================ */}
            <div className="chroma-img-wrapper h-56 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                />
                <span className="absolute top-3 left-3 badge bg-black/60 text-white/80 backdrop-blur-sm capitalize text-[10px]">
                    {product.category}
                </span>
            </div>

            {/* ================================================================ INFO ================================================================= */}
            <footer className="chroma-info flex flex-col gap-2">
                <h3 className="font-body font-medium text-white/85 text-sm leading-snug clamp-2">
                    {product.title}
                </h3>

                <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={10}
                                className={
                                    i < Math.round(product.rating?.rate || 0)
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-white/15 fill-white/15"
                                }
                            />
                        ))}
                    </div>
                    <span className="text-white/30 text-[10px]">
                        ({product.rating?.count || 0})
                    </span>
                </div>

                <div className="flex items-center justify-between mt-1 pt-3 border-t border-white/6">
                    <span className="font-heading font-bold text-volt text-lg">
                        ₹{product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAdd}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-body
                        transition-all duration-200 active:scale-95 cursor-pointer
                        ${inCart ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-volt text-ink hover:bg-volt-light"}`}
                    >
                        {inCart ? (
                            <>
                                <Check size={12} />
                                Added
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={12} />
                                Add
                            </>
                        )}
                    </button>
                </div>
            </footer>
        </Link>
    );
}
