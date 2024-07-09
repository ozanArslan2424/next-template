"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
    DefaultModalCloseButton,
    ModalClose,
    ModalProvider,
    ModalTrigger,
} from "./modal/components";
import { useClickOutside, useEscape, useModal } from "./modal/hooks";

const DialogContent = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { isOpen, setIsOpen } = useModal();
    useEscape(isOpen, () => setIsOpen(false));
    // you can use a different selector if you want to close the modal
    // don't forget to change the selector in the div below
    useClickOutside("#modal", isOpen, () => setIsOpen(false));

    return isOpen ? (
        <dialog
            open
            className="fixed left-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center bg-background/50 p-8 backdrop-blur-sm"
        >
            <div
                id="modal"
                className={cn(
                    className,
                    "animate-scale-in relative transition-transform",
                    "rounded-xl border border-border/50 bg-background p-4 text-foreground shadow-lg",
                    "w-full md:max-w-[50vw]",
                )}
            >
                <DefaultModalCloseButton />
                {children}
            </div>
        </dialog>
    ) : null;
};

export {
    ModalProvider as Dialog,
    ModalClose as DialogClose,
    DialogContent,
    ModalTrigger as DialogTrigger,
};
