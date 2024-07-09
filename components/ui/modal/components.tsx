"use client";
import { XIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { ModalContext } from "./context";
import { useModal } from "./hooks";

// Default modal close button
const DefaultModalCloseButton = () => {
    const { setIsOpen } = useModal();

    return (
        <button
            className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-md transition-all hover:bg-secondary hover:text-secondary-foreground"
            onClick={() => setIsOpen(false)}
        >
            <XIcon size={16} />
        </button>
    );
};

// Modal provider
const ModalProvider = ({ children, open }: { children: ReactNode; open?: boolean }) => {
    const [isOpen, setIsOpen] = useState(open !== undefined ? open : false);

    return <ModalContext.Provider value={{ isOpen, setIsOpen }}>{children}</ModalContext.Provider>;
};

// Modal trigger
const ModalTrigger = ({ children }: { children: ReactNode }) => {
    const { setIsOpen } = useModal();

    return (
        <div role="button" onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
            {children}
        </div>
    );
};

// Modal close
const ModalClose = ({ children }: { children: ReactNode }) => {
    const { setIsOpen } = useModal();

    return (
        <div role="button" onClick={() => setIsOpen(false)} className="inline-block cursor-pointer">
            {children}
        </div>
    );
};

export { DefaultModalCloseButton, ModalClose, ModalProvider, ModalTrigger };
