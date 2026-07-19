import { useState, useEffect } from "react";
import { mockProducts, mockCategories } from "../data/mockData";

// ============================================ no real backend, just wrapping the mock data with a fake delay ============================================
// ========================================= so it behaves like a real fetch (loading states, etc actually work) ==========================================
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useProducts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // ============================== bail if we unmount before the delay finishes, avoids setting state on a dead component ==============================
    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        delay(500).then(() => {
            if (cancelled) return;
            setData(mockProducts);
            setIsLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return { data, isLoading, isError };
};

export const useProduct = (id) => {
    const [data, setData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(!!id);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!id) {
            setIsLoading(false);
            return;
        }
        let cancelled = false;
        setIsLoading(true);
        setIsError(false);
        delay(300).then(() => {
            if (cancelled) return;
            const product = mockProducts.find((p) => p.id === id);

            // ====================================== no match = bad/old URL, let the page show a "not found" state =======================================
            if (!product) setIsError(true);
            setData(product);
            setIsLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, [id]);

    return { data, isLoading, isError };
};

export const useCategories = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        delay(200).then(() => {
            if (cancelled) return;
            setData(mockCategories);
            setIsLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    return { data, isLoading };
};
