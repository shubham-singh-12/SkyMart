import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    ArrowLeft,
    ShoppingCart,
    Check,
    Star,
    Plus,
    Minus,
    Truck,
    Shield,
    RotateCcw,
    Heart,
    Package,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useProduct, useProducts } from "../hooks/useProducts";
import {
    addToCart,
    openCart,
    selectInCart,
    increment,
    decrement,
    selectCartItems,
} from "../store/cartSlice";
import ChromaGrid from "../components/ChromaGrid";
import ProductCard from "../components/ProductCard";

function StarRow({ rate }) {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    className={
                        i < Math.round(rate)
                            ? "text-amber-400 fill-amber-400"
                            : "text-white/15 fill-white/15"
                    }
                />
            ))}
        </div>
    );
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: product, isLoading, isError } = useProduct(Number(id));
    const { data: allProducts = [] } = useProducts();
    const inCart = useSelector(selectInCart(Number(id)));
    const cartItems = useSelector(selectCartItems);
    const cartItem = cartItems.find((i) => i.id === Number(id));

    const [wishlisted, setWishlisted] = useState(false);

    const related = allProducts
        .filter((p) => p.category === product?.category && p.id !== product?.id)
        .slice(0, 5);

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
                    <div className="aspect-square bg-white/5 rounded-3xl" />
                    <div className="space-y-4 pt-4">
                        <div className="h-4 bg-white/5 rounded-lg w-24" />
                        <div className="h-8 bg-white/5 rounded-xl w-3/4" />
                        <div className="h-8 bg-white/5 rounded-xl w-1/2" />
                        <div className="h-24 bg-white/5 rounded-xl" />
                        <div className="h-12 bg-white/5 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
                <Package size={56} className="text-white/15" />
                <p className="font-heading font-bold text-xl text-white/50">
                    Product not found
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="btn-volt"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        dispatch(openCart());
    };

    const currentIndex = allProducts.findIndex((p) => p.id === Number(id));
    const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
    const nextProduct =
        currentIndex < allProducts.length - 1
            ? allProducts[currentIndex + 1]
            : null;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <nav className="flex items-center gap-2 text-sm text-white/30 font-body mb-8">
                <Link
                    to="/products"
                    className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                    <ArrowLeft size={14} /> Products
                </Link>
                <span>/</span>
                <span className="capitalize text-white/50">
                    {product.category}
                </span>
                <span>/</span>
                <span className="text-white/70 clamp-1 max-w-50">
                    {product.title}
                </span>
            </nav>

            {/* ========================================================== MAIN GRID SECTION ========================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-16">
                {/* ======================================================== IMAGES CONTAINER ========================================================= */}
                <div className="bg-white rounded-3xl p-10 flex items-center justify-center aspect-square animate-scale-in">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* ====================================================== INFORMATION CONTAINER ====================================================== */}
                <div className="flex flex-col gap-5 animate-fade-up">
                    {/* ===================================================== CATEGORY CONTAINER ====================================================== */}
                    <span className="badge bg-volt/10 text-volt border border-volt/20 capitalize w-fit text-xs">
                        {product.category}
                    </span>

                    {/* ======================================================= TITLE CONTAINER ======================================================= */}
                    <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                        {product.title}
                    </h1>

                    {/* ====================================================== RATING CONTAINER ======================================================= */}
                    <div className="flex items-center gap-3">
                        <StarRow rate={product.rating?.rate || 0} />
                        <span className="font-semibold text-white/70 text-sm">
                            {product.rating?.rate?.toFixed(1)}
                        </span>
                        <span className="text-white/30 text-sm">
                            ({product.rating?.count} reviews)
                        </span>
                    </div>

                    {/* ======================================================= PRICE CONTAINER ======================================================= */}
                    <div className="py-4 border-y border-white/8">
                        <span className="font-heading font-bold text-4xl text-volt">
                            ₹{product.price.toFixed(2)}
                        </span>
                    </div>

                    {/* ==================================================== DESCRIPTION CONTAINER ==================================================== */}
                    <p className="text-white/50 font-body text-sm leading-relaxed">
                        {product.description}
                    </p>

                    {/* ====================================================== QUANTITY CONTROL ======================================================= */}
                    {inCart && cartItem && (
                        <div className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-2xl p-4">
                            <span className="text-white/50 text-sm font-body">
                                In cart:
                            </span>
                            <div className="flex items-center gap-3 ml-auto">
                                <button
                                    onClick={() =>
                                        dispatch(decrement(product.id))
                                    }
                                    className="w-8 h-8 flex items-center justify-center bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl transition-all"
                                >
                                    <Minus size={13} />
                                </button>
                                <span className="font-heading font-bold text-lg w-6 text-center">
                                    {cartItem.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        dispatch(increment(product.id))
                                    }
                                    className="w-8 h-8 flex items-center justify-center bg-white/8 hover:bg-white/15 border border-white/10 rounded-xl transition-all"
                                >
                                    <Plus size={13} />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={handleAddToCart}
                            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-heading font-bold text-base transition-all duration-200 active:scale-95
                ${inCart ? "bg-green-500/15 text-green-400 border border-green-500/25 hover:bg-green-500/25" : "btn-volt"} cursor-pointer`}
                        >
                            {inCart ? (
                                <>
                                    <Check size={18} />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => setWishlisted(!wishlisted)}
                            className={`p-3.5 border rounded-2xl transition-all cursor-pointer ${wishlisted ? "bg-red-500/15 border-red-500/30 text-red-400" : "border-white/10 text-white/30 hover:text-red-400 hover:border-red-500/30"}`}
                        >
                            <Heart
                                size={20}
                                className={wishlisted ? "fill-red-400" : ""}
                            />
                        </button>
                    </div>

                    {/* ===================================================== VIEW CART SHORTCUT ====================================================== */}
                    {inCart && (
                        <button
                            onClick={() => dispatch(openCart())}
                            className="btn-ghost w-full text-center text-sm"
                        >
                            View Cart →
                        </button>
                    )}

                    {/* ========================================================= TRUST BADGE ========================================================= */}
                    <div className="grid grid-cols-3 gap-3 mt-1">
                        {[
                            {
                                icon: Truck,
                                label: "Free Delivery",
                                sub: "On orders ₹50+",
                            },
                            {
                                icon: Shield,
                                label: "Secure Pay",
                                sub: "256-bit SSL",
                            },
                            {
                                icon: RotateCcw,
                                label: "Easy Returns",
                                sub: "30-day policy",
                            },
                        ].map(({ icon: Icon, label, sub }) => (
                            <div
                                key={label}
                                className="bg-white/3 border border-white/6 rounded-2xl p-3 text-center"
                            >
                                <Icon
                                    size={16}
                                    className="text-volt mx-auto mb-1.5"
                                />
                                <p className="text-white/60 text-[11px] font-body font-semibold">
                                    {label}
                                </p>
                                <p className="text-white/25 text-[10px] font-body">
                                    {sub}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ====================================================== NAVIGATION BUTTON ====================================================== */}
                    <div className="flex gap-3 mt-6">
                        {prevProduct && (
                            <Link
                                to={`/products/${prevProduct.id}`}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl transition-all text-white text-sm font-body"
                            >
                                <ChevronLeft size={16} /> Previous
                            </Link>
                        )}
                        {nextProduct && (
                            <Link
                                to={`/products/${nextProduct.id}`}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-volt hover:bg-volt-light text-ink border border-volt rounded-2xl transition-all font-heading font-semibold text-sm"
                            >
                                Next <ChevronRight size={16} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ========================================================== RELATED PRODUCTS =========================================================== */}
            {related.length > 0 && (
                <section>
                    <h2 className="font-heading font-bold text-2xl mb-6">
                        Related Products
                    </h2>
                    <ChromaGrid radius={150}>
                        {related.map((p, i) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                style={{ animationDelay: `${i * 60}ms` }}
                            />
                        ))}
                    </ChromaGrid>
                </section>
            )}
        </div>
    );
}
