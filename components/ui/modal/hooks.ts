import { useContext, useEffect } from "react";
import { ModalContext } from "./context";

// Use escape to close
const useEscape = (condition: boolean, callback: () => void) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                callback();
            }
        };

        if (condition) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [condition, callback]);
};

// Click outside to close
const useClickOutside = (closestItemSelector: string, condition: boolean, callback: () => void) => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest(closestItemSelector)) {
                callback();
            }
        };

        if (condition) {
            document.addEventListener("click", handleClick);
        }

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [closestItemSelector, condition, callback]);
};

// Modal context hook
const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }

    return context;
};

export { useClickOutside, useEscape, useModal };
