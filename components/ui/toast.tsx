"use client";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

type ToasterProps = React.ComponentProps<typeof Toaster>;

const ToastProvider = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Toaster
            className="toaster group"
            theme={theme as ToasterProps["theme"]}
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    closeButton:
                        "bg-background text-foreground group-[.toast]:hover:bg-danger group-[.toast]:hover:text-danger-foreground group-[.toast]:hover:border-border border border-border transition-colors",
                },
            }}
            {...props}
        />
    );
};

export default ToastProvider;
