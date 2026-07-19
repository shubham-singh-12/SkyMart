import { createSlice } from "@reduxjs/toolkit";

// =============================== fake "backend" — storing users + session in localStorage since there's no real API here ================================
const USERS_KEY = "sm_users";
const SESSION_KEY = "sm_session";

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
const saveUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));
const getSession = () =>
    JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
const saveSession = (u) => localStorage.setItem(SESSION_KEY, JSON.stringify(u));
const clearSession = () => localStorage.removeItem(SESSION_KEY);

// ======================================= pull session from storage right away so a refresh doesn't log people out =======================================
const session = getSession();
const initialState = {
    user: session,
    isAuthenticated: !!session,
    error: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerUser: (state, action) => {
            const { name, email, password } = action.payload;
            const users = getUsers();

            // ================================================== don't let two accounts share an email ===================================================
            if (users.find((u) => u.email === email)) {
                state.error = "Email already registered!";
                return;
            }
            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                avatar: name[0].toUpperCase(),
                joinedAt: new Date().toISOString(),
            };
            saveUsers([...users, newUser]);

            // ============================== strip password before this goes into the session — no reason to keep it around ==============================
            const { password: _, ...safeUser } = newUser;
            state.user = safeUser;
            state.isAuthenticated = true;
            state.error = null;
            saveSession(safeUser);
        },

        loginUser: (state, action) => {
            const { email, password } = action.payload;
            const users = getUsers();
            const found = users.find(
                (u) => u.email === email && u.password === password,
            );

            // =============================== this is a plaintext password check — fine for a demo, never do this for real ===============================
            if (!found) {
                state.error = "Invalid email or password";
                return;
            }
            const { password: _, ...safeUser } = found;
            state.user = safeUser;
            state.isAuthenticated = true;
            state.error = null;
            saveSession(safeUser);
        },

        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            clearSession();
        },

        // ========================================== just clears the error banner when user starts typing again ==========================================
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { registerUser, loginUser, logoutUser, clearError } =
    authSlice.actions;
export const selectUser = (s) => s.auth.user;
export const selectIsAuth = (s) => s.auth.isAuthenticated;
export const selectAuthError = (s) => s.auth.error;
export default authSlice.reducer;
