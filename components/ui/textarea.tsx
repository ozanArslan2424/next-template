import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    children?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, id, name, children, ...props }, ref) => {
        return (
            <label htmlFor={id}>
                <textarea
                    id={id}
                    name={name}
                    className={cn(
                        "flex min-h-[80px] w-full bg-background text-foreground transition",
                        "w-full rounded-md border border-border px-3 py-2 ring-ring",
                        "focus:border-transparent focus:outline-none focus:ring-1",
                        "disabled:pointer-events-none disabled:opacity-50",
                        "placeholder:text-muted-foreground",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {children}
            </label>
        );
    },
);
Textarea.displayName = "Textarea";

export { Textarea };
