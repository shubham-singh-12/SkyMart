import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// =================================================== cart persists across refreshes via localStorage ====================================================
const CART_KEY = "sm_cart";

// =================================================== cart persists across refreshes via localStorage ====================================================
const load = () => {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
        return [];
    }
};
const persist = (items) =>
    localStorage.setItem(CART_KEY, JSON.stringify(items));

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: load(), isOpen: false },
    reducers: {
        addToCart: (state, action) => {
            const p = action.payload;

            // ========================================== already in cart? bump qty instead of adding a dupe row ==========================================
            const ex = state.items.find((i) => i.id === p.id);
            if (ex) {
                ex.quantity += 1;
                toast.success("Quantity updated!");
            } else {
                state.items.push({ ...p, quantity: 1 });
                toast.success("Added to cart 🛒");
            }
            persist(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
            persist(state.items);
            toast.error("Removed from cart");
        },
        increment: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                item.quantity += 1;
                persist(state.items);
            }
        },
        decrement: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                // hitting 0 just removes it instead of showing "0 in cart"
                if (item.quantity <= 1) {
                    state.items = state.items.filter(
                        (i) => i.id !== action.payload,
                    );
                } else {
                    item.quantity -= 1;
                }
                persist(state.items);
            }
        },
        clearCart: (state) => {
            state.items = [];
            persist([]);
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
} = cartSlice.actions;
export const selectCartItems = (s) => s.cart.items;
export const selectCartOpen = (s) => s.cart.isOpen;

// ================================ total/count aren't stored anywhere — always computed from items so they can't go stale ================================
export const selectCartCount = (s) =>
    s.cart.items.reduce((n, i) => n + i.quantity, 0);
export const selectCartTotal = (s) =>
    s.cart.items.reduce((n, i) => n + i.price * i.quantity, 0);

// ============================ takes an id, gives back a selector — needed since each ProductCard checks a different product =============================
export const selectInCart = (id) => (s) =>
    s.cart.items.some((i) => i.id === id);
export default cartSlice.reducer;
