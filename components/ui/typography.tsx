import { cn } from "@/lib/utils";
import React from "react";

const H1 = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
    return (
        <h1
            className={cn(
                className,
                "mb-2 text-4xl font-bold leading-normal tracking-tight text-foreground",
            )}
            {...props}
            ref={ref}
        >
            {children}
        </h1>
    );
});

const H2 = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
    return (
        <h2
            className={cn(
                className,
                "text-2xl font-semibold tracking-tight text-foreground",
            )}
            {...props}
            ref={ref}
        >
            {children}
        </h2>
    );
});

const H3 = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
    return (
        <h3
            className={cn(className, "text-lg font-medium text-foreground")}
            {...props}
            ref={ref}
        >
            {children}
        </h3>
    );
});

const CodeBlock = React.forwardRef<
    HTMLPreElement,
    React.HTMLAttributes<HTMLPreElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div className="prose dark:prose-invert">
            <pre className={cn(className)} {...props} ref={ref}>
                <code>{children}</code>
            </pre>
        </div>
    );
});

H1.displayName = "H1";
H2.displayName = "H2";
H3.displayName = "H3";
CodeBlock.displayName = "CodeBlock";
export { CodeBlock, H1, H2, H3 };
