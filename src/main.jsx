import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { store } from "./store/store.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "#1a1a1a",
                            color: "#f7f7f7",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "14px",
                            fontFamily: "DM Sans, sans-serif",
                            fontSize: "13px",
                        },
                        success: {
                            iconTheme: {
                                primary: "#c8f400",
                                secondary: "#0d0d0d",
                            },
                        },
                    }}
                />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
