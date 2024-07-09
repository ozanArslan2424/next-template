"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ReactNode } from "react";
import { ModalClose, ModalProvider, ModalTrigger } from "./modal/components";
import { useClickOutside, useEscape, useModal } from "./modal/hooks";

const DropdownContent = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    const { isOpen, setIsOpen } = useModal();
    useEscape(isOpen, () => setIsOpen(false));
    // you can use a different selector if you want to close the modal
    // don't forget to change the selector in the div below
    useClickOutside("#modal", isOpen, () => setIsOpen(false));

    return isOpen ? (
        <menu
            id="modal"
            className={cn(
                "absolute z-[99999] mt-0.5 flex animate-scale-in flex-col items-start justify-start gap-0.5 rounded-md border border-border/50 bg-background p-2 shadow-lg transition-all duration-75",
                className,
            )}
        >
            {children}
        </menu>
    ) : null;
};

export interface DropdownButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

const DropdownButton = React.forwardRef<HTMLButtonElement, DropdownButtonProps>(
    ({ className, onClick, children, ...props }, ref) => {
        const { setIsOpen } = useModal();

        const handleClick = () => {
            if (onClick) {
                onClick();
            }
            setIsOpen(false);
        };

        return (
            <button
                ref={ref}
                onClick={handleClick}
                className={cn(
                    "flex w-full min-w-32 items-start justify-start rounded-md border border-transparent px-3 py-1 text-left text-sm font-medium text-foreground transition-all hover:border-border/50 hover:bg-secondary/20 hover:shadow-sm",
                    className,
                )}
                {...props}
            >
                {children}
            </button>
        );
    },
);

export interface DropdownLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    href: string;
}

const DropdownLink = React.forwardRef<HTMLAnchorElement, DropdownLinkProps>(
    ({ className, href, children, ...props }, ref) => {
        const { setIsOpen } = useModal();

        const handleClick = () => {
            setIsOpen(false);
        };

        return (
            <Link
                href={href}
                ref={ref}
                onClick={handleClick}
                className={cn(
                    "flex w-full min-w-32 items-start justify-start rounded-md border border-transparent px-3 py-1 text-left text-sm font-medium text-foreground no-underline transition-all hover:border-border/50 hover:bg-secondary/20 hover:shadow-sm",
                    className,
                )}
                {...props}
            >
                {children}
            </Link>
        );
    },
);

DropdownButton.displayName = "DropdownButton";
DropdownLink.displayName = "DropdownLink";

export {
    ModalProvider as Dropdown,
    DropdownButton,
    ModalClose as DropdownClose,
    DropdownContent,
    DropdownLink,
    ModalTrigger as DropdownTrigger,
};
