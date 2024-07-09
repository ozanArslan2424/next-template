"use client";
import { cn } from "@/lib/utils";
import { CheckIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    eyeDisabled?: boolean;
    error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            children,
            name,
            id,
            disabled,
            eyeDisabled = false,
            type,
            error,
            onChange,
            ...props
        },
        ref,
    ) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const [isChecked, setIsChecked] = React.useState(
            props.defaultChecked ?? false,
        );

        function combinedOnChange(e: React.ChangeEvent<HTMLInputElement>) {
            setIsChecked(!isChecked);
            onChange?.(e);
        }

        if (type !== "checkbox") {
            return (
                <label htmlFor={id} className="flex flex-col gap-1 text-sm">
                    {children && (
                        <span className="font-medium text-foreground">
                            {children}
                        </span>
                    )}
                    <div
                        className={cn(
                            "inline-flex h-10 min-h-10 items-center gap-3 rounded-lg border bg-background px-3 ring-offset-background transition-all",
                            "focus-within:border-transparent focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-2",
                            disabled
                                ? "cursor-not-allowed border-border/50 bg-muted/20 text-muted-foreground"
                                : "",
                            type === "file"
                                ? "border-none px-1 shadow-none"
                                : "",
                            error && "border-danger",
                            className,
                        )}
                    >
                        <input
                            className={cn(
                                "flex-1 appearance-none bg-transparent text-foreground outline-none focus:outline-none active:outline-none disabled:pointer-events-none",
                                type === "file"
                                    ? "file:h-8 file:cursor-pointer file:rounded-lg file:border-none file:bg-primary/90 file:px-3 file:py-1.5 file:text-primary-foreground file:shadow file:transition-all file:active:scale-95"
                                    : "",
                            )}
                            type={
                                type === "password" && showPassword
                                    ? "text"
                                    : type
                            }
                            disabled={disabled}
                            name={name}
                            id={id}
                            ref={ref}
                            {...props}
                        />
                        {type === "password" ? (
                            <button
                                disabled={eyeDisabled}
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon size={22} />
                                ) : (
                                    <EyeIcon size={22} />
                                )}
                            </button>
                        ) : null}
                    </div>
                </label>
            );
        }

        if (type === "checkbox") {
            return (
                <label
                    data-state={isChecked ? "checked" : "null"}
                    className={cn(
                        "flex w-full cursor-pointer items-center gap-2 text-sm",
                        className,
                    )}
                >
                    <div
                        className={cn(
                            "inline-flex aspect-square h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-secondary text-secondary-foreground transition-all",
                            "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background",
                            disabled && "bg-muted/20",
                        )}
                    >
                        {isChecked && (
                            <CheckIcon
                                size={16}
                                strokeWidth={5}
                                className="pointer-events-none stroke-foreground"
                            />
                        )}
                    </div>
                    <input
                        {...props}
                        type="checkbox"
                        hidden
                        ref={ref}
                        onChange={combinedOnChange}
                    />
                    <span>{children}</span>
                </label>
            );
        }
    },
);

Input.displayName = "Input";

export default Input;
