import { XIcon } from "lucide-react";
import React from "react";

export const Dialog = ({
    children,
    trigger,
}: Readonly<{ children: React.ReactNode; trigger: React.ReactNode }>) => {
    const ref = React.useRef<HTMLDialogElement>(null);

    const open = () => {
        if (ref.current) {
            ref.current.showModal();
        }
    };

    const close = () => {
        if (ref.current) {
            ref.current.close();
        }
    };

    return (
        <>
            <div role="button" onClick={open} className="cursor-pointer">
                {trigger}
            </div>

            <dialog
                className="bg-background/50 fixed left-0 top-0 z-[99999] h-screen w-screen p-8 backdrop-blur-sm"
                ref={ref}
            >
                <div className="rounded-xl border-border/50 relative border bg-background p-4 pt-8 text-foreground shadow-lg">
                    <div className="absolute right-2 top-2">
                        <button
                            className="flex h-5 w-5 items-center justify-center rounded-md transition-all hover:bg-secondary hover:text-secondary-foreground"
                            onClick={close}
                        >
                            <XIcon size={16} />
                        </button>
                    </div>

                    {children}
                </div>
            </dialog>
        </>
    );
};
