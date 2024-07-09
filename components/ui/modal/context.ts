"use client";
import { createContext } from "react";

// Modal context type
type ModalContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

// Modal context
const ModalContext = createContext<ModalContextType | null>(null);

export { ModalContext };
