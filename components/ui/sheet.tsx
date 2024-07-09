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

const SheetContent = ({
    children,
    className,
    side = "left",
}: {
    children: ReactNode;
    className?: string;
    side?: "left" | "right" | "top" | "bottom";
}) => {
    const { isOpen, setIsOpen } = useModal();
    useEscape(isOpen, () => setIsOpen(false));
    // you can use a different selector if you want to close the modal
    // don't forget to change the selector in the div below
    useClickOutside("#modal", isOpen, () => setIsOpen(false));

    return isOpen ? (
        <dialog
            open
            className={cn(
                "fixed left-0 top-0 z-[99999] flex h-screen w-screen bg-background/50 backdrop-blur-sm",
                side === "left" && "justify-start",
                side === "right" && "justify-end",
                side === "top" && "items-start",
                side === "bottom" && "items-end",
            )}
        >
            <div
                id="modal"
                className={cn(
                    className,
                    "relative transition-transform",
                    "border-border/50 bg-background p-4 text-foreground shadow-lg",
                    side === "left" &&
                        "animate-slide-right h-full min-h-screen w-full border-r sm:w-1/2 md:w-1/3 lg:w-1/4",
                    side === "right" &&
                        "animate-slide-left h-full min-h-screen w-full border-l sm:w-1/2 md:w-1/3 lg:w-1/4",
                    side === "top" &&
                        "animate-slide-down min-w-screen h-full w-full border-b sm:h-1/2 md:h-1/3 lg:h-1/4",
                    side === "bottom" &&
                        "animate-slide-up min-w-screen h-full w-full border-t sm:h-1/2 md:h-1/3 lg:h-1/4",
                )}
            >
                <DefaultModalCloseButton />
                {children}
            </div>
        </dialog>
    ) : null;
};

export {
    ModalProvider as Sheet,
    ModalClose as SheetClose,
    SheetContent,
    ModalTrigger as SheetTrigger,
};
