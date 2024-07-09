import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { LoadingIcon } from "./loading";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shadow-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 disabled:active:scale-100",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                danger: "bg-danger text-danger-foreground hover:bg-danger/90",
                success:
                    "bg-success text-success-foreground hover:bg-success/90",
                info: "bg-info text-info-foreground hover:bg-info/90",
                accent: "bg-accent text-accent-foreground hover:bg-accent/90",
                muted: "bg-muted text-muted-foreground hover:bg-muted/90",
                outline:
                    "border border-border/50 bg-transparent hover:bg-secondary/90 hover:text-secondary-foreground dark:text-foreground",
                ghost: "hover:bg-secondary hover:text-secondary-foreground dark:text-foreground shadow-none",
            },
            size: {
                xs: "h-7 px-2 py-1 text-xs rounded-sm",
                sm: "h-8 px-3 py-1.5 text-sm rounded-md",
                base: "h-9 px-3 py-1.5 text-sm rounded-md",
                lg: "h-11 px-8 py-3 text-base rounded-lg",
                icon: "h-10 w-10 rounded-md",
                icon_xs: "h-7 w-7 rounded-sm",
                circle: "h-9 w-9 rounded-full",
                circle_xs: "h-7 w-7 rounded-full",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "base",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, loading, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }), "")}
                ref={ref}
                disabled={props.disabled || loading}
                {...props}
            >
                {loading === true && <LoadingIcon />}
                {children}
            </button>
        );
    },
);
Button.displayName = "Button";

export default Button;
